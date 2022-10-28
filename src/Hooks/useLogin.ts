import React from "react";
import axios from "axios";
import { Params } from "react-router-dom";

const useLogin = (userType: any) => {
  let url =
    userType === "brand"
      ? "https://project2-p2.herokuapp.com/api/brands/login.json"
      : userType === "customer"
      ? "https://project2-p2.herokuapp.com/api/customers/login.json"
      : "https://project2-p2.herokuapp.com/api/admins/login.json";
  console.log(url);
  const adminLogin = (
    email: string,
    password: string,
    setLoading: (Params: any) => any
  ) => {
    const token = window.localStorage.getItem("token");
    if (userType === "brand") {
      axios
        .post(url, {
          brand: {
            email: email,
            password: password,
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
    if (userType === "admin") {
      axios
        .post(url, {
          admin: {
            email: email,
            password: password,
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
    if (userType === "customer") {
      axios
        .post(url, {
          customer: {
            email: email,
            password: password,
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
    adminLogin: adminLogin,
  };
};

export default useLogin;
