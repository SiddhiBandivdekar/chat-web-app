import React from "react";
import { Navigate } from "react-router";

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;

  if (profile) {
    return <Navigate to="/" />;
  }

  return <div {...routeProps}>{children}</div>;
};

export default PublicRoute;
