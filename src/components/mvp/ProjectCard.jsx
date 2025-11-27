import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "../../lib/utils";
import { hoverLift } from "../../lib/animations";

export default function ProjectCard({ project }) {
  const { title, description, image, technologies, github, demo, featured } =
    project;

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
      <div className="relative overflow-hidden aspect-video bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
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

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl" />
      </div>
    </motion.div>
  );
}
