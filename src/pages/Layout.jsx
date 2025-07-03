import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Single from "./Single";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:uid" element={<Single />} />
        <Route path="/planets/:uid" element={<Single />} />
        <Route path="/vehicles/:uid" element={<Single />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Layout;
