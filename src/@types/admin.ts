import { Dispatch } from "react";

export type adminDataType = {}[];

export type adminContextType = {
  data: adminDataType;
  challenges: any;
  setChallenges: Dispatch<any>;
  
  setAdminData: Dispatch<any>;
};
