import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../App/Screens/Login/Login";
import { ProtectedRoute } from "./protectedRoute";

export const Navigation = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login></Login >} />
        <Route path='/login' element={<Login></Login >} />
      </Routes>
    </Router>
  );

}


