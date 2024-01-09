import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ element }) => {
  const profile = false; // Replace with your authentication logic

  if (!profile) {
    return <Navigate to="/signin" />;
  }

  return element;
};


export default PrivateRoute;
