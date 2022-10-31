import React from "react";
import axios from "axios";
import { Params } from "react-router-dom";

const useForget = (pwdType: any) => {
  let url =
    pwdType === "adminpassword"
      ? "https://project2-p2.herokuapp.com/api/admins/password"
      : pwdType === "customerpassword"
      ? "https://project2-p2.herokuapp.com/api/customers/password"
      : "https://project2-p2.herokuapp.com/api/brands/password";
  console.log(url);

  const Forget = (email: string, setLoading: (Params: any) => any) => {
    const token = window.localStorage.getItem("token");
    if (pwdType === "brandpassword") {
      axios
        .post(url, {
          brand: {
            email: email,
          },
        })
        .then(function (response: any) {
          console.log(response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.brand.token)
          );
          setLoading(false);
        })
        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }
    if (pwdType === "adminpassword") {
      axios
        .post(url, {
          admin: {
            email: email,
          },
        })
        .then(function (response: any) {
          console.log(response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.admin.token)
          );
          setLoading(false);
        })
        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }
    if (pwdType === "customerpassword") {
      axios
        .post(url, {
          customer: {
            email: email,
          },
        })
        .then(function (response: any) {
          console.log(response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.customer.token)
          );
          setLoading(false);
        })
        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }
  };
  return {
    Forget,
  };
};

export default useForget;
