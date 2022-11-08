import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { Navigate, useParams, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useForget from '../../../Hooks/useForget';
import CustomizedSnackbars from '../../../Components/Toast';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});


const ForgotPassword = (props: any) => {
  const [open, setOpen] = React.useState(false);

  let { userType } = useParams();
  console.log("userType in forget password  email", userType);
  const { Forget } = useForget(userType);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      Forget(values.email, setLoading, setOpen);
    },
  });
  if (userType !== 'brand' && userType !== 'customer' && userType !== 'admin') {
    return < Navigate to="/404_Not_Found" />
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
                  <h1 className='loginheading'>Admin Password Change</h1>
                ) : userType === "brand" ? (
                  <h1 className='loginheading'>Brand Password Change</h1>
                ) : <h1 className='loginheading'>Customer Password Change</h1>
                }
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

                <Button variant='contained' className='loginButton' type="submit" sx={{
                  margin: '8px', color: 'white', backgroundColor: '#0e27c9ce;'
                }} >
                  Send Reset Link
                </Button>

                {userType === "admin" ? (
                  <Link id="span2" to="login/admin">
                    LOGIN AS ADMIN!
                  </Link>

                ) : userType === "brand" ? (
                  <Link id="span2" to="login/brand">
                    LOGIN AS BRAND!
                  </Link>
                ) : <Link id="span2" to="login/customer">
                  LOGIN AS CUSTOMER!
                </Link>
                }


                <CustomizedSnackbars
                  open={open}
                  setOpen={setOpen}
                  text={"Reset link has been set to your email"}
                ></CustomizedSnackbars>
                <br></br>



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

export default ForgotPassword;
