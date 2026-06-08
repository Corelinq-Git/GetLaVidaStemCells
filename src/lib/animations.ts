import type { Variants } from "framer-motion";

// Matthew's signature smooth-out easing curve
export const customEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: customEase },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: customEase },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

export const wordReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const wordRevealChild: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: customEase },
  },
};

export const textMaskReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: customEase },
  },
};

export const staggeredFadeIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: customEase },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: customEase },
  },
};

export const cardHover = {
  scale: 1.03,
  y: -4,
  boxShadow: "0 20px 40px rgba(15, 95, 127, 0.12)",
  transition: { duration: 0.3, ease: customEase },
};

export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
};

export const floatLoop = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export const viewportGate: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    clipPath: "inset(5% 5% 5% 5%)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: customEase },
  },
};

export const curtainReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: customEase },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: customEase },
  },
};
