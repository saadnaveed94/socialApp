import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { Navigate, redirect, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useForget from '../../../Hooks/useForget';
import CustomizedSnackbars from '../../../Components/Toast';

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),

  confirmpassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"), // yup.ref use horaha hai password match karwanay k liye
});

const ResetPage = (props: any) => {
  let { pwdType } = useParams();
  console.log("pwdType in forget password", pwdType);
  const { Forget } = useForget(pwdType);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      Forget(values.password, setLoading);
    },
  });

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
                <TextField
                  id="confirmpassword"
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmpassword &&
                    Boolean(formik.errors.confirmpassword)
                  }
                  helperText={
                    formik.touched.confirmpassword &&
                    formik.errors.confirmpassword
                  }
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
                  onClick={CustomizedSnackbars}
                >
                  Change Password
                </Button>
                <br></br>
                <CustomizedSnackbars></CustomizedSnackbars>

                {/* <span id="span">LOGIN</span> */}
                <br></br>

                <br></br>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPage;
