"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Clock,
  Stethoscope,
  Mail,
  CheckCircle2,
  Sparkles,
  Lightbulb,
} from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { openAriana } from "@/lib/ariana";

export default function SqueezePage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!phone) return;
    setStatus("loading");
    setError(null);

    // Fire-and-forget lead capture to CoreLinq. Best-effort — failure here must
    // not block the user from getting their Ariana callback.
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        ...(name.trim() ? { fullName: name.trim() } : {}),
        ...(email.trim() ? { email: email.trim() } : {}),
        pageSource: "squeeze-home",
      }),
    }).catch((err) => {
      console.error("Lead capture failed (non-blocking):", err);
    });

    try {
      const res = await fetch("/api/retell/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to request callback");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="relative h-svh w-full overflow-hidden bg-ocean-deepest text-cream flex flex-col">
      {/* Layered blue base — deepest navy → ocean → ocean-light wash */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #052838 0%, #062F3F 35%, #0A4A63 70%, #0F5F7F 100%)",
        }}
      />

      {/* Right-side portrait — full-bleed on right, fades into dark on left */}
      <div className="absolute inset-0 z-0">
        {/* Cool ambient color wash — ocean + seafoam (was coral) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 50%, rgba(125,211,192,0.16) 0%, transparent 55%), radial-gradient(ellipse at 25% 75%, rgba(15,95,127,0.55) 0%, transparent 60%), radial-gradient(ellipse at 80% 0%, rgba(26,122,158,0.30) 0%, transparent 50%)",
          }}
        />

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[58%]"
        >
          <img
            src="/images/ariana.webp"
            alt="Ariana, La Vida's AI concierge"
            className="w-full h-full object-cover object-[60%_center] md:object-[center_15%]"
          />
          {/* Left-edge gradient mask so portrait melts into dark bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,47,63,0.92) 0%, rgba(6,47,63,0.65) 20%, rgba(6,47,63,0.20) 45%, transparent 70%)",
            }}
          />
          {/* Subtle vignette + bottom fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(6,47,63,0.55) 100%)",
            }}
          />
        </motion.div>

        {/* Soft grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--cream) 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Top bar */}
      <div className="relative z-20 px-5 md:px-10 py-4 flex items-center justify-between flex-shrink-0">
        <motion.a
          href="https://www.lavidastemcells.com/"
          aria-label="La Vida Regenerative Medicine — Home"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-90"
        >
          <img
            src="/images/lavida-logo.png"
            alt="La Vida — Live Your Best Life"
            className="h-12 md:h-14 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          />
          <span className="hidden md:inline text-xs text-seafoam tracking-[0.22em] uppercase font-medium border-l border-seafoam/40 pl-3">
            Regenerative<br />Medicine
          </span>
        </motion.a>

        {/* Trust badge + phone — top-right cluster */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <a
            href="tel:+17405470921"
            className="hidden md:flex flex-col items-end leading-tight text-cream hover:text-seafoam transition-colors"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]">
              <PhoneCall className="h-4 w-4 text-seafoam" />
              (740) 547-0921
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-cream font-semibold [text-shadow:_0_1px_3px_rgba(0,0,0,0.85)] mt-0.5">
              Call 24/7
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-cream/10 backdrop-blur-md border border-cream/15 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-seafoam" />
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.18em] text-cream/55">
                AI Concierge
              </div>
              <div className="text-xs font-semibold text-cream">
                Backed by physicians
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex-1 min-h-0 flex items-start pt-2 md:pt-4 px-5 md:px-10 lg:px-16 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left column — the squeeze card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-6 lg:col-span-5 flex flex-col gap-5"
          >
            {status === "sent" ? <ConfirmationCard phone={phone} /> : (
              <SqueezeCard
                phone={phone}
                setPhone={setPhone}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                status={status}
                error={error}
                onSubmit={submit}
              />
            )}

            {/* Social proof rail — SeedProd "Recent Episodes" pattern */}
</motion.div>

          {/* Right column — intentional empty space; portrait lives in bg */}
          <div className="hidden md:block md:col-span-6 lg:col-span-7" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          >
            <ProofRow
              icon={<Clock className="h-4 w-4" />}
              title="Average call: 5 minutes"
              meta="Qualification + booking"
            />
            <ProofRow
              icon={<ShieldCheck className="h-4 w-4" />}
              title="92–95% cell viability"
              meta="Fresh UC-MSC, never frozen"
            />
            <ProofRow
              icon={<Stethoscope className="h-4 w-4" />}
              title="350M–700M High-Dose MSC Therapy"
              meta="Per Dose"
            />
            <ProofRow
              icon={<Lightbulb className="h-4 w-4" />}
              title="We Treat Most Conditions"
              meta="Recovery from Pain is Possible!"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom utility bar — compliance + minimal socials. Phone moved to top header to keep it clear of the chat widget. */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 md:px-10 py-4 flex items-center justify-between gap-4 pr-24 md:pr-28">
        <p className="text-[10px] md:text-[11px] text-cream/40 max-w-2xl leading-tight tracking-wide" aria-hidden="true">&nbsp;</p>
        <div className="flex items-center gap-4 text-cream/55">
          <a
            href="https://instagram.com/La_Vida.dr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-seafoam transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:care@lavidastemcells.com"
            aria-label="Email"
            className="hover:text-seafoam transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// — Card components —

