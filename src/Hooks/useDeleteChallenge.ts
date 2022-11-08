import axios from "axios";
import useGetChallenges from "./useGetChallenges";

const useDeleteChallenge = () => {
  const { GetChallenges } = useGetChallenges();
  const DeleteChallenge = (challengeId: string) => {
    const token = window.localStorage.getItem("token");

    var config = {
      method: "delete",
      url: `http://192.168.99.104:3000/api/challenges/${challengeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: "",
    };

    axios(config)
      .then(function (response: any) {
        console.log(response.data);
        GetChallenges();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };
  return { DeleteChallenge };
};

export default useDeleteChallenge;
