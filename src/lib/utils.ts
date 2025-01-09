import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import  axios  from 'axios'


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