import { createContext } from "react";
import * as React from 'react';
import { adminContextType, adminDataType } from "../@types/admin";


export const adminContext = createContext<any>(null);

export const AdminProvider = ({ children }: any) => {
  const [adminData, setAdminData] = React.useState<adminDataType>([]);
  const [comments, setComments] = React.useState<adminDataType>([]);
  return (
    <adminContext.Provider
      value={{ data: adminData, setAdminData, comments, setComments }}
    >
      {children}
    </adminContext.Provider>
  )
}