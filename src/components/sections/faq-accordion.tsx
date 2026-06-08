"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer, customEase } from "@/lib/animations";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  variant?: "light" | "dark";
}

function FaqAccordion({ faqs, variant = "light" }: FaqAccordionProps) {
  const isDark = variant === "dark";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`mx-auto max-w-3xl divide-y ${isDark ? "divide-white/10" : "divide-ocean-deepest/10"}`}
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div key={faq.question} variants={fadeInUp}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer transition-colors ${
                isDark ? "text-cream hover:text-coral" : "text-ocean-deepest hover:text-coral"
              }`}
            >
              <span className="text-lg font-medium">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: customEase }}
              >
                <ChevronDown className="h-5 w-5 shrink-0 text-coral" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: customEase }}
                  className="overflow-hidden"
                >
                  <p className={`pb-5 leading-relaxed ${isDark ? "text-cream-muted" : "text-gray-600"}`}>
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default FaqAccordion;
