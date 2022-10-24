import { Dispatch } from "react";

export type adminDataType = {
  name: string;
  id: string;
};

export type adminContextType = {
  data: adminDataType;
  setAdminData: Dispatch<any>;
};
