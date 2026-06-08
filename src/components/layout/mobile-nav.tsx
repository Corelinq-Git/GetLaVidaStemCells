"use client";

import { useEffect, useRef, useCallback } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { openAriana } from "@/lib/ariana";

const navLinks = [
  { href: "#conditions", label: "Conditions" },
  { href: "#experience", label: "Experience" },
  { href: "#treatments", label: "Treatments" },
  { href: "#faq", label: "FAQs" },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-ocean-deepest"
          >
            {/* Close Button */}
            <div className="flex items-center justify-end px-4 py-4">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-cream transition-colors hover:text-coral"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-2xl font-semibold text-cream transition-colors hover:text-coral"
                >
                  {link.label}
                </a>
              ))}

              {/* Ariana CTA */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAriana("menu");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-coral-dark cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                Talk to Ariana
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
