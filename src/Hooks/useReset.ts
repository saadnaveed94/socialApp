import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const useReset = (userType: any, token: any) => {
  console.log("testing..........coming", userType);
  let navigate = useNavigate();

  var url_string = window.location.href;
  console.log(url_string);
  var newurl = new URL(url_string);
  var c = newurl.searchParams.get("reset_password_token");
  console.log("coming------------------", c);
  let url =
    userType === "admin"
      ? `http://192.168.99.104:3000/api/admins/password`
      : userType === "brand"
      ? `http://192.168.99.104:3000/api/brands/password`
      : userType === "customer"
      ? `http://192.168.99.104:3000/api/customers/password`
      : "/404_Not_Found";
  const ResetPwd = (
    password: string,
    confirmPassword: string,
    token: string,
    setLoading: (Params: any) => any,
    setOpen: (Params: any) => any,
    open: boolean
  ) => {
    console.log("open value before api callll", open);
    if (userType === "admin") {
      axios
        .patch(url, {
          admin: {
            password: password,
            reset_password_token: c,
          },
        })
        .then(function (response: any) {
          console.log("response in here", response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.admin.token)
          );

          navigate("/feed");
          setLoading(false);
          setOpen(true);
          console.log("open value after---------------- api callll", open);
        })

        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
          setOpen(true);
        });
    }
    if (userType === "brand") {
      axios
        .patch(url, {
          brand: {
            password: password,

            reset_password_token: c,
          },
        })
        .then(function (response: any) {
          console.log("is coming-------------------------", response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.brand.token)
          );
          navigate("/feed");
          setLoading(false);
          setOpen(true);
          console.log("this is ----------------------------", response);
        })
        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }

    if (userType === "customer") {
      axios
        .patch(url, {
          customer: {
            // email: email,
            password: password,

            reset_password_token: c,
          },
        })
        .then(function (response: any) {
          console.log(response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.customer.token)
          );
          navigate("/feed");
          setLoading(false);
          setOpen(true);
          console.log("this is ----------------------------", response);
        })
        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
          setOpen(true);
        });
    }
  };

  return {
    ResetPwd,
  };
};
export default useReset;
