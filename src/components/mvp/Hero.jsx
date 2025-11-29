import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { fadeIn, slideUp } from "../../lib/animations";
import ME from "../../assets/me.png";
import DotMorphButton from "./DotMorphButton";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background pt-20 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-6 py-12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <motion.div {...fadeIn} className="inline-block mb-8">
              <DotMorphButton label="Available for freelance work" />
            </motion.div>

            {/* Main heading */}
            <motion.div {...slideUp}>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-2">
                Hello I'm
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
                Prashant Khatiwada
              </h1>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
                Frontend Developer
              </h3>
            </motion.div>

            <motion.p
              {...slideUp}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0"
            >
              I have a strong curiosity and creative mindset that drives me to
              find innovative solutions. Passionate React developer skilled at
              creating polished and effective web solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...slideUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-12"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                Let's Talk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground border-2 border-border rounded-lg font-semibold hover:border-primary hover:bg-primary/5 transition-all hover:scale-105"
              >
                View Work
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              {...fadeIn}
              className="flex gap-4 justify-center md:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/Prashant8Khatiwada" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/prashant-khatiwada-70405126a/",
                },
                { icon: Mail, href: "mailto:prashantkhatiwada21@gmail.com" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <Magnetic key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20 block"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  </Magnetic>
                );
              })}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 relative max-w-md mx-auto md:max-w-none"
          >
            <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden border-4 border-primary/20 bg-gradient-to-b from-primary/10 to-transparent">
              <img
                src={ME}
                alt="Prashant Khatiwada"
                className="w-full h-full object-cover object-top pt-4 hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-2xl transform scale-110" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
