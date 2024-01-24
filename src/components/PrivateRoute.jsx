import React from "react";
import { Navigate } from "react-router";
import { useProfile } from "../context/profile.context";
import { Container, Loader } from "rsuite";

const PrivateRoute = ({ element }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  if (!profile && !isLoading) {
    return <Navigate to="/signin" />;
  }

  return element;
};

export default PrivateRoute;
