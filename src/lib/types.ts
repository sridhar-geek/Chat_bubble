import {Dispatch, SetStateAction } from "react";

export type MessageBarContextType = {
  isMessageBarOpen: boolean;
  setIsMessageBarOpen: Dispatch<SetStateAction<boolean>>;
};

export type UserProps = {
  user: {
    id: string;
    name: string;
    avatar: string;
    status: string;
  };
};