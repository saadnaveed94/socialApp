import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const useReset = (userType: any, token: any) => {
  console.log("testing..........coming", userType, token);
  let navigate = useNavigate();

  var url_string = window.location.href;
  var newurl = new URL(url_string);
  var c = newurl.searchParams.get("reset_password_token");
  console.log("coming------------------", c);
  let url =
    userType === "admin"
      ? "https://project2-p2.herokuapp.com/api/admins/password"
      : userType === "brand"
      ? "https://project2-p2.herokuapp.com/api/brands/password"
      : userType === "customer"
      ? "https://project2-p2.herokuapp.com/api/customers/password"
      : "/404_Not_Found";
  const ResetPwd = (
    password: string,
    confirmPassword: string,
    token: string,
    setLoading: (Params: any) => any
  ) => {
    if (userType === "admin") {
      // admin[reset_password_token]
      // const data = new FormData();
      // data.append(`${userType}[email]`, email);
      // data.append(`${userType}[password]`, password);
      // data.append(`${userType}[reset_password_token]`, token);

      axios
        .patch(url, {
          admin: {
            password: password,
            confirmPassword: password,
            reset_password_token: c,
          },
          // data: data,
        })
        .then(function (response: any) {
          console.log("response in here", response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.admin.token)
          );

          navigate("/feed");
          setLoading(false);
        })

        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }
    if (userType === "brand") {
      axios
        .patch(url, {
          brand: {
            // email: email,
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
        })
        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return {
    ResetPwd,
  };
};
export default useReset;
