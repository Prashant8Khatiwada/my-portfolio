import React, { useState } from "react";
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
import Services from "./components/mvp/Services";
import Testimonials from "./components/mvp/Testimonials";
import SEO from "./components/mvp/SEO";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./lib/animations";
import { cn } from "./lib/utils";

// Import Project Images
import WP from "./assets/portfolio/wealthPandit.png";
import YTClone from "./assets/portfolio/youtube_clone.png";
import PRB from "./assets/portfolio/pacific.png";
import Abroad from "./assets/portfolio/abroadInstitute.png";
import kumari from "./assets/portfolio/kumari.png";
import Enimto from "./assets/portfolio/enimto.png";
import SawariExpertImage from "./assets/portfolio/sawari.png";
import FotosFolioImage from "./assets/portfolio/fotosfolio.png";

// Real Data
const projects = [
  {
    title: "FotosFolio",
    description:
      "Portfolio platform for photographers and visual artists to showcase high-quality images, manage galleries, and share work with clients.",
    image: FotosFolioImage, // replace with your imported image variable
    technologies: ["React", "Next.js", "Cloud Storage"],
    demo: "https://fotosfolio.com/",
    featured: true,
  },
  {
    title: "Sawari Expert",
    description:
      "Ride-hailing and transport management platform providing seamless booking, driver tracking, and customer support for urban commuters.",
    image: SawariExpertImage, // replace with your imported image variable
    technologies: ["React", "Node.js", "Google Maps API"],
    demo: "https://sawariexpert.com/",
    featured: true,
  },
  {
    title: "Kumari Bank",
    description:
      "Official website for Kumari Bank Limited, featuring secure banking services, account management, and financial tools.",
    image: kumari,
    technologies: ["React", "Banking API", "Security"],
    demo: "https://www.kumaribank.com/en/personal-banking",
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
    featured: true,
  },

  {
    title: "Youtube Clone",
    description:
      "A functional clone of YouTube built with React, featuring video playback, search, and channel pages.",
    image: YTClone,
    technologies: ["React", "YouTube API", "Material UI"],
    // github: "https://github.com/Prashant8Khatiwada/youtube-app",
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
    date: "Jan 2025 – Sept 2025",
    title: "Mid-level Developer",
    company: "Blueneontech",
    description:
      "Built Fotosfolio platform with Next.js and TypeScript. Implemented galleries with lazy loading and Cloudinary integration, achieving 45% faster load times. Developed vehicle service booking system with real-time calendar and dashboard.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "React",
      "Mantine UI",
      "Cloudinary",
    ],
  },
  {
    date: "Jan 2024 – Dec 2024",
    title: "Junior Developer",
    company: "Peace Nepal",
    description:
      "Developed KYC forms for ADBL and Pacific Regional Bank using React, Formik, and Context API. Led CIVI app development with location mapping (Leaflet) and Firebase storage. Implemented secure API integrations with Yup and Zod validation.",
    technologies: [
      "React",
      "Formik",
      "Context API",
      "Leaflet",
      "Firebase",
      "Yup",
      "Zod",
    ],
  },
  {
    date: "Mar 2023 – Nov 2023",
    title: "Junior Developer",
    company: "Lancemeup",
    description:
      "Worked on WealthPandit and multiple client projects. Built advanced calendar component with CSS Grid, date-fns, and Google Calendar sync. Optimized frontend performance with incremental updates.",
    technologies: ["React", "CSS Grid", "date-fns", "Google Calendar API"],
  },
  {
    date: "Dec 2022 – Mar 2023",
    title: "Frontend Intern",
    company: "Lancemeup",
    description:
      "Built responsive WealthPandit website using React Query for optimized data fetching. Contributed to TickTicketing platform with performance fixes and feature enhancements.",
    technologies: ["React", "React Query", "Performance Optimization"],
  },
];

const skills = [
  {
    date: "Frontend",
    title: "Core Technologies",
    company: "Expertise",
    description:
      "Proficient in modern frontend frameworks and libraries for building scalable, performant web applications.",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
    ],
  },
  {
    date: "State Management",
    title: "Data Flow",
    company: "Expertise",
    description:
      "Experienced in various state management solutions for complex application architectures.",
    technologies: ["Redux", "Context API", "Zustand", "React Query"],
  },
  {
    date: "Styling",
    title: "UI Frameworks",
    company: "Expertise",
    description:
      "Skilled in modern CSS frameworks and component libraries for creating beautiful, responsive interfaces.",
    technologies: [
      "Tailwind CSS",
      "SCSS",
      "ShadCN",
      "Mantine UI",
      "Material UI",
      "Styled Components",
    ],
  },
  {
    date: "Backend & DB",
    title: "Full Stack",
    company: "Knowledge",
    description:
      "Familiar with backend technologies and databases for full-stack development capabilities.",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma",
      "NestJS",
      "Firebase",
    ],
  },
  {
    date: "Cloud & Tools",
    title: "DevOps",
    company: "Expertise",
    description:
      "Experienced with modern development tools, version control, and cloud deployment platforms.",
    technologies: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "Postman",
      "Swagger",
      "AWS",
      "Vercel",
      "Netlify",
    ],
  },
];

const stats = [
  { value: "3", suffix: "+", label: "Years Experience" },
  { value: "10", suffix: "+", label: "Projects Completed" },
  { value: "20", suffix: "+", label: "Happy Clients" },
  { value: "10", suffix: "+", label: "Technologies" },
];

function App() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "featured" ? projects.filter((p) => p.featured) : projects;

  // Determine which projects to display
  const displayedProjects =
    activeTab === "all"
      ? projects // Always show all projects when "All Projects" is selected
      : showAllProjects
      ? filteredProjects // Show all filtered projects
      : filteredProjects.slice(0, 6); // Show first 6 filtered projects

  return (
    <ThemeProvider>
      <SEO />
      <div className="min-h-screen bg-background text-foreground">
        <BottomNav />
        <ThemeToggle />

        <main role="main" aria-label="Main content">
          {/* Hero Section */}
          <section id="home" aria-labelledby="hero-heading">
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

          {/* Services Section */}
          <Services />

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
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  A selection of my recent projects including banking portals
                  and educational platforms
                </p>

                <div className="flex justify-center gap-2 mb-8">
                  <button
                    onClick={() => {
                      setActiveTab("featured");
                      setShowAllProjects(false);
                    }}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                      activeTab === "featured"
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-card text-muted-foreground border border-border hover:border-primary hover:bg-primary/5"
                    )}
                  >
                    Featured
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("all");
                      setShowAllProjects(false);
                    }}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                      activeTab === "all"
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-card text-muted-foreground border border-border hover:border-primary hover:bg-primary/5"
                    )}
                  >
                    All Projects
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedProjects.map((project, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>

              {activeTab !== "all" && filteredProjects.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className={cn(
                      "px-8 py-3 rounded-lg font-medium transition-all hover:scale-105",
                      showAllProjects
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                        : "bg-card text-foreground border-2 border-border hover:border-primary hover:bg-primary/5"
                    )}
                  >
                    {showAllProjects ? "Show Less" : "View More Projects"}
                  </button>
                </motion.div>
              )}
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
                  Work Experience
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  My professional journey in web development
                </p>
              </motion.div>

              <Timeline items={experience} type="experience" />
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-24">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Technical Skills
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Technologies and tools I work with
                </p>
              </motion.div>

              <Timeline items={skills} type="skills" />
            </div>
          </section>

          {/* Testimonials Section */}
          <Testimonials />

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
                  Have a project in mind? Let's work together to create
                  something amazing
                </p>
              </motion.div>

              <ContactForm />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
