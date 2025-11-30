import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Import testimonial images
import NirgunImage from "../../assets/testimonials/nirgun.png";
import BibekImage from "../../assets/testimonials/bibek.jpg";
import AayushImage from "../../assets/testimonials/ayush.png";
import ShuklaImage from "../../assets/testimonials/shukla.png";

const testimonials = [
  {
    name: "Nirgun Subedi",
    role: "CTO",
    company: "Blueneon Technology",
    content:
      "Prashant delivered reliable and scalable frontend solutions using React, Next.js, and TypeScript during his time at Blueneon Technology. His work on Fotosfolio and our service-management platform reduced load times, improved UI quality, and helped us ship features faster. He works independently, communicates clearly, and consistently meets technical expectations.",
    image: NirgunImage,
    status: "draft - needs approval",
  },
  {
    name: "Bibek Timilsina",
    role: "Flutter & Backend Developer",
    company: "International/Foreign Company",
    content:
      "I've collaborated with Prashant on multiple frontend–backend integrations, and he consistently delivered clean, maintainable code. His understanding of APIs, frontend performance, and TypeScript helped our cross-platform features work smoothly. Easy to coordinate with, detail-oriented, and dependable on delivery timelines.",
    image: BibekImage,
    status: "draft - needs approval",
  },
  {
    name: "Aayush Shrestha",
    role: "Backend Developer",
    company: "Blueneon Technology",
    content:
      "Prashant was efficient and precise in implementing UI features that aligned smoothly with our backend systems. He understands API logic well, catches edge-cases early, and ensures the frontend remains stable and optimized. His collaboration and communication made integration work straightforward.",
    image: AayushImage,
    status: "draft - needs approval",
  },
  {
    name: "Mritunjay Sukla",
    role: "QA Engineer",
    company: "—",
    content:
      "I’ve worked with Prashant on several projects where his frontend delivery ensured a smooth and predictable QA process. His stable React and TypeScript implementations were consistent and easy to test, significantly reducing regression issues and enhancing overall release quality. He communicates clearly, responds promptly to feedback, and collaborates effectively during debugging and validation.",
    image: ShuklaImage,
    status: "draft - needs approval",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-rotate testimonials
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-card/20 to-background"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by colleagues and clients worldwide
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Testimonial Cards - Stacked with perspective */}
          <div className="relative h-[500px] md:h-[450px] flex items-center justify-center perspective-1000">
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: `${offset * 100}%`,
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4,
                    rotateY: offset * -15,
                    z: isActive ? 100 : -100 * Math.abs(offset),
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="w-full max-w-3xl mx-auto px-4">
                    {/* Glassmorphic Card */}
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        rotateY: 2,
                        transition: { duration: 0.3 },
                      }}
                      className="relative backdrop-blur-xl bg-card/80 border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-primary/20"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Large decorative quote */}
                      <div className="absolute top-8 left-8 text-primary/20">
                        <Quote
                          className="w-20 h-20 md:w-24 md:h-24"
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 space-y-6">
                        {/* Testimonial Text */}
                        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light italic pl-8 md:pl-12">
                          "{testimonial.content}"
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-6 pt-6 border-t border-border/30">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="relative flex-shrink-0"
                          >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* Premium badge */}
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-card shadow-lg">
                              <svg
                                className="w-4 h-4 text-primary-foreground"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </motion.div>

                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-1 text-foreground">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-1">
                              {testimonial.role}
                            </p>
                            <p className="text-xs font-medium text-primary/80">
                              {testimonial.company}
                            </p>
                          </div>

                          {/* Rating stars */}
                          <div className="hidden md:flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary scale-110"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
              {index === activeIndex && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
