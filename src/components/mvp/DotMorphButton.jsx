import { motion } from "framer-motion";
import { useState } from "react";

export default function DotMorphButton({ label, className = "", onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
    >
      <motion.span
        animate={
          isHovered
            ? {
                width: 12,
                height: 28,
                borderRadius: 999,
              }
            : {
                width: 16,
                height: 16,
                borderRadius: 999,
              }
        }
        className="flex items-center justify-center"
        initial={false}
        style={{
          background: "hsl(var(--primary))",
          display: "inline-block",
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 22,
        }}
      />
      <span className="select-none font-medium text-sm text-foreground">
        {label}
      </span>
    </button>
  );
}
