import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // let navigate = useNavigate();

  return (
    <Outlet></Outlet>
    //use LoggedIn status
  );
};
