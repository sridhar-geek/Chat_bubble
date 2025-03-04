"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ColorMode/Toggle-Btn"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";

const Header = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { user, clearAuth, accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const navLinks = [
    { name: "Demos", href: "/demos" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: `auth/logout/${user.id}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          toast({ title: "Logout Successful", variant: "default" });
          clearAuth();
          router.push("/");
        } else {
          const errorData = response.data;
          throw new Error(errorData.message || "Something went wrong");
        }
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || (error as Error).message;
        toast({
          title: "Logout Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <header className="w-full px-2 py-3 shadow-md dark:shadow-primary">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <Link href={"/"}>
            {" "}
            <span className="text-xl font-semibold">Chat Bubbles</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className=" hidden md:flex items-center gap-4">
          {user.role ? (
            <Button
              onClick={handleLogout}
              variant={"ghost"}
              className="px-4 py-2"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant={"ghost"} className="px-4 py-2">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="px-4 py-2 transition-colors">
                  Register
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Button
            className="text-gray-600 bg-white dark:bg-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
          <ModeToggle />
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 md:hidden"
            >
              <div className="p-4">
                <Button
                  className="mb-4 text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link href="/login">
                    <Button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="px-4 py-2 transition-colors">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
