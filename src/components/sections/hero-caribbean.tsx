"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { wordReveal, wordRevealChild, fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { openAriana } from "@/lib/ariana";

interface HeroCaribbeanProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  backgroundImage?: string;
}

export default function HeroCaribbean({
  headline = "Regenerative Medicine in Paradise",
  subheadline = "World-class stem cell therapy in Punta Cana. Fresh cells, expert physicians, and a luxury healing experience designed around you.",
  ctaText = "Talk to Ariana",
  backgroundImage = "/images/beach-paradise.webp",
}: HeroCaribbeanProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const words = headline.split(" ");

  // Parallax: image drifts up as you scroll down (disabled when reduced motion).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgY = prefersReduced ? "0%" : rawY;
  const imgScale = prefersReduced ? 1 : rawScale;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ocean-deepest"
    >
      {/* Curtain overlays — same intro pattern as previous hero */}
      <div
        className="absolute inset-0 z-30 origin-left bg-ocean-deepest pointer-events-none"
        style={{ animation: "curtain-left 1.2s cubic-bezier(0.77, 0, 0.175, 1) 0.2s forwards" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-30 origin-right bg-ocean-deepest pointer-events-none"
        style={{ animation: "curtain-right 1.2s cubic-bezier(0.77, 0, 0.175, 1) 0.4s forwards" }}
        aria-hidden="true"
      />

      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={backgroundImage}
          alt=""
          style={{ y: imgY, scale: imgScale }}
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        {/* Caribbean gradient: ocean depth -> coral warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-deepest/85 via-ocean-deepest/55 to-coral/25" />
      </div>

      {/* Slow-rotating coral/teal radial overlay for subtle motion */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(255,127,107,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(94,200,189,0.12) 0%, transparent 60%)",
          }}
        />
      )}

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--cream) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 text-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          variants={staggerContainer}
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
        >
          {/* Word-by-word headline */}
          <motion.h1
            variants={wordReveal}
            className="font-display text-cream font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "var(--text-display)" }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordRevealChild}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-cream-muted max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {subheadline}
          </motion.p>

          {/* Single primary CTA — opens Ariana widget */}
          <motion.div variants={fadeInUp} className="mt-12 flex justify-center">
            <Button
              variant="cta"
              size="lg"
              onClick={() => openAriana("menu")}
              className="gap-3"
            >
              <MessageCircle className="h-5 w-5" />
              {ctaText}
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-5 text-cream/60 text-sm"
          >
            Chat, talk live, or request a callback — same expert team.
          </motion.p>
        </motion.div>
      </div>

      {/* SVG wave divider at section bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-20"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-cream/30" />
      </motion.div>
    </section>
  );
}
