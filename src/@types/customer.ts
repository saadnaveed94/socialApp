import { Dispatch } from "react";
export type customerDataType = {
  name: string;
  id: string;
  likes: number;
}[];
export type customerContextType = {
  data: customerDataType;
  setCustomerData: Dispatch<any>;
};
