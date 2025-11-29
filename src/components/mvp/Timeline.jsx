import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

export default function Timeline({ items, type = "experience" }) {
  const Icon = type === "experience" ? Briefcase : GraduationCap;

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
              isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg shadow-primary/20 z-10">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>

            {/* Content */}
            <div
              className={`flex-1 ${
                isEven ? "md:text-right" : "md:text-left"
              } pl-16 md:pl-0`}
            >
              <div className={`inline-block ${isEven ? "md:mr-8" : "md:ml-8"}`}>
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all">
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
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="flex-1 hidden md:block" />
          </motion.div>
        );
      })}
    </div>
  );
}
