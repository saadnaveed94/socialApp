import { Outlet, useNavigate } from "react-router-dom";


export const ProtectedRoute = () => {

  let navigate = useNavigate();
  return 1 ? <Outlet></Outlet> : navigate('/');  //use LoggedIn status
}

