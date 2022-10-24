import * as React from "react";
import { createContext } from "react";
import { brandContextType } from "../@types/brand";


const brandContext = createContext<brandContextType | null>(null);

export const BrandProvider = ({ children }: any) => {

  const [brandData, setBrandData] = React.useState<any>([]);

  return (
    <brandContext.Provider

      value={{ setBrandData, data: brandData }}
    >
      {children}
    </brandContext.Provider>
  );
}



