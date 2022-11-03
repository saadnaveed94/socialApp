import React from "react";
import axios from "axios";
import { Params } from "react-router-dom";

const useForget = (pwdType: any) => {
  let url =
    pwdType === "adminpassword"
      ? "http://192.168.99.104:3000/api/admins/password"
      : pwdType === "customerpassword"
      ? "http://192.168.99.104:3000/api/customers/password"
      : "http://192.168.99.104:3000/api/brands/password";
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
