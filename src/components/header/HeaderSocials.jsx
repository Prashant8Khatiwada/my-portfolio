import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaInstagram } from "react-icons/fa";
function HeaderSocials() {
  return (
    <div className="header_socials">
      <a
        href="https://www.linkedin.com/in/prashant-khatiwada-a0b99a184/"
        target="_blank"
      >
        <BsLinkedin />
      </a>
      <a href="https://github.com/prashant8Khatiwada/" target="_blank">
        <FaGithub />
      </a>
      <a href="https://www.instagram.com/khatiwada_prashant/" target="_blank">
        <FaInstagram />
      </a>
    </div>
  );
}

export default HeaderSocials;
