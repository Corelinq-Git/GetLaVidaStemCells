"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect } from "react";
import { staggerContainer, curtainReveal } from "@/lib/animations";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 92, suffix: "%+", label: "Cell Viability Rate" },
  { value: 5000, suffix: "+", label: "Patients Treated" },
  { value: 100, suffix: "%", label: "Fresh, Never Frozen" },
  { value: 3, suffix: "-5 Days", label: "Treatment Protocol" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      {/* Parallax B&W background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10%] h-[120%]"
      >
        <img
          src="/images/stem-cells-bw.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover grayscale"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ocean-deepest/85" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={curtainReveal} className="text-center">
              <div
                className="font-display font-bold text-cream leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-cream-muted text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
