import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Signup from "../App/Screens/Signup/Signup";
import Login from "../App/Screens/Login/Login";
export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path="/:userType" element={<Signup />} />
        <Route path='/404_Not_Found' element={<>Page not found</>} />
      </Routes>
    </Router>
  );
};
