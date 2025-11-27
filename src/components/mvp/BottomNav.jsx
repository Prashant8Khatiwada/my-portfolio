import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Award, Mail } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#portfolio", icon: Briefcase },
  { name: "Experience", href: "#experience", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const observerRefs = useRef([]);

  useEffect(() => {
    const observers = navItems.map((item, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.name.toLowerCase());
          }
        },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );

      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
        observerRefs.current[index] = observer;
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      setIsVisible(!scrollingDown || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
<motion.nav
  initial={{ y: 100, opacity: 0 }}
  animate={{ 
    y: isVisible ? 0 : 100,
    opacity: isVisible ? 1 : 0
  }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className="fixed bottom-4 left-1/2 z-50 bg-background/70 backdrop-blur-lg border border-border shadow-lg rounded-full px-3 py-2"
  style={{ x: "-50%" }} // centers nav horizontally
>
  <div className="relative">
    <div className="flex items-center justify-center gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.name.toLowerCase();
        const isHovered = hoveredItem === item.name;

        return (
          <motion.button
            key={item.name}
            onClick={(e) => handleNavClick(e, item.href)}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "min-w-[70px]"
            )}
            aria-label={`Navigate to ${item.name} section`}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Background highlight for active/hover */}
            <motion.div
              initial={false}
              animate={{
                opacity: isActive ? 1 : isHovered ? 0.5 : 0,
                scale: isActive ? 1 : isHovered ? 0.95 : 0.9,
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-primary/10 rounded-full"
            />

            {/* Icon */}
            <Icon
              className={cn(
                "w-5 h-5 transition-all duration-200 relative z-10",
                isActive 
                  ? "text-primary" 
                  : isHovered
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              strokeWidth={isActive ? 2.5 : 2}
            />

            {/* Label */}
            <span
              className={cn(
                "text-[11px] font-medium transition-all duration-200 relative z-10 whitespace-nowrap",
                isActive 
                  ? "text-primary" 
                  : isHovered
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                style={{ x: "-50%" }} // replaces -translate-x-1/2
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  </div>
</motion.nav>

  );
}