import axios from "axios";
import * as React from "react";
import { adminContext } from "../Contexts/Admin";

const usePostChallenge = () => {
  const { setChallenges, challenges } = React.useContext(adminContext);

  const postChallenge = (
    challengeName: string,
    challengeDescription: string,
    challengeImage: Blob,
    challengeTag: string
  ) => {
    const token = window.localStorage.getItem("token");
    const data = new FormData();
    data.append("challenge[title]", challengeName);
    data.append("challenge[description]", challengeDescription);
    data.append("tag[ids]", challengeTag);
    data.append("challenge[images][]", challengeImage);

    var config = {
      method: "post",
      url: "http://192.168.99.104:3000/api/challenges",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
        setChallenges(response.data);

        console.log("Challenges after update: ", challenges);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return { postChallenge };
};

export default usePostChallenge;
