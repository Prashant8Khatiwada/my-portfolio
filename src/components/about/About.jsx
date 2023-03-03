import ME from "../../assets/about-me.png";

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
              <h5>Experience</h5>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
