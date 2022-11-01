import { createContext } from "react";
import * as React from "react";
import { adminContextType, adminDataType } from "../@types/admin";

// export const adminContext = createContext<adminContextType | null>(null);
export const adminContext = createContext<any>(null);

export const AdminProvider = ({ children }: any) => {
  const [adminData, setAdminData] = React.useState<adminDataType>([]);
  const [challenges, setChallenges] = React.useState<any>([]);
  return (
    <adminContext.Provider
      value={{
        data: adminData,
        setAdminData,
        challenges: challenges,
        setChallenges,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
