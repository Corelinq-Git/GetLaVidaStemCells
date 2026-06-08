"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { fadeInUp, staggerContainer, customEase } from "@/lib/animations";
import { openAriana } from "@/lib/ariana";

interface ConditionCategory {
  title: string;
  description: string;
  details: string[];
}

const conditions: ConditionCategory[] = [
  {
    title: "Joint & Orthopedic Pain",
    description:
      "Regenerative treatments for arthritis, joint degeneration, cartilage damage, and chronic orthopedic conditions.",
    details: [
      "Knee osteoarthritis & cartilage repair",
      "Rotator cuff & shoulder injuries",
      "Lower back & disc degeneration",
      "Hip joint deterioration",
    ],
  },
  {
    title: "Neurological Conditions",
    description:
      "Innovative stem cell protocols for neurodegenerative disorders, neuropathy, and nervous system recovery.",
    details: [
      "Parkinson's disease & movement disorders",
      "Dementia & cognitive decline",
      "Multiple sclerosis (MS)",
      "Peripheral neuropathy",
    ],
  },
  {
    title: "Autoimmune Disorders",
    description:
      "Immune system modulation through mesenchymal stem cells to address autoimmune inflammation and tissue damage.",
    details: [
      "Lupus & systemic inflammation",
      "Crohn's disease & inflammatory bowel",
      "Rheumatoid arthritis",
      "Psoriasis & autoimmune skin conditions",
    ],
  },
  {
    title: "Sports Injuries",
    description:
      "Accelerated healing for ligament tears, tendon injuries, and muscle damage using fresh stem cell therapy.",
    details: [
      "ACL & ligament tears",
      "Tendinitis & tendon damage",
      "Muscle strains & tears",
      "Post-surgical recovery support",
    ],
  },
  {
    title: "Chronic Pain",
    description:
      "Address the root cause of chronic pain through cellular regeneration rather than symptom management.",
    details: [
      "Fibromyalgia",
      "Chronic back & neck pain",
      "Sciatica & nerve compression",
      "Complex regional pain syndrome",
    ],
  },
  {
    title: "Anti-Aging & Wellness",
    description:
      "Whole-body rejuvenation protocols designed to restore vitality, energy, and overall cellular health.",
    details: [
      "Total body rejuvenation IV therapy",
      "Facial & neck rejuvenation",
      "Hair restoration therapy",
      "NAD+ drips & wellness protocols",
    ],
  },
];

function ConditionRow({
  condition,
  index,
  isOpen,
  onToggle,
}: {
  condition: ConditionCategory;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={fadeInUp} className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="group w-full flex items-center gap-6 md:gap-10 py-5 md:py-6 px-2 md:px-4 -mx-2 md:-mx-4 transition-colors hover:bg-gray-50 text-left cursor-pointer"
      >
        {/* Number */}
        <span className="font-display text-3xl md:text-4xl text-coral/40 leading-none shrink-0 w-12 md:w-16 transition-colors group-hover:text-coral/60">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <h3 className="flex-1 font-heading text-lg md:text-xl text-ocean-deepest leading-tight">
          {condition.title}
        </h3>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: customEase }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors group-hover:border-coral/40 shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: customEase }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[4.5rem] md:pl-[6.5rem] pr-4">
              <p className="text-gray-500 leading-relaxed mb-4">
                {condition.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                {condition.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral/60 shrink-0" />
                    <span className="text-sm text-gray-500">{detail}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  openAriana("menu", `Tell me about ${condition.title}`)
                }
                className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-dark cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                Ask Ariana about this
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ConditionsOverview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <h2
              className="font-heading font-bold text-ocean-deepest leading-[1.1] tracking-tight"
              style={{ fontSize: "var(--text-heading-1)" }}
            >
              Conditions We Address
            </h2>
            <p
              className="mt-3 text-gray-600 max-w-2xl"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              Tap any condition to learn more — or ask Ariana directly.
            </p>
          </motion.div>

          <div className="border-t border-gray-200">
            {conditions.map((condition, index) => (
              <ConditionRow
                key={condition.title}
                condition={condition}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
