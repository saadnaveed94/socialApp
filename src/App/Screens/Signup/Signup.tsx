import React from "react";
import "./Signup.css";
import { useFormik, validateYupSchema } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import useAdminSignup from "../../../Hooks/useAdminSignup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Location from "./Location";

const validationSchema = yup.object({
  name: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Signup = (props: any) => {
  let { userType } = useParams();
  const [loading, setLoading] = useState(false);
  const { adminSignup } = useAdminSignup(userType);
  const formik = useFormik({
    initialValues: {
      name: "", 
      email: "",
      password: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      adminSignup(
        values.name,
        values.email,
        values.password,
        values.location,
        setLoading
      );
      setLoading(true);
    }, 
  });

  if (userType !== "customer" && userType !== "admin" && userType !== "brand") {
    return <Navigate to="/404_Not_Found" />;
  }
  return (
    <Box className="signup">
      <Box className="signupWrapper">
        <Box className="signupLeft">
          <h3 className="signupText">Social Media App</h3>
          <Box className="signupDesc">Connect with each other!</Box>
        </Box>
        <Box className="signupRight">
          <Box className="signupBox">
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                {userType === "admin" ? (
                  <h1 className="signHeading">Signup as an Admin</h1>
                ) : userType === "brand" ? (
                  <h1 className="signHeading">Signup as a Brand</h1>
                ) : (
                  <h1 className="signHeading">Signup as a Customer</h1>
                )}

                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Username"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  onBlur={formik.handleBlur}
                />

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
                {userType === "brand" && (
                  <Location
                    id="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                  />
                )}

                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "-6rem",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                <button className="signButton" type="submit">
                  SIGNUP
                </button>

                <span id="span">Already have an account?</span>
                <br></br>
                <Link id="span2" to="/">
                  LOGIN
                </Link>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Signup;
