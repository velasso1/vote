import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.user.isAuth);

  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
