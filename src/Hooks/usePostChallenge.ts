import axios from "axios";

const usePostChallenge = () => {
  const postChallenge = (
    challengeName: string,
    challengeDescription: string,
    challengeImage: Blob,
    challengeTag: string
  ) => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjcyMDYxOTMxLCJ2YWwiOjJ9.a-EhTSigS3Kw-hrZ5mCcrbzDGOXHTwc6qL_Z99wqdl0";
    console.log("in hook", challengeImage);
    const data = new FormData();
    data.append("challenge[title]", challengeName);
    data.append("challenge[description]", challengeDescription);
    data.append("tag[id]", challengeTag);
    data.append("challenge[images][]", challengeImage);
    console.log("in formdata", data);
    var config = {
      method: "post",
      url: "https://project2-p2.herokuapp.com/api/challenges",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NTIsImV4cCI6MTY3MjM4MjI3NSwidmFsIjoyfQ.ZrZMyBzSZBIAr_cHmqdpOsMSIgDY0GXhQMfGpMGwqEI",
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
