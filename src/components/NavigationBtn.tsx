"use client";
import { useRouter } from "next/navigation";

import React from "react";
import { Button } from "./ui/button";

const NavigationBtn = () => {
  const router = useRouter();
  return (
    <Button
      className="px-4 py-2  transition-colors"
      onClick={() => router.push("/chat_room")}
    >
      Start Chatting Now
    </Button>
  );
};

export default NavigationBtn;
