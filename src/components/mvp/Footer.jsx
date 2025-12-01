import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { slideUp } from "../../lib/animations";
import Magnetic from "./Magnetic";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Prashant8Khatiwada",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/prashant-khatiwada-a0b99a184/",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:prashantkhatiwada554@gmail.com", label: "Email" },
];

const footerLinks = {
  Explore: [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#portfolio" },
    { name: "Experience", href: "#experience" },
  ],
  Connect: [
    { name: "Skills", href: "#skills" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <motion.div
        initial={slideUp.initial}
        whileInView={slideUp.animate}
        viewport={{ once: true }}
        transition={slideUp.transition}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Prashant Khatiwada
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Building amazing web experiences with modern technologies.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Magnetic key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20 block"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Prashant Khatiwada. All rights
              reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, TailwindCSS & Framer Motion
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
