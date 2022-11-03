import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Signup from "../App/Screens/Signup/Signup";
import Login from "../App/Screens/Login/Login";
import { useEffect } from "react";
import ForgotPassword from "../App/Screens/Login/ForgotPassword";
import ResetPage from "../App/Screens/Login/ResetPage";
import { Feed } from "../App/Screens/Feed/feed";




export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path="/:userType/changepassword" element={<ResetPage />} />
        {/* <Route path="/:userType/changepassword/:token=" element={<ResetPage />} /> */}
        <Route path='/:userType/login' element={<Login />} />
        <Route path='/:userType/forgotpassword' element={<ForgotPassword />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/customers/chang/?reset_password_token=:token' element={<>Hellliooooo</>} /> */}

        <Route path='/404_Not_Found' element={<>Page not found</>} />
        <Route element={<ProtectedRoute />}>
          <Route path='/feed' element={<Feed />} />
        </Route>

      </Routes >
    </Router >
  );
};
