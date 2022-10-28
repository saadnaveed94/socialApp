import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Signup from "../App/Screens/Signup/Signup";
import Login from "../App/Screens/Login/Login";
import { useEffect } from "react";
import ForgotPassword from "../App/Screens/Login/ForgotPassword";
import ResetPage from "../App/Screens/Login/ResetPage";

export const Navigation = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login/customer" />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path='/login/:userType' element={<Login />} />
        <Route path='/forgotpassword/:pwdType' element={<ForgotPassword />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/404_Not_Found' element={<>Page not found</>} />

      </Routes>
    </Router>
  );

}


