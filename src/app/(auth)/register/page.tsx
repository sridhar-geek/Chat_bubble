"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import FormFeild from "@/components/FormFeild";
import { axiosInstance } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { motion } from "framer-motion";

// Zod Schema
const formSchema = z
  .object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .min(4, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {

  //  Hide and unHide passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Creating form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form Feilds
  const formInputFeilds = [
    {
      name: "userName",
      label: "User Name",
      type: "text",
      placeholder: "Enter your Name",
    },
    {
      name: "email",
      label: "Email ",
      type: "text",
      placeholder: "Enter your Email Id",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
      showPassword,
      setShowPassword,
    },
    {
      name: "confirmPassword",
      label: "Conform Password",
      type: "password",
      placeholder: "Conform your password",
      showPassword: showConfirmPassword,
      setShowPassword: setShowConfirmPassword,
    },
  ];

  // Handler function -->
  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = values;
    startTransition(async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/register",
          data: rest,
        });
        // If response is Ok, show dialog and procceed to login
        if (response.status === 201) {
          const { user } = response.data;
          setDialogMessage(
            `${user.userName}, your registration was successful! 
             an email is send to your ${user.email}`
          );
          setIsDialogOpen(true);
          form.reset();
        } else {
          const errorData = response.data;
          throw new Error(errorData.message || "Something went wrong");
        }
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || (error as Error).message;
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  }
  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center relative">
      {/* Dialog Box and its animation */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md relative"
          >
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Success!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {" "}
              {dialogMessage}
            </p>
            <Button
              onClick={closeDialog}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Home
            </Button>
          </motion.div>
        </div>
      )}{" "}
      {/* Card to hold register form */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formInputFeilds.map((inputFeild) => (
                <FormFeild
                  key={inputFeild.label}
                  control={form.control}
                  name={inputFeild.name as "email" | "password"| "userName"  }
                  label={inputFeild.label}
                  placeholder={inputFeild.placeholder}
                  type={inputFeild.type}
                  showPassword={inputFeild.showPassword}
                  setShowPassword={inputFeild.setShowPassword}
                />
              ))}
              <Button type="submit" className="w-full">
                {isPending ? <Spinner /> : "Register"}{" "}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
