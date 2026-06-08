"use client";

import { motion } from "framer-motion";
import {
  Syringe,
  Brain,
  Heart,
  Activity,
  Shield,
  Zap,
  Leaf,
  Eye,
  Bone,
  Dna,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";


const iconMap: Record<string, LucideIcon> = {
  syringe: Syringe,
  brain: Brain,
  heart: Heart,
  activity: Activity,
  shield: Shield,
  zap: Zap,
  leaf: Leaf,
  eye: Eye,
  bone: Bone,
  dna: Dna,
};

interface Treatment {
  title: string;
  description: string;
  icon: string;
}

interface TreatmentsGridProps {
  treatments: Treatment[];
  variant?: "light" | "dark";
}

function TreatmentsGrid({ treatments, variant = "dark" }: TreatmentsGridProps) {
  const lgCols = treatments.length <= 4 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  const isLight = variant === "light";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-6`}
    >
      {treatments.map((treatment, index) => {
        const IconComponent = iconMap[treatment.icon.toLowerCase()] ?? Activity;

        return (
          <motion.div key={treatment.title} variants={fadeInUp}>
            <div className={`h-full text-center relative overflow-hidden rounded-2xl p-8 transition-colors ${
              isLight
                ? "bg-white border border-gray-200 shadow-sm hover:shadow-md"
                : "bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08]"
            }`}>
              {/* Large number overlay */}
              <span
                className={`absolute top-2 right-4 text-7xl font-bold leading-none select-none pointer-events-none ${
                  isLight ? "text-ocean-deepest/[0.04]" : "text-cream/[0.04]"
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-coral/15">
                <IconComponent className="h-7 w-7 text-coral" />
              </div>
              <h3 className={`text-lg font-semibold ${isLight ? "text-ocean-deepest" : "text-cream"}`}>{treatment.title}</h3>
              <p className={`mt-3 leading-relaxed text-sm ${isLight ? "text-gray-600" : "text-cream-muted"}`}>
                {treatment.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default TreatmentsGrid;
