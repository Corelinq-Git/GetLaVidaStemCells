"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionOverlayProps {
  children: ReactNode;
  className?: string;
}

export default function SectionOverlay({ children, className }: SectionOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const clipTop = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const clipPath = useTransform(clipTop, (v) =>
    `polygon(0 ${v}%, 100% 0%, 100% 100%, 0% 100%)`
  );

  return (
    <motion.div
      ref={ref}
      style={{ clipPath }}
      className={`relative -mt-16 md:-mt-24 z-10 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