interface SqueezeCardProps {
  phone: string;
  setPhone: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  status: "idle" | "loading" | "sent" | "error";
  error: string | null;
  onSubmit: (e: FormEvent) => void;
}

function SqueezeCard({ phone, setPhone, name, setName, email, setEmail, status, error, onSubmit }: SqueezeCardProps) {
  const [consented, setConsented] = useState(false);
  return (
    <div className="rounded-2xl bg-white text-ocean-deepest p-6 md:p-7 shadow-2xl shadow-black/30 border border-white/40">
      {/* Eyebrow */}
      <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ocean">
        <span className="w-1.5 h-1.5 rounded-full bg-ocean animate-pulse" />
        Free 5-min qualification
      </p>

      {/* Headline — concrete, outcome-stated */}
      <h1 className="mt-3 font-display font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(1.85rem,3.2vw,2.6rem)]">
        Stop guessing.{" "}
        <span className="text-ocean">Get a real plan</span> in 5 minutes.
      </h1>

      {/* Sub — explicit objective */}
      <p className="mt-3 text-gray-600 leading-relaxed text-sm md:text-base">
        Drop your number. Ariana - our AI concierge - will call you in under
        60 seconds, qualify your case, and book a private consult.
      </p>

      {/* Form */}
      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <div>
          <label htmlFor="sq-name" className="sr-only">Your name</label>
          <input
            id="sq-name"
            type="text"
            autoComplete="given-name"
            placeholder="Your first name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean transition-colors"
          />
        </div>
        <div>
          <label htmlFor="sq-phone" className="sr-only">Phone number</label>
          <input
            id="sq-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-base font-medium text-ocean-deepest placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean transition-colors"
          />
        </div>
        <div>
          <label htmlFor="sq-email" className="sr-only">Email</label>
          <input
            id="sq-email"
            type="email"
            autoComplete="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean transition-colors"
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
        <label className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            required
            className="mt-1 w-4 h-4 rounded border-gray-300 text-ocean focus:ring-ocean cursor-pointer"
          />
          <span className="text-xs text-gray-600 leading-relaxed">
            I consent to La Vida Stem Cells contacting me by phone, text message, and email regarding my inquiry, appointment scheduling, and educational information. I understand that submitting this form does not establish a physician-patient relationship and is not a substitute for medical advice.
          </span>
        </label>

        <motion.button
          type="submit"
          disabled={!phone || !consented || status === "loading"}
          whileHover={status !== "loading" ? { scale: 1.01, y: -1 } : undefined}
          whileTap={status !== "loading" ? { scale: 0.99 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-full py-4 rounded-xl bg-ocean text-white font-bold text-base shadow-lg shadow-ocean/40 hover:bg-ocean-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer overflow-hidden group"
        >
          <span className="absolute -inset-1 rounded-xl bg-ocean-light/60 blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10" aria-hidden="true" />
          <span className="inline-flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            {status === "loading" ? "Calling you…" : "Call me now — free"}
          </span>
        </motion.button>

        {/* Risk reversal */}
        <p className="text-[11px] text-gray-500 text-center leading-relaxed">
          We dial within 60 seconds. No spam. No obligation. Cancel anytime.
        </p>

        {/* Secondary action — chat as alternative */}
        <button
          type="button"
          onClick={() => openAriana("chat")}
          className="w-full inline-flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-ocean transition-colors cursor-pointer pt-1"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Or chat with Ariana instead
        </button>
      </form>
    </div>
  );
}

function ConfirmationCard({ phone }: { phone: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="rounded-2xl bg-white text-ocean-deepest p-6 md:p-8 shadow-2xl shadow-black/30 border border-white/40"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-seafoam/20 mx-auto">
        <CheckCircle2 className="h-7 w-7 text-seafoam-dark" />
      </div>
      <h2 className="mt-4 text-center font-display font-medium text-2xl md:text-3xl tracking-tight">
        Ariana is calling you now.
      </h2>
      <p className="mt-3 text-center text-gray-600 text-sm leading-relaxed">
        Watch your phone — we&apos;re dialing{" "}
        <span className="font-semibold text-ocean-deepest">{phone}</span>{" "}
        within 60 seconds.
      </p>
      <p className="mt-4 text-center text-xs text-gray-400">
        Didn&apos;t get the call?{" "}
        <a href="tel:+17405470921" className="text-ocean font-medium hover:underline">
          Call us at (740) 547-0921
        </a>
      </p>
    </motion.div>
  );
}

interface ProofRowProps {
  icon: React.ReactNode;
  title: string;
  meta: string;
}

function ProofRow({ icon, title, meta }: ProofRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-cream/8 backdrop-blur-md border border-cream/15 px-4 py-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-seafoam/15 text-seafoam shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-cream leading-tight truncate">
          {title}
        </p>
        <p className="text-xs text-cream/55 leading-tight truncate tracking-wide">
          {meta}
        </p>
      </div>
    </div>
  );
}
