import React from "react";
import "rsuite/dist/rsuite.min.css";
import "./styles/main.scss";
import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";

const App = () => {
  return (
    <ProfileProvider>
      <Routes>
        <Route path="/signin" element={<PublicRoute element={<SignIn />} />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </ProfileProvider>
  );
};

export default App;
