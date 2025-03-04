"use client";

import Image from "next/image";
import { MessageSquareText, Settings } from "lucide-react";
import { createContext, useState } from "react";
import MessageBar from "./MessageBar";
import { MessageBarContextType } from "@/lib/types";
import { useMessageBar } from "@/lib/utils";

export const messageBarContext = createContext<
  MessageBarContextType | undefined
>(undefined);

export const MessageBarProvider = () => {
  const [isMessageBarOpen, setIsMessageBarOpen] = useState<boolean>(false);

  return (
    <messageBarContext.Provider
      value={{ isMessageBarOpen, setIsMessageBarOpen }}
    >
      <Sidebar />
    </messageBarContext.Provider>
  );
};

const Sidebar = () => {
  const { setIsMessageBarOpen, isMessageBarOpen } = useMessageBar();

  return (
    <div className="flex gap-2">
      {/* Sidebar */}
      <div className="flex flex-col justify-between items-center py-8 min-h-screen bg-gray-900 text-white w-16">
        {/* Top: Message Icon */}
        <button onClick={() => setIsMessageBarOpen((prev: boolean) => !prev)}>
          <MessageSquareText />
        </button>

        {/* Bottom: Settings & Profile */}
        <div className="flex flex-col items-center gap-6">
          <Settings />
          <Image
            src={"/logo.png"}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Message Bar (Responsive) */}
      <div
        className={`transition-all transition-discrete duration-500 rounded-lg ${
          isMessageBarOpen ? "block w-72" : "hidden"
        } md:block md:w-72`}
      >
        <MessageBar />
      </div>
    </div>
  );
};
