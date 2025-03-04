"use client";

import { useRouter } from "next/navigation";
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
import FormFeild from "@/components/Form/FormFeild";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/Loading/Spinner";
import { useTransition } from "react";
import { axiosInstance } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { Payload } from "@/middleware";

// Zod form Schema
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  //  useState for show password, router, toast, transition, auth context
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Creating form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form Feilds
  const inputFormFeilds = [
    {
      name: "email",
      label: "Email ",
      type: "text",
      placeholder: "email@gmail.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
    },
  ];

  // Handler function -->
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/auth/login",
          data: values,
        });
        // if response is created or request is successfull update the auth context and redirect to chat room page
        if (response.status === 200) {
          const decodedToken: Payload = jwtDecode(response.data.accessToken);
          setAuth({
            user: { role: decodedToken.role, id: decodedToken.sub },
            accessToken: response.data.accessToken,
          });
          toast({
            title: "Login Successful",
            description: `Welcome ${response.data.user.userName}`,
            variant: "default",
          });
          router.push("/chat_room");
          // If request is failed show error message
        } else {
          const errorData = response.data;
          throw new Error(errorData.message || "Something went wrong");
        }
        // Catch errors while sending requests
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || (error as Error).message;
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {/* Card to hold login form */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {inputFormFeilds.map((inputFeild) => (
                <FormFeild
                  key={inputFeild.label}
                  control={form.control}
                  name={inputFeild.name as "email" | "password"}
                  label={inputFeild.label}
                  placeholder={inputFeild.placeholder}
                  type={inputFeild.type}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              ))}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Spinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
