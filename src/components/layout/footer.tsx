"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/orthopedic", label: "Orthopedic" },
  { href: "/neurological", label: "Neurological" },
] as const;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const brandScale = useTransform(scrollYProgress, [0, 0.6], [2, 1]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.6], [0.08, 0.25]);

  return (
    <footer ref={footerRef} className="relative bg-ocean-deepest text-cream overflow-hidden">
      {/* Brand reveal zone */}
      <div className="relative h-[25vh] flex items-center justify-center overflow-hidden">
        <motion.span
          style={{ scale: brandScale, opacity: brandOpacity }}
          className="font-display text-[14vw] md:text-[10vw] font-bold text-cream whitespace-nowrap select-none pointer-events-none"
        >
          La Vida
        </motion.span>
      </div>

      {/* Footer content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight">
              La Vida{" "}
              <span className="text-coral">Regenerative Medicine</span>
            </span>

            <ul className="mt-4 space-y-3 text-sm text-cream-muted">
              <li>
                <a
                  href="tel:+17405470921"
                  className="inline-flex items-center gap-2 transition-all hover:text-coral hover:translate-x-1"
                >
                  <Phone className="h-4 w-4 text-coral" />
                  (740) 547-0921
                </a>
              </li>
              <li>
                <a
                  href="mailto:leads@lavidastemcells.com"
                  className="inline-flex items-center gap-2 transition-all hover:text-coral hover:translate-x-1"
                >
                  <Mail className="h-4 w-4 text-coral" />
                  leads@lavidastemcells.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-coral" />
                Punta Cana, Dominican Republic
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/40">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-muted transition-all hover:text-coral hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/40">
              Follow Us
            </h3>
            <div className="mt-4">
              <a
                href="https://instagram.com/La_Vida.dr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cream-muted transition-all hover:text-coral hover:translate-x-1"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-cream-muted/50">
            La Vida Regenerative Medicine provides stem cell therapies in the
            Dominican Republic. These treatments are not FDA-approved and are not
            intended to diagnose, treat, cure, or prevent any disease. Results
            may vary. Consult your physician before pursuing any treatment.
          </p>
        </div>

        {/* Legal */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-cream-muted/50">
            <li>
              <Link href="/privacy-policy" className="transition-colors hover:text-coral">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/notice-of-privacy-practices" className="transition-colors hover:text-coral">
                Notice of Privacy Practices
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-cream-muted/30">
            &copy; {new Date().getFullYear()} La Vida Regenerative Medicine. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
