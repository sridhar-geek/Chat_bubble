import { UserProps } from "@/lib/types";
import Image from "next/image";
import { Phone, Video } from "lucide-react";
import { ModeToggle } from "../ColorMode/Toggle-Btn";

const UserHeader = ({ user }: UserProps) => {
  return (
    <header className="w-full h-20  flex items-center justify-between px-4 shadow-md dark:shadow-primary">
      <div className="flex justify-center items-center gap-4">
        <div className="relative inline-flex">
          <Image
            src={user.avatar}
            alt="avatar"
            width={70}
            height={50}
            className="inline-block relative object-cover object-center rounded-full"
          />
          <span
            className={`absolute min-w-[12px] min-h-[12px] rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center bottom-[14%] right-[14%] translate-x-2/4 translate-y-2/4 text-white border border-white ${
              user.status === "online" ? "bg-green-600 " : "bg-red-700"
            }`}
          ></span>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <h6 className="font-light text-xs ">{user.status}</h6>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Phone className="w-6 h-6" />
        <Video className="w-6 h-6" />
        <ModeToggle />
      </div>
    </header>
  );
};

export default UserHeader;
