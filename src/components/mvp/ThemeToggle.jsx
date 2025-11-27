import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.5
      }}
      onClick={toggleTheme}
      whileHover={{
        y: -4,
        boxShadow: "0 0 20px hsla(var(--primary), 0.5)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "fixed top-6 right-6 z-50",
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-background/70 backdrop-blur-lg",
        "border border-border shadow-lg",
        "hover:bg-background/80",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "transition-all duration-200"
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-foreground" strokeWidth={2} />
        ) : (
          <Moon className="w-5 h-5 text-foreground" strokeWidth={2} />
        )}
      </motion.div>
    </motion.button>
  );
}