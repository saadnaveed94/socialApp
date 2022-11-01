import React from "react";
import axios from "axios";

const useAddComments = () => {
  const PostComments = (challenge_id: string, newComment: string) => {
    const token = window.localStorage.getItem("token");
    var data = new FormData();
    data.append("comment[description]", newComment);

    var config = {
      method: "post",
      url: `https://project2-p2.herokuapp.com/api/challenges/${challenge_id}/comments`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return { PostComments };
};

export default useAddComments;
