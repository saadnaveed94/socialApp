import axios from "axios";

import { useNavigate } from "react-router-dom";

const useLogin = (userType: any) => {
  let navigate = useNavigate();
  let url =
    userType === "brand"
      ? "http://192.168.99.104:3000/api/brands/login.json"
      : userType === "customer"
      ? "http://192.168.99.104:3000/api/customers/login.json"
      : "http://192.168.99.104:3000/api/admins/login.json";
  console.log(url);
  const adminLogin = (
    email: string,
    password: string,
    setLoading: (Params: any) => any
  ) => {
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
          window.localStorage.setItem(
            "userId",
            JSON.stringify(response.data.brand.id)
          );

          navigate("/feed/brand");
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
          window.localStorage.setItem(
            "userId",
            JSON.stringify(response.data.admin.id)
          );
          navigate("/feed/admin");
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
          window.localStorage.setItem(
            "userId",
            JSON.stringify(response.data.customer.id)
          );
          navigate("/feed/customer");
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
