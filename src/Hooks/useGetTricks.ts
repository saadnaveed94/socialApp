import axios from "axios";
import * as React from "react";
import { adminContext } from "../Contexts/Admin";
const useGetTricks = () => {
  const { setTricks } = React.useContext(adminContext);
  const GetTricks = (challengeId: number) => {
    var config = {
      method: "get",
      url: `http://192.168.99.104:3000/api/challenges${challengeId}/tricks`,
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
        setTricks(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return { GetTricks };
};

export default useGetTricks;
