import React from 'react'
import './Login.css';
import { useFormik } from "formik";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
//test
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

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
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  onBlur={formik.handleBlur}
                />
                <button className='loginButton' type="submit">
                  Submit
                </button>
              </form>
            </Box>


          </Box>
        </Box>

      </Box >
    </Box >

  )
}

export default Login