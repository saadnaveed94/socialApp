import axios from "axios";
import * as React from "react"; 
import { adminContext } from "../Contexts/Admin";
const useGetChallenges = () => {
  const { challenges, setChallenges } = React.useContext(adminContext);
  const GetChallenges = () => {
    var config = {
      method: "get",
      url: "https://project2-p2.herokuapp.com/api/challenges",
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
