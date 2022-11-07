import axios from "axios";
import * as React from "react"; 
import { adminContext } from "../Contexts/Admin";
const useGetChallenges = () => {
  const { setChallenges } = React.useContext(adminContext);
  const GetChallenges = () => {
    var config = {
      method: "get",
      url: "http://192.168.99.104:3000/api/challenges",
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
        setChallenges(response.data);
      })
      .catch(function (error: any) {
        console.log(error); 
      });
  };
  return { GetChallenges };
};

export default useGetChallenges;
