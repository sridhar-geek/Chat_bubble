"use client";
import Image from "next/image";
// import { CircleDot } from "lucide-react";
import { Card } from "./ui/card";
import { useMessageBar } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UserProps } from "@/lib/types";

const MessageProfile = ({ user }: UserProps) => {
  const router = useRouter();
  const { setIsMessageBarOpen } = useMessageBar();
  const handleClick = (id: string) => {
    console.log(id);
    router.push(`/logged_user/chat_room/${id}`);
    setIsMessageBarOpen((prev: boolean) => !prev);
  };
  return (
    <Card
      className="flex gap-3 rounded-md py-2 px-1 hover:bg-primary duration-300 transition-all w-full overflow-hidden"
      onClick={() => handleClick(user.id)}
    >
      {/* <Image
        src={user.avatar}
        width={65}
        height={5}
        alt="userAvatar"
        className="rounded-full"s
      /> */}
      <div className="relative inline-flex">
        <Image
          src={user.avatar}
          alt="avatar"
          width={50}
          height={50}
          className="inline-block relative object-cover object-center rounded-full"
        />
        <span className={`absolute min-w-[12px] min-h-[12px] rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center bottom-[14%] right-[14%] translate-x-2/4 translate-y-2/4 text-white border border-white ${user.status === "online" ? 'bg-green-600 ' : 'bg-red-700'}`}></span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <h5 className="font-light text-sm text-gray-500  truncate text-clip ">
          this is dummy
        </h5>
      </div>
      <div className="flex flex-col items-center">
        <h6 className="text-nowrap">Time here</h6>
      </div>
    </Card>
  );
};

export default MessageProfile;
