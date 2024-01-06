/* eslint-disable react/prop-types */
import { createContext,SetStateAction, useState , Dispatch  } from "react";
import * as React from "react";

const user = localStorage.getItem("user");

type TUser = {
    id:string,
    username:string,
} | null

export interface IUser {
    id:string,
    username:string,
}

export type UserContextType = {
    userInfo:TUser,
    setUserInfo:Dispatch<SetStateAction<TUser>>
    
}

export const UserContext = createContext< UserContextType| null>(null);
export interface LayoutProps  { 
    children: React.ReactNode
 }

export const UserContextProvider = (props: LayoutProps) => {
    const [userInfo, setUserInfo] = useState<TUser>(user ? JSON.parse(user) : null);
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </UserContext.Provider>
    );
};