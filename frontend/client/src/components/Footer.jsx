// Footer.js

import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <img
        src="../public/images/Travel_App__1_-removebg-preview.png"
        alt="logo"
        className="logo-footer"
      ></img>

      <div className="footer-links">
        <a href="#">Terms & Conditions</a>
      </div>

      <div className="footer-copyright">
        All rights Reserved <span class="copyright"></span> 2024
      </div>
    </div>
  );
};

export default Footer;
