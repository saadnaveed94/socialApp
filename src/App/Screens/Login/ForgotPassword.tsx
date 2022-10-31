import React, { useState } from 'react'
import './Login.css';
import { useFormik } from "formik";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import { Navigate, redirect, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useForget from '../../../Hooks/useForget';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});


const ForgotPassword = () => {

  let { pwdType } = useParams();
  console.log("pwdType in forget password  email", pwdType);
  const { Forget } = useForget(pwdType);
  const [loading, setLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      Forget(values.email, setLoading);

    }


  });
  if (pwdType !== 'brandpassword' && pwdType !== 'customerpassword' && pwdType !== 'adminpassword') {
    return < Navigate to="/404_Not_Found" />
  }


  return (

    <Box className='login'>
      <Box className='loginWrapper'>
        <Box className='loginLeft'>
          <h3 className='loginText'>Social Media App</h3>
          <Box className='loginDesc'>
            Connect with each other!
          </Box>

        </Box>
        <Box className='loginRight'>
          <Box className='loginBox'>



            <Box sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" }
            }}>

              <form onSubmit={formik.handleSubmit}>
                {pwdType === "adminpassword" ? (
                  <h1 className='loginheading'>Admin Password Change</h1>
                ) : pwdType === "brandpassword" ? (
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

                {
                  loading && <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: '-6rem'
                  }}><CircularProgress></CircularProgress></Box>
                }

                <Button variant='contained' className='loginButton' type="submit" sx={{
                  margin: '8px', color: 'white'
                }}>
                  Send Reset Link
                </Button>
                <br></br>


                {/* <span id="span">LOGIN</span> */}
                <br></br>

                <br></br>
              </form>
            </Box>


          </Box>
        </Box>

      </Box >
    </Box >

  )
}

export default ForgotPassword;

