import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.12 },
  },
};

export const cardFloat = (delay = 0) => ({
  y: [0, -13, 0],
  rotate: [0, 1.5, 0],
  transition: {
    duration: 4.8,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});
