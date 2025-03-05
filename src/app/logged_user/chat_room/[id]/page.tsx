"use client"

import UserHeader from "@/components/Headers/UserHeader";
import React from "react";
import { user } from "@/lib/data";
import FormFeild from "@/components/Form/FormFeild";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  message: z.string().min(1),
});

const inputFeilds = [
  {
    name: "message",
    placeholder: "Type a message...",
    type: "text",
  },
];

const PersonalChat = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <UserHeader user={user} />
      <div className="overflow-y-auto">PersonalChat</div>
      {/* Input form */}
      <div className="fixed bottom-0 w-full bg-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {inputFeilds.map((inputFeild) => (
              <div key={inputFeild.name} className="w-full">
                <FormFeild
                  control={form.control}
                  name={inputFeild.name as "message"}
                  placeholder={inputFeild.placeholder}
                  type={inputFeild.type}
                />
              </div>
            ))}

            <Button type="submit">🚀 Send</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalChat;
