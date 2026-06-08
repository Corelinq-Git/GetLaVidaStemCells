"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Free Consultation",
    description:
      "Connect with our team to discuss your condition and treatment goals",
  },
  {
    title: "Medical Review",
    description:
      "Our physicians review your medical history and create a personalized protocol",
  },
  {
    title: "Travel to Paradise",
    description:
      "We arrange your travel, accommodations, and airport pickup in Punta Cana",
  },
  {
    title: "Treatment",
    description:
      "Receive your personalized stem cell therapy in our state-of-the-art facility",
  },
  {
    title: "Recovery & Follow-Up",
    description:
      "Recover in luxury while our team monitors your progress with ongoing support",
  },
];

function JourneyTimeline() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative mx-auto max-w-3xl"
    >
      {/* Curved SVG path (desktop) */}
      <svg
        className="absolute left-1/2 top-0 bottom-0 hidden lg:block -translate-x-1/2 h-full"
        width="4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="2" y1="0" x2="2" y2="100%" stroke="var(--coral)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 4" />
      </svg>

      {/* Mobile vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-coral/30 md:left-8 lg:hidden" />

      {/* Small dot decorations along the path (desktop) */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none" aria-hidden="true">
        {[15, 35, 55, 75, 95].map((pct) => (
          <div
            key={pct}
            className="absolute w-2 h-2 rounded-full bg-coral/20 -translate-x-1/2"
            style={{ top: `${pct}%`, left: "50%" }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-10 lg:gap-16">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              className={cn(
                "relative flex items-start gap-5 md:gap-6",
                "lg:items-center",
                isEven ? "lg:flex-row" : "lg:flex-row-reverse",
              )}
            >
              {/* Numbered circle */}
              <div
                className={cn(
                  "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                  "bg-coral text-white font-bold text-lg shadow-md",
                  "md:h-16 md:w-16 md:text-xl",
                  "lg:absolute lg:left-1/2 lg:-translate-x-1/2"
                )}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "pt-1 md:pt-3 lg:pt-0",
                  "lg:w-[calc(50%-3rem)]",
                  isEven ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8",
                  isEven ? "lg:ml-0" : "lg:ml-auto"
                )}
              >
                <h3 className="text-lg font-semibold text-ocean-deepest md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default JourneyTimeline;
