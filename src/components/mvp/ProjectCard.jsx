import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Maximize2, X, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "../../lib/utils";
import { hoverLift } from "../../lib/animations";

export default function ProjectCard({ project }) {
  const { title, description, image, technologies, github, demo, featured } = project;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // desktop or mobile
  const fullscreenRef = useRef(null);

  useEffect(() => {
    if (isFullscreen && fullscreenRef.current) {
      fullscreenRef.current.requestFullscreen().catch(console.error);
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setViewMode("desktop");
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <motion.div
      {...hoverLift}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300",
        "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="relative overflow-hidden aspect-[4/3] md:aspect-video bg-muted">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            No image available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {demo && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 transition-all text-sm font-medium"
            >
              <Maximize2 className="w-4 h-4" />
              Full Screen
            </button>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-all text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div ref={fullscreenRef} className="fixed inset-0 z-[9999] bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-background">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    viewMode === "desktop"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setViewMode("tablet")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    viewMode === "tablet"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Tablet className="w-4 h-4" />
                  Tablet
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    viewMode === "mobile"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setIsFullscreen(false);
                setViewMode("desktop");
              }}
              className="p-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Iframe */}
          <div className="flex-1 flex items-center justify-center p-6 bg-muted/30">
            <div
              className={cn(
                "bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300",
                viewMode === "desktop" ? "w-full h-full" :
                viewMode === "tablet" ? "w-[768px] h-[1024px]" :
                "w-[375px] h-[812px]"
              )}
            >
              <iframe
                src={demo}
                title={`${title} fullscreen preview`}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
