import UserHeader from "@/components/Headers/UserHeader";
import React from "react";
import { user } from "@/lib/data";
import FormFeild from "@/components/Form/FormFeild";

const PersonalChat = () => {
  return (
    <div>
      <UserHeader user={user} />
      <div className="overflow-y-auto">PersonalChat</div>
      {/* Input form */}
      <div className="fixed bottom-0 w-full bg-black">
      </div>
    </div>
  );
};

export default PersonalChat;
