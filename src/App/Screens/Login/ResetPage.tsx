import React, { useState } from 'react'
import './Login.css';
import { useFormik } from "formik";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";


import { Navigate, redirect, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useForget from '../../../Hooks/useForget';
import CustomizedSnackbars from '../../../components/ChangePasswordToast';
import useReset from '../../../Hooks/useReset';
import { Typography } from '@mui/joy';
const validationSchema = yup.object({
  // email: yup
  //   .string()
  //   .email('Enter a valid email')
  //   .required('Email is required'),
  password: yup
    .string()
    .required("Please enter your new password")
    .min(6, 'Password should be of minimum 6 characters length')
    .oneOf([yup.ref("password")], "Passwords do not match"), // yup.ref use horaha hai password match karwanay k liye
  confirmPassword: yup
    .string()
    .required("Confirm Password")
    .min(6, 'Password should be of minimum 6 characters length')
    .oneOf([yup.ref("password")], "Passwords do not match"), // yup.ref use horaha hai password match karwanay k liye

});



const ResetPage = (props: any) => {
  const [openToast, setOpenToast] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });
  const [passwordShown, setPasswordShown] = useState(false);
  let { userType, token } = useParams();
  console.log("Reset type in forget password", userType, token);
  const { ResetPwd } = useReset(userType, token);
  const [loading, setLoading] = useState(false);
  interface State {
    password: string;
    showPassword: boolean;
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const togglePassword = () => {
    // When the handler is invoked
    // chnage inverse the boolean state passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  const formik = useFormik({
    initialValues: {

      password: "",
      confirmPassword: "",
      usertoken: token || "",

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      ResetPwd(values.password, values.confirmPassword, values.usertoken, setLoading);

    }


  })

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



            <Box >

              <form onSubmit={formik.handleSubmit}>

                <Box >
                  <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined" />
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    sx={{ width: '440px' }}
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    // helperText={formik.touched.password && formik.errors.password}
                    onBlur={formik.handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => { setShowPassword(!showPassword) }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }

                  />
                  <Typography sx={{
                    color: "#d32f2f",
                    fontWeight: '500',
                    fontSize: '0.75rem'
                  }}>{formik.touched.password && formik.errors.password} </Typography>
                </Box>
                <div>
                  <Box sx={{
                    "& .MuiTextField-root": { m: 1, width: "100ch" }, display: "flex", flexWrap: "wrap"
                  }}>
                    <div>
                      <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined" />
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        sx={{ width: '440px' }}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.confirmPassword)}
                        // helperText={formik.touched.password && formik.errors.password}
                        onBlur={formik.handleBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }

                      />
                      <Typography sx={{
                        color: "#d32f2f",
                        fontWeight: '500',
                        fontSize: '0.75rem'
                      }}>{formik.touched.password && formik.errors.password} </Typography>
                    </div>
                  </Box>
                </div>


                {/* <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  onBlur={formik.handleBlur}
                /> */}


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
                }} onClick={CustomizedSnackbars}
                >
                  Change Password
                </Button>
                <br></br>
                <CustomizedSnackbars openToast={openToast}
                  setOpenToast={setOpenToast}  >

                </CustomizedSnackbars>

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

export default ResetPage;

