import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";

export const Navigation = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<h5>Homeee</h5>} />
      </Routes>
    </Router>
  );

}


