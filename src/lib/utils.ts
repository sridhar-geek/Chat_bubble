import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import  axios  from 'axios'
import { useContext } from "react";
import { messageBarContext } from "@/components/Sidebar/Sidebar"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const axiosInstance = axios.create({
  baseURL : process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
 headers : {
    "Content-Type" : "application/json",
    "Accept" : "application/json", 
  },

  withCredentials : true,
});



export const useMessageBar = () => {
  const context = useContext(messageBarContext);
  if (!context) {
    throw new Error("useMessageBar must be used within a MessageBarProvider");
  }
  return context;
};