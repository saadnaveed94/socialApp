import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAdminSignup = (userType: any) => { 
  let navigate = useNavigate();
  let url =
    userType === "admin"
      ? "http://192.168.99.104:3000/api/admins"
      : userType === "brand"
      ? "http://192.168.99.104:3000/api/brands"
      : userType === "customer"
      ? "http://192.168.99.104:3000/api/customers"
      : "/404_Not_Found";
  const adminSignup = (
    name: string,
    email: string,
    password: string,
    location: string,
    setLoading: (Params: any) => any
  ) => {
    if (userType === "admin") {
      axios
        .post(url, {
          admin: {
            name: name,
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

          navigate("/feed/admin");
          setLoading(false);
        })

        .catch(function (error: string) {
          console.log(error);
          setLoading(false);
        });
    }
    if (userType === "brand") {
      axios
        .post(url, {
          brand: {
            name: name,
            email: email,
            password: password,
            location: location,
          },
        })
        .then(function (response: any) {
          console.log(response.data);
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.brand.token)
          );
          navigate("/feed/brand");
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
            name: name,
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
    adminSignup,
  };
};
export default useAdminSignup;
