import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { staggerContainer, staggerItem } from "../../lib/animations";

export default function Timeline({ items, type = "experience" }) {
  const Icon = type === "experience" ? Briefcase : GraduationCap;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="relative"
    >
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg shadow-primary/50">
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`flex-1 ${
              index % 2 === 0 ? "md:text-right" : "md:text-left"
            } pl-16 md:pl-0`}
          >
            <div
              className={`inline-block ${
                index % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
            >
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <span className="text-sm text-muted-foreground font-medium">
                  {item.date}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1">{item.title}</h3>
                <p className="text-primary font-medium mb-3">
                  {item.company || item.institution}
                </p>
                <p className="text-muted-foreground">{item.description}</p>

                {item.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Spacer for alternating layout */}
          <div className="flex-1 hidden md:block" />
        </motion.div>
      ))}
    </motion.div>
  );
}
