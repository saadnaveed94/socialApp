import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Signup from "../App/Screens/Signup/Signup";
import Login from "../App/Screens/Login/Login";
export const Navigation = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />


      </Routes>
    </Router>
  );

}


