// src/pages/Layout.jsx

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export default function Layout() {
  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
}
