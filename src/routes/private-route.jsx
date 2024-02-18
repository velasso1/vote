import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.user.isAuth);

  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
