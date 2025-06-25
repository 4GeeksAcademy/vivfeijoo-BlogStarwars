import React from "react";
import { Link } from "react-router-dom";
import starwarsLogo from "../assets/img/starwars-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
  <div className="container">
    <Link to="/" className="navbar-brand">
      <img src={starwarsLogo} alt="Star Wars" height="40" />
    </Link>
    <Link to="/" className="btn btn-primary ms-auto">Home</Link>
  </div>
</nav>
  );
};

export default Navbar;
