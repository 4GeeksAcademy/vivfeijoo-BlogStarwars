import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">May the Force be with you © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
