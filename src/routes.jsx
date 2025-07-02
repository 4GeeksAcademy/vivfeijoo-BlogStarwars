import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Single from "./pages/Single.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/people/:uid" element={<Single />} />
  </Routes>
);

export default AppRoutes;

