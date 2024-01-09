import React from "react";
import { Navigate } from "react-router";

const PublicRoute = ({ element }) => {
  const profile = false; 

  if (profile) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PublicRoute;
