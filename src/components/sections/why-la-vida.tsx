"use client";

import { motion } from "framer-motion";
import { FlaskConical, Microscope, UserRound } from "lucide-react";
import { viewportGate, staggerContainer } from "@/lib/animations";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FlaskConical className="w-10 h-10 text-coral" />,
    title: "Fresh Cells, Never Frozen",
    description:
      "Our UC-MSC stem cells are harvested and administered fresh, ensuring maximum viability rates of 92-95%.",
  },
  {
    icon: <Microscope className="w-10 h-10 text-coral" />,
    title: "In-House Laboratory",
    description:
      "Our state-of-the-art laboratory in Punta Cana processes all cells on-site under strict quality controls.",
  },
  {
    icon: <UserRound className="w-10 h-10 text-coral" />,
    title: "Dr. Bernardo Pichardo Caba",
    description:
      "Founder and head physician who personally oversees all procedures, with extensive experience in regenerative medicine.",
  },
];

export default function WhyLaVida() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section heading — left-aligned */}
          <motion.div variants={viewportGate} className="mb-16 max-w-xl">
            <h2
              className="font-heading font-bold text-ocean-deepest leading-[1.1] tracking-tight"
              style={{ fontSize: "var(--text-heading-1)" }}
            >
              Why La Vida Regenerative Medicine
            </h2>
            <p className="mt-4 text-gray-600" style={{ fontSize: "var(--text-body-lg)" }}>
              What sets us apart in the world of regenerative therapy.
            </p>
          </motion.div>

          {/* Bento grid — asymmetric editorial offset */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feature 1: Fresh Cells — wide, horizontal layout spanning cols 1-7 */}
            <motion.div
              variants={viewportGate}
              className="lg:col-span-7"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Image placeholder */}
                <div className="w-full sm:w-1/2 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src="/images/fresh-cells.webp"
                    alt="Fresh stem cells, never frozen, ensuring maximum viability"
                    className="w-full aspect-[4/3] object-cover img-bw-hover img-zoom-hover"
                  />
                </div>

                <div className="flex flex-col items-start">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mb-4">
                    {features[0].icon}
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold text-ocean-deepest mb-3">
                    {features[0].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[0].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Laboratory — narrow, stacked vertically spanning cols 8-12 */}
            <motion.div
              variants={viewportGate}
              className="lg:col-span-5"
            >
              <div className="flex flex-col items-start">
                {/* Image placeholder */}
                <div className="overflow-hidden rounded-xl mb-6">
                  <img
                    src="/images/laboratory.webp"
                    alt="State-of-the-art in-house laboratory in Punta Cana"
                    className="w-full aspect-[4/3] object-cover img-bw-hover img-zoom-hover"
                  />
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mb-4">
                  {features[1].icon}
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-ocean-deepest mb-3">
                  {features[1].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {features[1].description}
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Dr. Pichardo — narrow, stacked vertically spanning cols 1-5, offset below */}
            <motion.div
              variants={viewportGate}
              className="lg:col-span-5 lg:col-start-1"
            >
              <div className="flex flex-col items-start">
                {/* Image placeholder */}
                <div className="overflow-hidden rounded-xl mb-6">
                  <img
                    src="/images/dr-pichardo.webp"
                    alt="Dr. Bernardo Pichardo Caba, founder and head physician"
                    className="w-full aspect-[4/3] object-cover img-bw-hover img-zoom-hover"
                  />
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mb-4">
                  {features[2].icon}
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-ocean-deepest mb-3">
                  {features[2].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {features[2].description}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
