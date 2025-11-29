import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Globe, Smartphone, Search } from "lucide-react";
import { staggerContainer, staggerItem } from "../../lib/animations";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building fast, scalable, and secure web applications using modern technologies like React, Next.js, and Node.js.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces that provide seamless user experiences across all devices.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Ensuring your website looks and functions perfectly on smartphones and tablets with responsive design principles.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimizing applications for maximum speed and efficiency to improve user retention and SEO rankings.",
  },
  {
    icon: Globe,
    title: "SEO Services",
    description:
      "Implementing best practices to improve your website's visibility and ranking on search engines.",
  },
  {
    icon: Search,
    title: "Technical Consultation",
    description:
      "Providing expert advice on technology stack selection, architecture design, and development best practices.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for your digital needs
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
