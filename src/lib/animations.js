// Framer Motion animation variants for reusable animations

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
};

export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.6, ease: "easeOut" }
};

export const slideInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.5, ease: "easeOut" }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, ease: "easeOut" }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

// Hover animations
export const hoverLift = {
    whileHover: { y: -4, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 }
};

export const hoverGlow = {
    whileHover: {
        boxShadow: "0 0 20px hsla(250, 84%, 54%, 0.5)",
        transition: { duration: 0.3 }
    }
};

export const hoverScale = {
    whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    whileTap: { scale: 0.95 }
};
