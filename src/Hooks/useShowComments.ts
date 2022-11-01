import React from "react";
import axios from "axios";
import { adminContext } from "../Contexts/Admin";
const useShowComments = () => {
  const { setComments } = React.useContext(adminContext);
  const GetComments = (challenge_id: string) => {
    axios
      .get(
        `https://project2-p2.herokuapp.com/api/challenges/${challenge_id}/comments`
      )
      .then(function (response: any) {
        console.log(response.data);
        setComments(response.data);
      })
      .catch(function (err: any) {
        console.log(err);
      });
  };
  return { GetComments };
};
export default useShowComments;
