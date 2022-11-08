import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Signup from "../App/Screens/Signup/Signup";
import Login from "../App/Screens/Login/Login";

import ForgotPassword from "../App/Screens/Login/ForgotPassword";
import ResetPage from "../App/Screens/Login/ResetPage";
import { Feed } from "../App/Screens/Feed/feed";
import { Tricks } from "../App/Screens/Tricks/Tricks";
export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path='/:userType/login' element={<Login />} />
        <Route path='/:userType/forgotpassword' element={<ForgotPassword />} />
        <Route path='/:userType/changepassword' element={<ResetPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/404_Not_Found' element={<>Page not found</>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/feed/:userType" element={<Feed />} />
          <Route path="/feed/tricks/" element={<Tricks />} />
          {/* <Link to="/feed/tricks/">
            <img
              src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
              alt="example"
            />
          </Link> */}
        </Route>
      </Routes>
    </Router>
  );
};
