import { createContext } from "react";
import React from "react";
import { customerContextType } from "../@types/customer";

const customerContext = createContext<customerContextType | null>(null);

export const CustomerProvider = ({ children }: any) => {
  const [customerData, setCustomerData] = React.useState<any>([]);

  return (
    <customerContext.Provider
      value={{ data: customerData, setCustomerData }}
    >
      {children}
    </customerContext.Provider>
  );
}