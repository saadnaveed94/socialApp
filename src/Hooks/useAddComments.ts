import React from "react";
import axios from "axios";
import useGetChallenges from "./useGetChallenges";

const useAddComments = () => {
  const { GetChallenges } = useGetChallenges();
  const PostComments = (
    challengeId: string | undefined,
    newComment: string
  ) => {
    console.log("id in post", challengeId, "vale", newComment);
    const token = window.localStorage.getItem("token");
    var data = new FormData();
    data.append("comment[description]", newComment);

    var config = {
      method: "post",
      url: `http://192.168.99.104:3000/api/challenges/${challengeId}/comments`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
        // setComments({...comments, comments: response.data});
        GetChallenges();
      })
      .catch(function (error: any) {
        console.log("front end ");
        console.log(error);
      });
  };
  return { PostComments };
};

export default useAddComments;
