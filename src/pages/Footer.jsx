import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
      <div className="footer-links">
        <a href="#">About</a>
        <a href="mailto:jacobpoole84@gmail.com">Contact</a>
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
