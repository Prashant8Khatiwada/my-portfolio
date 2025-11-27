import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import BottomNav from "./components/mvp/BottomNav";
import ThemeToggle from "./components/mvp/ThemeToggle";
import Hero from "./components/mvp/Hero";
import ProjectCard from "./components/mvp/ProjectCard";
import Timeline from "./components/mvp/Timeline";
import StatsWidget from "./components/mvp/StatsWidget";
import ContactForm from "./components/mvp/ContactForm";
import Footer from "./components/mvp/Footer";
import About from "./components/mvp/About";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./lib/animations";

// Import Project Images
import WP from "./assets/portfolio/wealthPandit.png";
import YTClone from "./assets/portfolio/youtube_clone.png";
import PRB from "./assets/portfolio/pacific.png";
import Abroad from "./assets/portfolio/abroadInstitute.png";
import kumari from "./assets/portfolio/kumari.png";
import Enimto from "./assets/portfolio/enimto.png";

// Real Data
const projects = [
  {
    title: "Kumari Bank",
    description:
      "Official website for Kumari Bank Limited, featuring secure banking services, account management, and financial tools.",
    image: kumari,
    technologies: ["React", "Banking API", "Security"],
    demo: "https://www.kumaribank.com/en",
    featured: true,
  },
  {
    title: "Abroad Institute",
    description:
      "Educational consultancy platform helping students pursue studies abroad with course finder and application tracking.",
    image: Abroad,
    technologies: ["React", "Node.js", "MongoDB"],
    demo: "http://abroadinst.com",
    featured: true,
  },
  {
    title: "Pacific Regional Bank",
    description:
      "Digital banking platform for Pacific Regional Bank offering online account opening and transaction services.",
    image: PRB,
    technologies: ["React", "FinTech", "Secure Auth"],
    demo: "https://pacificbank.peacenepal.com",
    featured: true,
  },
  {
    title: "Wealth Pandit",
    description:
      "Financial advisory and wealth management platform for personalized investment strategies.",
    image: WP,
    technologies: ["React", "Charts.js", "Finance"],
    demo: "https://uat.wealthpandit.com",
  },
  {
    title: "Youtube Clone",
    description:
      "A functional clone of YouTube built with React, featuring video playback, search, and channel pages.",
    image: YTClone,
    technologies: ["React", "YouTube API", "Material UI"],
    github: "https://github.com/Prashant8Khatiwada/youtube-app",
    demo: "https://p-youtube-clone.netlify.app",
  },
  {
    title: "E-nimto",
    description: "Digital invitation platform for events and celebrations.",
    image: Enimto,
    technologies: ["React", "Firebase", "Social"],
    demo: "https://enimto.com/en",
  },
];

const experience = [
  {
    date: "2+ Years",
    title: "Frontend Developer",
    company: "Experience",
    description:
      "Specialized in building responsive, user-friendly web applications using React ecosystem.",
    technologies: ["React", "Redux", "Tailwind", "JavaScript"],
  },
  {
    date: "Projects",
    title: "10+ Completed",
    company: "Portfolio",
    description:
      "Successfully delivered over 10 web projects ranging from banking portals to educational platforms.",
    technologies: ["Web Development", "UI/UX Implementation"],
  },
  {
    date: "Skills",
    title: "UI/UX & Frontend",
    company: "Expertise",
    description:
      "Strong focus on creating polished, interactive user interfaces with modern design principles.",
    technologies: ["Figma", "CSS3", "HTML5", "Responsive Design"],
  },
];

const stats = [
  { value: "2", suffix: "+", label: "Years Experience" },
  { value: "10", suffix: "+", label: "Projects Completed" },
  { value: "50", suffix: "+", label: "Happy Clients" },
  { value: "15", suffix: "+", label: "Technologies" },
];

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <BottomNav />
        <ThemeToggle />

        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-24 bg-card/30">
          <div className="container mx-auto px-6">
            <StatsWidget stats={stats} />
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <section id="portfolio" className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                My Recent Work
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A selection of my recent projects including banking portals and
                educational platforms
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 bg-card/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Experience & Skills
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                My professional journey and technical expertise
              </p>
            </motion.div>

            <Timeline items={experience} type="experience" />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? Let's work together to create something
                amazing
              </p>
            </motion.div>

            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
