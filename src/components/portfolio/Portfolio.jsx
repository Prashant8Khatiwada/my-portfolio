import React from "react";
import "./portfolio.css";
import IMG1 from "../../assets/project-2.png";
import IMG2 from "../../assets/project-1.png";
import IMG3 from "../../assets/nmb.png";
import IMG4 from "../../assets/project-4.png";
// import IMG5 from "../../assets/project-5.png";
import IMG6 from "../../assets/project-6.png";
import IMG7 from "../../assets/kumari.png";

const data = [
  {
    id: 6,
    Image: IMG6,
    title: "Abroad Institute",
    demo: "https://weamate.netlify.app/",
  },
  {
    id: 2,
    Image: IMG2,
    title: "Youtube Clone",
    github: "https://github.com/Prashant8Khatiwada/youtube-app",
    demo: "https://p-youtube-clone.netlify.app",
  },
  {
    id: 1,
    Image: IMG1,
    title: "Wealth Pandit",
    demo: "https://uat.wealthpandit.com",
  },
  {
    id: 4,
    Image: IMG4,
    title: "Movie App",
    github: "git@github.com:Prashant8Khatiwada/movie.git",
    demo: "https://web-movie-app.netlify.app/",
  },
  {
    id: 5,
    Image: IMG7,
    title: "Kumari Bank",
    demo: "https://www.kumaribank.com/en",
  },
  {
    id: 3,
    Image: IMG3,
    title: "NMB Bank",
    demo: "https://nmb.com.np",
  },
];

function Portfolio() {
  return (
    <section id="portfolio">
      <h5>My recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio_container">
        {data.map(({ id, Image, title, github, demo }) => {
          return (
            <article key={id} className="portfolio_item">
              <div className="portfolio_item-image">
                <img src={Image} alt="" />{" "}
              </div>
              <h3>{title}</h3>
              <div className="portfolio_item-cta">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Github
                  </a>
                )}
                <a
                  href={demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Live Demo
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Portfolio;
