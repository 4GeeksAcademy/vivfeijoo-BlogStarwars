import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">
        Star Wars Blog
      </Link>
      <Link to="/" className="btn btn-primary">Home</Link>
    </nav>
  );
};

export default Navbar;

