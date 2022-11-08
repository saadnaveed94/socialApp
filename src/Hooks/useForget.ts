import axios from "axios";

const useForget = (pwdType: any) => {
  let url =
    pwdType === "admin"
      ? "http://192.168.99.104:3000/api/admins/password"
      : pwdType === "customerpassword"
      ? "http://192.168.99.104:3000/api/customers/password"
      : "http://192.168.99.104:3000/api/brands/password";
  console.log(url);

  const Forget = (
    email: string,
    setLoading: (Params: any) => any,
    setOpen: (Params: any) => any
  ) => {
    const token = window.localStorage.getItem("token");
    if (pwdType === "brand") {
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
          setOpen(true);
        });
    }
    if (pwdType === "admin") {
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
          setOpen(true);
        });
    }
    if (pwdType === "customer") {
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
          setOpen(true);
        });
    }
  };
  return {
    Forget,
  };
};

export default useForget;
