import React from "react";
import "./portfolio.css";
import IMG1 from "../../assets/project-1.png";
import IMG2 from "../../assets/project-2.png";
import IMG3 from "../../assets/project-3.png";
import IMG4 from "../../assets/project-4.png";
function Portfolio() {
  return (
    <section id="portfolio">
      <h5>My recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio_container">
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <img src={IMG1} alt="" />
          </div>
          <h3>This is portfolio title</h3>
          <div className="portfolio_item-cta">
          <a
            href="https://github.com/Prashant8Khatiwada/Chat-GPT"
            target="_blank"
            className="btn"
          >
            Github
          </a>
          <a
            href="https://pk-chat-gpt.netlify.app/"
            target="_blank"
            className="btn btn-primary"
          >
            Live Demo
          </a>
          </div>
        </article>
        {/* end of chat gpt  */}
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <img src={IMG2} alt="" />{" "}
          </div>
          <h3>This is portfolio title</h3>
          <div className="portfolio_item-cta">
          <a
            href="https://github.com/Prashant8Khatiwada/youtube-app"
            target="_blank"
            className="btn"
          >
            Github
          </a>
          <a
            href="https://p-youtube-clone.netlify.app"
            target="_blank"
            className="btn btn-primary"
          >
            Live Demo
          </a>
          </div>

        </article>
        {/* end of YouTube App */}
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <img src={IMG3} alt="" />{" "}
          </div>
          <h3>This is portfolio title</h3>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/Prashant8Khatiwada/50-project-javascript/tree/main/09_dadJokes"
              target="_blank"
              className="btn"
            >
              Github
            </a>
            <a
              href=" https://prashant8khatiwada.github.io/50-project-javascript/09_dadJokes"
              target="_blank"
              className="btn btn-primary"
            >
              Live Demo
            </a>
            </div>
        </article>
        {/* end of Dad Jokes  */}
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <img src={IMG4} alt="" />{" "}
          </div>
          <h3>This is portfolio title</h3>
          <div className="portfolio_item-cta">
          <a
            href="https://github.com/Prashant8Khatiwada/50-project-javascript/tree/main/12_movieApp"
            target="_blank"
            className="btn"
          >
            Github
          </a>
          <a
            href="https://prashant8khatiwada.github.io/50-project-javascript/12_movieApp/"
            target="_blank"
            className="btn btn-primary"
          >
            Live Demo
          </a>
          </div>
        </article>
        {/* end of chat gpt  */}
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <img src={IMG1} alt="" />{" "}
          </div>
          <h3>This is portfolio title</h3>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/prashant8khatiwada"
              target="_blank"
              className="btn"
            >
              Github
            </a>
            <a
              href="https://livedemo"
              target="_blank"
              className="btn btn-primary"
            >
              Live Demo
            </a>
          </div>
        </article>
        {/* end of chat gpt  */}
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <img src={IMG3} alt="" />{" "}
          </div>
          <h3>This is portfolio title</h3>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/prashant8khatiwada"
              target="_blank"
              className="btn"
            >
              Github
            </a>
            <a
              href="https://livedemo"
              target="_blank"
              className="btn btn-primary"
            >
              Live Demo
            </a>
          </div>
        </article>
        {/* end of chat gpt  */}
      </div>
    </section>
  );
}

export default Portfolio;
