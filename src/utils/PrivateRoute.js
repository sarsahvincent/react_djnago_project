import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  let { user } = useContext(AuthContext);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  // return <Outlet />;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
