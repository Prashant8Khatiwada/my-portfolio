import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Mail,
  Sparkles,
  MessageSquareQuote,
  Folder,
  Cpu,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Services", href: "#services", icon: Sparkles },
  { name: "Projects", href: "#portfolio", icon: Folder },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Testimonials", href: "#testimonials", icon: MessageSquareQuote },
  { name: "Contact", href: "#contact", icon: Mail },
];

// Dock Item Component with magnification effect
function DockIcon({ mouseX, item, isActive, onClick }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const Icon = item.icon;

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ width }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className="aspect-square relative flex items-center justify-center rounded-2xl group"
      aria-label={`Navigate to ${item.name} section`}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Background glow for active state */}
      {isActive && (
        <motion.div
          layoutId="activeDockItem"
          className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl blur-sm"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* Icon background */}
      <motion.div
        className="absolute inset-1 rounded-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md"
        style={{
          boxShadow: isActive
            ? "0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(var(--primary-rgb), 0.1)"
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Icon */}
      <Icon
        className={`relative z-10 transition-colors duration-200 ${
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
        size={24}
        strokeWidth={isActive ? 2.5 : 2}
      />

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
        }}
        className="absolute -top-12 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-foreground shadow-lg border border-border pointer-events-none"
      >
        {item.name}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background/95 border-r border-b border-border rotate-45" />
      </motion.div>
    </motion.button>
  );
}

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const mouseX = useMotionValue(Infinity);
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
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div
        className="pointer-events-auto relative"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {/* Dock Container */}
        <motion.div
          className="flex items-end gap-2 px-3 pb-3 pt-2 rounded-[24px] border border-border/50"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow:
              "0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {navItems.map((item) => (
            <DockIcon
              key={item.name}
              mouseX={mouseX}
              item={item}
              isActive={activeSection === item.name.toLowerCase()}
              onClick={(e) => handleNavClick(e, item.href)}
            />
          ))}
        </motion.div>

        {/* Dock Reflection Effect (like macOS) */}
        <div
          className="absolute inset-x-0 -bottom-2 h-8 rounded-[24px] opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
            filter: "blur(4px)",
            transform: "scaleY(-1)",
          }}
        />
      </div>
    </motion.nav>
  );
}
