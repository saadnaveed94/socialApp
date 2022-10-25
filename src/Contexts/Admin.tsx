import { createContext } from "react";
import * as React from 'react';
import { adminContextType } from "../@types/admin";


const adminContext = createContext<adminContextType | null>(null);

export const AdminProvider = ({ children }: any) => {
  const [adminData, setAdminData] = React.useState<any>([]);
  return (
    <adminContext.Provider
      value={{ data: adminData, setAdminData }}
    >
      {children}
    </adminContext.Provider>
  )
}