"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { openAriana } from "@/lib/ariana";
import MobileNav from "@/components/layout/mobile-nav";

const navLinks = [
  { href: "#conditions", label: "Conditions" },
  { href: "#experience", label: "Experience" },
  { href: "#treatments", label: "Treatments" },
  { href: "#faq", label: "FAQs" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0,
      );
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.33, 0, 0.11, 1] }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm"
            : "bg-transparent",
        )}
      >
        {/* Scroll progress bar */}
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-coral transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                "font-display text-xl font-bold tracking-tight sm:text-2xl transition-colors",
                isScrolled ? "text-ocean-deepest" : "text-cream",
              )}
            >
              La Vida{" "}
              <span className="text-coral">Regenerative Medicine</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-gray-600 hover:text-coral"
                    : "text-cream/70 hover:text-coral",
                )}
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => openAriana("menu")}
              className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-dark cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to Ariana
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2 transition-colors hover:text-coral md:hidden",
              isScrolled ? "text-ocean-deepest" : "text-cream",
            )}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
