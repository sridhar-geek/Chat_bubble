import Image from "next/image";
import { userData } from "@/lib/data";
import { Input } from "../ui/input";
import MessageProfile from "../MessageProfile";

const MessageBar = () => {
  return (
    <div className="bg-black h-screen p-3 flex flex-col">
      {/* logo and name */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <h1 className="text-xl font-bold">Chat Bubble</h1>
      </div>

      {/* Search bar */}
      <div className="relative mt-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Members"
          required
        />
      </div>

      {/* user list */}
      <div className="mt-4 flex-1 overflow-y-auto">
        {userData.length === 0 ? (
          <h1 className="text-center text-xl font-semibold mt-9">
            😟😟 No users found
          </h1>
        ) : (
          userData.map((user, index) => (
            <div key={index} className="flex items-center justify-center mt-2">
              <MessageProfile user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageBar;
