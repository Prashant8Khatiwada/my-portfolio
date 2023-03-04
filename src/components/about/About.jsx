import ME from "../../assets/about -me.png";
import { FaAward } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import "./about.css";

function About() {
  return (
    <section id="about">
      <h5>Get To Know Me</h5>
      <h2>About Me</h2>

      <div className="container about_container">
        <div className="about_me">
          <div className="about_me-image">
            <img src={ME} alt="About Image" />
          </div>
        </div>

        <div className="about_contents">
          <div className="about_cards">
            <article className="about_card">
              <FaAward className="about_icon" />
              <h5>Experience</h5>
              <small>3+ Years Working</small>
            </article>

            <article className="about_card">
              <FiUser className="about_icon" />
              <h5>Clients</h5>
              <small>50+ WorldWide</small>
            </article>

            <article className="about_card">
              <VscFolderLibrary className="about_icon" />
              <h5>Projects</h5>
              <small>50+ Completed</small>
            </article>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            distinctio id rem quae aliquid! Sapiente rerum accusantium cumque
            molestiae provident vero quod ipsum, assumenda, modi autem iste
            obcaecati voluptates sit eveniet nulla amet, iure earum asperiores
            impedit natus facilis? Voluptas a tempore vel ratione ipsum fugit
            omnis minus optio nostrum!
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
