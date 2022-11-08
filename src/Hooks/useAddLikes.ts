import React from "react";
import axios from "axios";
import useGetChallenges from "./useGetChallenges";

const useAddLikes = () => {
  const { GetChallenges } = useGetChallenges();
  const PostLikes = (challengeId: string | undefined) => {
    console.log("id in post", challengeId);
    const token = window.localStorage.getItem("token");
    console.log("chalenge id:", challengeId);
    var config = {
      method: "post",
      url: `http://192.168.99.104:3000/api/challenges/${challengeId}/likes`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
        GetChallenges();
  
      })
      .catch(function (error: any) {
        console.log("front end ");
        console.log(error);
      });
  };
  return { PostLikes };
};

export default useAddLikes;
