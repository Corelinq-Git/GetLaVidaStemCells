"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full aspect-[16/10] object-cover"
      />
    </div>
  );
}

interface ExperienceSection {
  title: string;
  description: string;
  bullets: string[];
  image: string;
}

const sections: ExperienceSection[] = [
  {
    title: "Concierge Travel Experience",
    description:
      "From the moment you book, our team handles every detail so you can focus on your health.",
    bullets: [
      "Private airport pickup and transfer to your accommodations",
      "Luxury resort-style accommodations arranged on your behalf",
      "Full treatment coordination with scheduling and preparation guidance",
      "Dedicated patient concierge available throughout your stay",
    ],
    image: "/images/concierge-travel.webp",
  },
  {
    title: "Punta Cana Lifestyle",
    description:
      "Recover in paradise while your body heals and regenerates in an ideal environment.",
    bullets: [
      "World-class beaches and tropical climate to support recovery",
      "Nutritional guidance with access to fresh, local cuisine",
      "Optional wellness activities: yoga, meditation, and light movement",
      "A serene environment designed to reduce stress and enhance healing",
    ],
    image: "/images/punta-cana-lifestyle.webp",
  },
];

export default function TheExperience() {
  return (
    <section className="py-32 md:py-44 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <h2
              className="font-heading font-bold text-ocean-deepest leading-[1.1] tracking-tight"
              style={{ fontSize: "var(--text-heading-1)" }}
            >
              The La Vida Experience
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl" style={{ fontSize: "var(--text-body-lg)" }}>
              Treatment and recovery in a world-class destination.
            </p>
          </motion.div>

          <div className="space-y-20">
            {sections.map((section, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={section.title}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                    isReversed && "lg:[&>*:first-child]:order-2"
                  )}
                >
                  {/* Image Placeholder */}
                  <motion.div
                    variants={isReversed ? slideInRight : slideInLeft}
                  >
                    <ParallaxImage src={section.image} alt={section.title} />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    variants={isReversed ? slideInLeft : slideInRight}
                  >
                    <h3
                      className="font-heading font-bold text-ocean-deepest mb-4"
                      style={{ fontSize: "var(--text-heading-2)" }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontSize: "var(--text-body-lg)" }}>
                      {section.description}
                    </p>
                    <ul className="space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-coral/15 flex items-center justify-center">
                            <Check className="w-3 h-3 text-coral" />
                          </span>
                          <span className="text-gray-600">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
