import UserHeader from "@/components/Headers/UserHeader";
import React from "react";
import { user } from "@/lib/data";

const PersonalChat = () => {
  return (
    <div>
      <UserHeader user={user} />
      <div className="overflow-y-auto">PersonalChat</div>
      {/* Input form */}
      <div className="fixed bottom-0 w-full bg-black">
        <FormFeild />
      </div>
    </div>
  );
};

export default PersonalChat;
