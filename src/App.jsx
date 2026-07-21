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
import { useAnalytics } from "./hooks/useAnalytics";
import { useProjects } from "./hooks/useProjects";
import { useTimeline } from "./hooks/useTimeline";
import { useSkills } from "./hooks/useSkills";
import { useProfile } from "./hooks/useProfile";
import { motion } from "framer-motion";
import { staggerContainer } from "./lib/animations";
import { cn } from "./lib/utils";

const EXPERIENCE_TECH_STACK = {
  "Mid-level Developer": [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "React",
    "Mantine UI",
    "Cloudinary",
  ],
  "Junior Developer": [
    "React",
    "Formik",
    "Context API",
    "Leaflet",
    "Firebase",
    "Yup",
    "Zod",
  ],
  "Frontend Developer Intern": ["React", "JavaScript", "CSS", "Git"],
  "Frontend Intern": ["React Query", "Responsive UI", "Performance"],
};

function App() {
  useAnalytics();
  const { projects, loading: projectsLoading } = useProjects();
  const { timeline, loading: timelineLoading } = useTimeline();
  const { skills, loading: skillsLoading } = useSkills();
  const { profile } = useProfile();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeTab, setActiveTab] = useState("featured");

  const stats = [
    { value: profile?.stats_experience || "3", suffix: "+", label: "Years Experience" },
    { value: profile?.stats_projects || "10", suffix: "+", label: "Projects Completed" },
    { value: profile?.stats_clients || "20", suffix: "+", label: "Happy Clients" },
    { value: profile?.stats_technologies || "10", suffix: "+", label: "Technologies" },
  ];

  const mappedProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image_url,
    technologies: project.tags || [],
    github: project.github_url,
    demo: project.live_url,
    featured: project.featured,
  }));

  const experience = timeline
    .filter((item) => item.type === "work")
    .map((item) => ({
      date: item.year,
      title: item.title,
      company: item.company,
      description: item.description,
      technologies: Array.isArray(item.technologies)
        ? item.technologies
        : typeof item.technologies === "string" &&
            item.technologies.trim().length > 0
          ? item.technologies
              .split(",")
              .map((tech) => tech.trim())
              .filter(Boolean)
          : EXPERIENCE_TECH_STACK[item.title] || [],
    }));

  const skillItems = skills.map((item) => ({
    date: item.category || "Skill",
    title: item.name,
    company: `Proficiency ${item.proficiency ?? 80}%`,
    description: item.description || "",
  }));

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "featured"
      ? mappedProjects.filter((p) => p.featured)
      : mappedProjects;

  // Determine which projects to display
  const displayedProjects =
    activeTab === "all"
      ? mappedProjects // Always show all projects when "All Projects" is selected
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
            <Hero profile={profile} />
          </section>

          {/* Stats Section */}
          <section id="stats" className="py-24 bg-card/30">
            <div className="container mx-auto px-6">
              <StatsWidget stats={stats} />
            </div>
          </section>

          {/* About Section */}
          <About profile={profile} />

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
                        : "bg-card text-muted-foreground border border-border hover:border-primary hover:bg-primary/5",
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
                        : "bg-card text-muted-foreground border border-border hover:border-primary hover:bg-primary/5",
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
                {projectsLoading ? (
                  <p className="text-muted-foreground">Loading projects...</p>
                ) : displayedProjects.length === 0 ? (
                  <p className="text-muted-foreground">
                    No projects found yet. Import content from admin dashboard.
                  </p>
                ) : (
                  displayedProjects.map((project, index) => (
                    <motion.div
                      key={project.id || `${project.title}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(index * 0.03, 0.2),
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                )}
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
                        : "bg-card text-foreground border-2 border-border hover:border-primary hover:bg-primary/5",
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

              {timelineLoading ? (
                <p className="text-muted-foreground">Loading experience...</p>
              ) : experience.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No work experience entries found yet.
                </p>
              ) : (
                <Timeline items={experience} type="experience" />
              )}
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

              {skillsLoading ? (
                <p className="text-muted-foreground">Loading skills...</p>
              ) : skillItems.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No technical skills found yet.
                </p>
              ) : (
                <Timeline items={skillItems} type="skills" />
              )}
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
