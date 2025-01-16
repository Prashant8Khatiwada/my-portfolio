import React from "react";
import "./portfolio.css";
import WP from "../../assets/portfolio/wealthPandit.png";
import YTClone from "../../assets/portfolio/youtube_clone.png";
import PRB from "../../assets/portfolio/pacific.png";
import movie from "../../assets/portfolio/movie.png";
import Abroad from "../../assets/portfolio/abroadInstitute.png";
import kumari from "../../assets/portfolio/kumari.png";
import Enimto from "../../assets/portfolio/enimto.png";

const data = [
  {
    id: 4,
    Image: kumari,
    title: "Kumari Bank",
    demo: "https://www.kumaribank.com/en",
  },
  {
    id: 1,
    Image: Abroad,
    title: "Abroad Institute",
    demo: "http://abroadinst.com",
  },
  {
    id: 2,
    Image: PRB,
    title: "Pacific Regional Bank",
    demo: "https://pacificbank.peacenepal.com",
  },
  {
    id: 3,
    Image: WP,
    title: "Wealth Pandit",
    demo: "https://uat.wealthpandit.com",
  },

  {
    id: 5,
    Image: YTClone,
    title: "Youtube Clone",
    github: "https://github.com/Prashant8Khatiwada/youtube-app",
    demo: "https://p-youtube-clone.netlify.app",
  },
  {
    id: 6,
    Image: Enimto,
    title: "E-nimto",
    // github: "git@github.com:Prashant8Khatiwada/movie.git",
    demo: "https://enimto.com/en",
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
