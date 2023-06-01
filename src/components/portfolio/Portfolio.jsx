import React from "react";
import "./portfolio.css";
import IMG1 from "../../assets/project-2.png";
import IMG2 from "../../assets/project-1.png";
import IMG3 from "../../assets/project-3.png";
import IMG4 from "../../assets/project-4.png";

const data = [
  {
    id: 1,
    Image: IMG1,
    title: "Chat GPT",
    github: "https://github.com/Prashant8Khatiwada/Chat-GPT",
    demo: "https://pk-chat-gpt.netlify.app/",
  },
  {
    id: 2,
    Image: IMG2,
    title: "Youtube Clone",
    github: "https://github.com/Prashant8Khatiwada/youtube-app",
    demo: "https://p-youtube-clone.netlify.app",
  },
  {
    id: 3,
    Image: IMG3,
    title: "Jokes Generator",
    github:
      "https://github.com/Prashant8Khatiwada/50-project-javascript/tree/main/09_dadJokes",
    demo: "https://prashant8khatiwada.github.io/50-project-javascript/09_dadJokes",
  },
  {
    id: 4,
    Image: IMG4,
    title: "Movie App",
    github:
      "https://github.com/Prashant8Khatiwada/50-project-javascript/tree/main/12_movieApp",
    demo: "https://prashant8khatiwada.github.io/50-project-javascript/12_movieApp/",
  },
  {
    id: 1,
    Image: IMG1,
    title: "Chat GPT",
    github:
      "https://github.com/Prashant8Khatiwada/50-project-javascript/tree/main/12_movieApp",
    demo: "https://prashant8khatiwada.github.io/50-project-javascript/12_movieApp/",
  },
  {
    id: 1,
    Image: IMG4,
    title: "Chat GPT",
    github:
      "https://github.com/Prashant8Khatiwada/50-project-javascript/tree/main/12_movieApp",
    demo: "https://prashant8khatiwada.github.io/50-project-javascript/12_movieApp/",
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
                <a href={github} target="_blank" className="btn">
                  Github
                </a>
                <a href={demo} target="_blank" className="btn btn-primary">
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
