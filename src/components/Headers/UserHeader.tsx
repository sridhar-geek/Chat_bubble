import { UserProps } from '@/lib/types'
import Image from 'next/image'
import { Phone, Video, EllipsisVertical } from "lucide-react";

const UserHeader = ({user}:UserProps) => {
  return (
    <header className="w-full h-20 bg-primary flex items-center justify-between px-4">
      <Image
        src={user.avatar}
        alt={user.name}
        width={60}
        height={40}
        className="rounded-full"
      />
      <div className="flex items-center gap-4">
        <Phone className="w-6 h-6" />
        <Video className="w-6 h-6" />
        <EllipsisVertical className="w-6 h-6" />
      </div>
    </header>
  );
}

export default UserHeader