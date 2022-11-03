import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import useLogin from "../../../Hooks/useLogin";

import { Link, Navigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Login = () => {
  let { userType } = useParams();
  console.log("usertype in login:", userType);
  const [loading, setLoading] = useState(false);

  const { adminLogin } = useLogin(userType);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      adminLogin(values.email, values.password, setLoading);
      setLoading(true);
    },
  });

  if (userType !== "customer" && userType !== "admin" && userType !== "brand") {
    return <Navigate to="/404_Not_Found" />;
  }

  return (
    <Box className="login">
      <Box className="loginWrapper">
        <Box className="loginLeft">
          <h3 className="loginText">Social Media App</h3>
          <Box className="loginDesc">Connect with each other!</Box>
        </Box>
        <Box className="loginRight">
          <Box className="loginBox">
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                {userType === "admin" ? (
                  <h1 className="loginheading">Login as admin</h1>
                ) : userType === "brand" ? (
                  <h1 className="loginheading">Login as brand</h1>
                ) : (
                  <h1 className="loginheading">Login as customer</h1>
                )}
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  onBlur={formik.handleBlur}
                />
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "-6rem",
                    }}
                  >
                    <CircularProgress></CircularProgress>
                  </Box>
                )}

                <Button
                  variant="contained"
                  className="loginButton"
                  type="submit"
                  sx={{
                    margin: "8px",
                    color: "white",
                  }}
                >
                  LOGIN
                </Button>
                <br></br>

                <span id="span">Don't have an account?</span>
                <br></br>
                {userType === "admin" ? (
                  <Link id="span2" to="/admin">
                    SIGNUP AS ADMIN!
                  </Link>
                ) : userType === "brand" ? (
                  <Link id="span2" to="/brand">
                    SIGNUP AS BRAND!
                  </Link>
                ) : (
                  <Link id="span2" to="/customer">
                    SIGNUP AS CUSTOMER!
                  </Link>
                )}
                <br></br>
                {userType === "admin" ? (
                  <Link id="span2" to="/forgotpassword/adminpassword">
                    Forgot Password?
                  </Link>
                ) : userType === "brand" ? (
                  <Link id="span2" to="/forgotpassword/brandpassword">
                    Forgot Password?
                  </Link>
                ) : (
                  <Link id="span2" to="/forgotpassword/customerpassword">
                    Forgot Password?
                  </Link>
                )}
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
