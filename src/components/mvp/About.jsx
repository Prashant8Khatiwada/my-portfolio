import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "../../lib/animations";
import ME from "../../assets/about -me.png";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image */}
          <motion.div
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-4 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <img
                src={ME}
                alt="About Me"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={slideUp.initial}
            whileInView={slideUp.animate}
            viewport={{ once: true }}
            transition={slideUp.transition}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">
              Get To Know Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">About Me</h3>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I have a strong curiosity and creative mindset that drives me to
              find innovative solutions and question the way things are done.
              Passionate React developer skilled at creating polished and
              effective web solutions.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I am deeply committed to keeping up with the latest advancements
              in the ever-changing React ecosystem and continuously improving my
              skills.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
