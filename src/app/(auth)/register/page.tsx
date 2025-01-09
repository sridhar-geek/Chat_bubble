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

import FormFeild from "@/components/FormFeild";
import { axiosInstance } from "@/lib/utils";
import Spinner from "@/components/Spinner";

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
        if (response.status === 201) {
          const { user } = response.data;
          toast({
            title: "Registration Successful",
            description: `${user.userName}, your request is under process.`,
            variant: "default",
          });
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

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
              {formInputFeilds.map((inputFeild) => (
                <FormFeild
                  key={inputFeild.label}
                  control={form.control}
                  name={inputFeild.name}
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
