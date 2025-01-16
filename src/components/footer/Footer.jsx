import React from "react";
import "./footer.css";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
function Footer() {
  return (
    <footer>
      <a href="/" className="footer_logo">
        {/* Prashant */}
        <img
          src={require("../../assets/logo.png")}
          alt="logo"
          style={{ width: "200px", height: "auto" }}
        />
      </a>
      <ul className="permalinks">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>{/* <a href="#experience">Experiences</a> */}</li>
        {/* <li>
          <a href="#services">Services</a>
        </li> */}
        <li>
          <a href="#portfolio">Portfolio</a>
        </li>
        {/* <li>
          <a href="#testimonials">Testimonials</a>
        </li> */}
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="footer_socials">
        <a href="https://www.facebook.com/profile.php?id=100079383163545">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/khatiwada_prashant/">
          <FiInstagram />
        </a>
        <a href="https://www.linkedin.com/in/prashant-khatiwada-a0b99a184/">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer_copyright">
        <small>© PRASHANT's Portfolio. All rights reserved </small>
      </div>
    </footer>
  );
}
export default Footer;
