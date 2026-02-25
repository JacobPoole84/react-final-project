import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2026 My Website. All rights reserved.</p>
      <div className="footer-links">
        <a href="https://github.com/JacobPoole84" target="_blank" rel="noreferrer">
          About
        </a>
        <a href="mailto:jacobpoole84@gmail.com">Contact</a>
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
