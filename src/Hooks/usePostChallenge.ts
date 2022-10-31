import axios from "axios";

const usePostChallenge = () => {
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
    data.append("tag[title]", challengeTag);
    data.append("challenge[images][]", challengeImage);

    var config = {
      method: "post",
      url: "https://project2-p2.herokuapp.com/api/challenges",
      headers: {
        Authorization: `Bearer ${token}`,
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
  return { postChallenge };
};

export default usePostChallenge;
