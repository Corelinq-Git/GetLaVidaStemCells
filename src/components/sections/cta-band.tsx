"use client";

import { motion } from "framer-motion";
import { clipReveal, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";

interface CtaBandProps {
  headline: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CtaBand({
  headline,
  subtext,
  ctaText = "Schedule Your Consultation",
  ctaHref = "#lead-form",
}: CtaBandProps) {
  return (
    <section className="bg-ocean-dark py-24 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.h2
          variants={clipReveal}
          className="font-heading font-bold text-cream leading-[1.1] tracking-tight"
          style={{ fontSize: "var(--text-heading-1)" }}
        >
          {headline}
        </motion.h2>

        {subtext && (
          <motion.p
            variants={clipReveal}
            className="mt-6 text-cream-muted max-w-2xl"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {subtext}
          </motion.p>
        )}

        <motion.div variants={clipReveal} className="mt-10">
          <a href={ctaHref}>
            <Button variant="cta" size="lg">
              {ctaText}
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
