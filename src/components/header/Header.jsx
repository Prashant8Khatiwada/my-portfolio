import { Suspense } from "react";
import CTA from "./CTA";
import ME from "../../assets/me.png";
import "./header.css";
import HeaderSocials from "./HeaderSocials";
function Header() {
  return (
    <header>
      <div className="container header_container">
        <h5>Hello I'm</h5>
        <h1>Prashant Khatiwada</h1>
        <h5 className="text-light">Frontend Developer</h5>
        <CTA />
        <HeaderSocials />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="me">
            <img src={ME} alt="me" />
          </div>
        </Suspense>

        <a href="#contact" className="scroll_down">
          Scroll Down
        </a>
      </div>
    </header>
  );
}

export default Header;
