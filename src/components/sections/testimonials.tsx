"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

interface Testimonial {
  quote: string;
  name: string;
  condition: string;
  stars: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "The improvement was remarkable. My pain and inflammation decreased quickly after the rotator cuff treatment. Dr. Pichardo and the team were exceptional.",
    name: "R.M.",
    condition: "Rotator Cuff Repair",
    stars: 5,
  },
  {
    quote:
      "I've experienced at least an 85% improvement with my quality of life after stem cell treatments for multiple neurological conditions. La Vida changed everything.",
    name: "S.K.",
    condition: "Neurological",
    stars: 5,
  },
  {
    quote:
      "From the airport pickup to the treatment itself, the white-glove concierge service made everything stress-free. I felt like a VIP the entire time.",
    name: "J.T.",
    condition: "Joint Pain",
    stars: 5,
  },
  {
    quote:
      "I traveled from the US expecting good care, but what I received was world-class. The fresh cells made a noticeable difference — my mobility improved within weeks.",
    name: "M.L.",
    condition: "Sports Injury",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-coral text-coral" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="shrink-0 w-[85vw] md:w-[45vw] lg:w-[400px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 md:p-10">
      <span
        className="block font-display text-7xl md:text-8xl text-coral/15 leading-none select-none -mt-4 -mb-6"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="font-display italic text-lg md:text-xl text-cream leading-relaxed">
        {t.quote}
      </blockquote>

      <div className="mt-8">
        <StarRating count={t.stars} />
        <p className="mt-3 font-semibold text-cream">{t.name}</p>
        <p className="text-sm text-warm-gold">{t.condition}</p>
        <p className="mt-3 text-xs text-cream-muted/40">
          Individual experience. Results may vary.
        </p>
      </div>
    </div>
  );
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  return (
    <section className="relative bg-ocean-deepest overflow-hidden py-20 md:py-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            className="font-heading font-bold text-cream leading-[1.1] tracking-tight"
            style={{ fontSize: "var(--text-heading-1)" }}
          >
            Patient Stories
          </h2>
          <p className="mt-4 text-cream-muted" style={{ fontSize: "var(--text-body-lg)" }}>
            Hear from patients who have experienced La Vida&apos;s regenerative treatments.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll for all viewports */}
      <div className="overflow-x-auto snap-x snap-mandatory scrollbar-none">
        <div className="flex gap-6 px-[max(1.5rem,calc((100vw-72rem)/2))]">
          {testimonials.map((t) => (
            <div key={t.name} className="snap-start">
              <TestimonialCard t={t} />
            </div>
          ))}
          {/* Spacer for last card */}
          <div className="shrink-0 w-6" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
