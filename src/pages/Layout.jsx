import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "../hooks/useGlobalReducer.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AppRoutes from "../routes.jsx";

const Layout = () => (
  <BrowserRouter>
    <StoreProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
    </StoreProvider>
  </BrowserRouter>
);

export default Layout;

