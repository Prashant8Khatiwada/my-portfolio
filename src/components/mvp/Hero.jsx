import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../../lib/utils";
import { fadeIn, slideUp } from "../../lib/animations";
import ME from "../../assets/me.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-6 py-12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <motion.div
              {...fadeIn}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium">
                Available for freelance work
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div {...slideUp}>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-2">
                Hello I'm
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
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
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Let's Talk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary/10 text-secondary border border-secondary/20 rounded-lg font-semibold hover:bg-secondary/20 transition-all hover:scale-105"
              >
                View Work
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <a
                href="https://github.com/Prashant8Khatiwada"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:your@email.com"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 relative max-w-md mx-auto md:max-w-none"
          >
            <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden border-4 border-primary/20 bg-gradient-to-b from-primary to-transparent">
              <img
                src={ME}
                alt="Prashant Khatiwada"
                className="w-full h-full object-cover object-top pt-4 hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl transform scale-110" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full p-1">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full mx-auto animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
