import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Login from "../App/Screens/Login/Login";

import ForgotPassword from "../App/Screens/Login/ForgotPassword";
import ResetPage from "../App/Screens/Login/ResetPage";
export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" />} />

        <Route path="/reset" element={<ResetPage />} />
        <Route path="/:userType/login" element={<Login />} />
        <Route path="/:userType/forgotpassword" element={<ForgotPassword />} />
        <Route path="/:userType/changepassword" element={<ResetPage />} />

        <Route path="/404_Not_Found" element={<>Page not found</>} />
        <Route element={<ProtectedRoute />}>

        </Route>
      </Routes>
    </Router>
  );
};
