import React from "react";
import "rsuite/dist/rsuite.min.css";
import "./styles/main.scss";
import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<PublicRoute element={<SignIn />} />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  );
};

export default App;
