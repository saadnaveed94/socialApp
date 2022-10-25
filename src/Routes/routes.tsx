import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Signup from "../App/Screens/Signup/Signup";

export const Navigation = () => {

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        
      </Routes>
    </Router>
  );

}


