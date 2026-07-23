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
  Award,
  Target,
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
import { track, type PageSource } from "@/lib/track";
import { normalizePhone } from "@/lib/phone";

// Shared validation — all fields are mandatory before consent + submit.
const isValidName = (v: string) => v.trim().length >= 2;
const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

interface QualificationPageProps {
  imageSrc: string;
  imageAlt: string;
  imageObjectClass?: string;
  headline: string;
  subCopy: string;
  pageSource: string;
  proofRowTitle?: string;
  tile4: {
    iconName: "award" | "target" | "lightbulb";
    title: string;
    subtitle: string;
  };
}

type ContactPreference = "zoom" | "phone";
type FormStatus = "idle" | "loading" | "sent" | "error";

export default function QualificationPage({
  imageSrc,
  imageAlt,
  imageObjectClass = "object-center",
  headline,
  subCopy,
  pageSource,
  proofRowTitle,
  tile4,
}: QualificationPageProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [condition, setCondition] = useState("");
  const [painLevel, setPainLevel] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contactPreference, setContactPreference] =
    useState<ContactPreference | "">("phone");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    // All fields are mandatory — re-validate here even though the UI gates
    // the consent checkbox + button, so a tampered client can't bypass it.
    if (
      !isValidName(name) ||
      !phone ||
      !isValidEmail(email) ||
      !condition ||
      !painLevel ||
      !timeline ||
      !contactPreference
    ) {
      setError("Please complete all fields.");
      return;
    }
    const phoneCheck = normalizePhone(phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.error || "Please enter a valid phone number");
      return;
    }
    const e164 = phoneCheck.e164!;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setStatus("loading");
    setError(null);

    track("lead_submitted", {
      page: pageSource as PageSource,
      method: "qualification_form",
      condition,
      pain_level: painLevel,
      timeline,
      contact_preference: contactPreference,
    });

    // Fire-and-forget Retell callback — triggers Ariana to call within ~60s.
    // Best-effort: failure here must not block the lead capture / confirmation.
    fetch("/api/retell/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Pass everything the form already collected so Ariana can confirm the
      // email + reference the condition/pain/timeline instead of re-asking.
      body: JSON.stringify({
        phone: e164,
        name,
        ...(email ? { email } : {}),
        ...(condition ? { condition } : {}),
        ...(painLevel ? { painLevel } : {}),
        ...(timeline ? { timeline } : {}),
        ...(timezone ? { timezone } : {}),
      }),
    }).catch((err) => {
      console.error("Retell callback failed (non-blocking):", err);
    });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          phone: e164,
          email,
          condition,
          painLevel,
          timeline,
          contactPreference,
          pageSource,
          timezone,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit request");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="relative h-svh w-full overflow-hidden bg-ocean-deepest text-cream flex flex-col">
      {/* Layered blue base */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #052838 0%, #062F3F 35%, #0A4A63 70%, #0F5F7F 100%)",
        }}
      />

      {/* Right-side portrait */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 50%, rgba(125,211,192,0.16) 0%, transparent 55%), radial-gradient(ellipse at 25% 75%, rgba(15,95,127,0.55) 0%, transparent 60%), radial-gradient(ellipse at 80% 0%, rgba(26,122,158,0.30) 0%, transparent 50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-y-0 right-0 w-full md:w-[62%] lg:w-[58%]"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full h-full object-cover ${imageObjectClass}`}
          />
          {/* Uniform dark scrim — pushes the image into the background so the form stays the focal point */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(6,47,63,0.35)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,47,63,0.92) 0%, rgba(6,47,63,0.65) 20%, rgba(6,47,63,0.20) 45%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(6,47,63,0.55) 100%)",
            }}
          />
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <a
            href="tel:+17405470921"
            onClick={() => track("phone_click", { page: pageSource as PageSource, location: "header" })}
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
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-7 lg:col-span-7 flex flex-col gap-5"
          >
            {status === "sent" ? (
              <ConfirmationCard />
            ) : (
              <QualificationCard
                headline={headline}
                subCopy={subCopy}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                condition={condition}
                setCondition={setCondition}
                painLevel={painLevel}
                setPainLevel={setPainLevel}
                timeline={timeline}
                setTimeline={setTimeline}
                contactPreference={contactPreference}
                setContactPreference={setContactPreference}
                status={status}
                error={error}
                onSubmit={submit}
              />
            )}

          </motion.div>

          <div className="hidden md:block md:col-span-5 lg:col-span-5" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2 pr-20 md:pr-24 lg:pr-28"
          >
            <ProofRow
              icon={<Clock className="h-4 w-4" />}
              title={proofRowTitle || "Pain Management Support"}
              meta="Consultations available 9am–7pm Pacific Time"
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
              icon={
                tile4.iconName === "award" ? <Award className="h-4 w-4" /> :
                tile4.iconName === "target" ? <Target className="h-4 w-4" /> :
                <Lightbulb className="h-4 w-4" />
              }
              title={tile4.title}
              meta={tile4.subtitle}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom utility bar */}
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
            href="mailto:leads@lavidastemcells.com"
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

interface QualificationCardProps {
  headline: string;
  subCopy: string;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  condition: string;
  setCondition: (v: string) => void;
  painLevel: string;
  setPainLevel: (v: string) => void;
  timeline: string;
  setTimeline: (v: string) => void;
  contactPreference: ContactPreference | "";
  setContactPreference: (v: ContactPreference) => void;
  status: FormStatus;
  error: string | null;
  onSubmit: (e: FormEvent) => void;
}

function QualificationCard({
  headline,
  subCopy,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  condition,
  setCondition,
  painLevel,
  setPainLevel,
  timeline,
  setTimeline,
  contactPreference,
  setContactPreference,
  status,
  error,
  onSubmit,
}: QualificationCardProps) {
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean transition-colors";
  const inputClassError =
    "w-full px-4 py-3 rounded-xl border border-red-400 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-500 transition-colors";

  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [consented, setConsented] = useState(false);
  const phoneCheck = normalizePhone(phone);
  const nameValid = isValidName(name);
  const emailValid = isValidEmail(email);
  const showPhoneError = phoneTouched && !phoneCheck.valid && phone.length > 0;
  const showNameError = nameTouched && !nameValid && name.length > 0;
  const showEmailError = emailTouched && !emailValid && email.length > 0;
  // Every field must be complete and valid before consent can be given.
  const fieldsComplete =
    nameValid &&
    phoneCheck.valid &&
    emailValid &&
    !!condition &&
    !!painLevel &&
    !!timeline;

  // If a field is edited back to an invalid state after consenting,
  // revoke the consent tick so it can't be submitted out of order.
  // (Render-phase state adjustment — see React docs "Adjusting state
  // when a prop changes"; avoids an extra effect pass.)
  if (!fieldsComplete && consented) {
    setConsented(false);
  }

  return (
    <div className="rounded-2xl bg-white text-ocean-deepest p-6 md:p-7 shadow-2xl shadow-black/30 border border-white/40">
      <h1 className="font-display font-bold leading-[1.1] tracking-[-0.02em] text-[clamp(1.5rem,2.8vw,2.1rem)] text-ocean">
        {headline}
      </h1>

      <p className="mt-3 text-gray-600 leading-relaxed text-sm md:text-base">
        {subCopy}
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        {/* Row 1 — Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="cn-name" className="sr-only">Your name</label>
            <input
              id="cn-name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              required
              aria-invalid={showNameError}
              aria-describedby={showNameError ? "cn-name-error" : undefined}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              className={showNameError ? inputClassError : inputClass}
            />
            {showNameError && (
              <p id="cn-name-error" className="mt-1.5 text-xs text-red-600">
                Please enter your full name
              </p>
            )}
          </div>
          <div>
            <label htmlFor="cn-phone" className="sr-only">Phone number</label>
            <input
              id="cn-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone number"
              required
              aria-invalid={showPhoneError}
              aria-describedby={showPhoneError ? "cn-phone-error" : undefined}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setPhoneTouched(true)}
              className={showPhoneError ? inputClassError : inputClass}
            />
            {showPhoneError && (
              <p id="cn-phone-error" className="mt-1.5 text-xs text-red-600">
                {phoneCheck.error}
              </p>
            )}
          </div>
        </div>

        {/* Row 2 — Email + Condition Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="cn-email" className="sr-only">Email</label>
            <input
              id="cn-email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              required
              aria-invalid={showEmailError}
              aria-describedby={showEmailError ? "cn-email-error" : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              className={showEmailError ? inputClassError : inputClass}
            />
            {showEmailError && (
              <p id="cn-email-error" className="mt-1.5 text-xs text-red-600">
                Please enter a valid email address
              </p>
            )}
          </div>
          <div>
            <label htmlFor="cn-condition" className="sr-only">Condition Category</label>
            <select
              id="cn-condition"
              required
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>Condition Category</option>
              <option value="Muscular/joint pain">Muscular/joint pain</option>
   <option value="Degenerative conditions">Degenerative conditions</option>
   <option value="Autoimmune">Autoimmune</option>
   <option value="Neurological">Neurological</option>
            </select>
          </div>
        </div>

        {/* Row 3 — Pain Level + Ideal Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="cn-pain" className="sr-only">Pain level</label>
            <select
              id="cn-pain"
              required
              value={painLevel}
              onChange={(e) => setPainLevel(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>Pain level (0 = none, 10 = severe)</option>
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={String(i)}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cn-timeline" className="sr-only">Ideal timeline For Treatment</label>
            <select
              id="cn-timeline"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>Ideal Timeline For Treatment</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="1-3 months">1–3 months</option>
              <option value="3-6 months">3–6 months</option>
              <option value="Just researching">Just researching</option>
            </select>
          </div>
        </div>

        <label
          className={`flex items-start gap-2.5 text-[11px] leading-relaxed text-gray-600 ${
            fieldsComplete ? "cursor-pointer" : "cursor-not-allowed opacity-60"
          }`}
        >
          <input
            type="checkbox"
            required
            disabled={!fieldsComplete}
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-ocean focus:ring-2 focus:ring-ocean/30 disabled:cursor-not-allowed"
          />
          <span>
            I consent to La Vida Stem Cells contacting me by phone, text message, and email regarding my inquiry, appointment scheduling, and educational information. I understand that submitting this form does not establish a physician-patient relationship and is not a substitute for medical advice.
          </span>
        </label>
        {!fieldsComplete && (
          <p className="text-[11px] text-gray-400">
            Please complete all fields above to enable consent.
          </p>
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <motion.button
          type="submit"
          disabled={status === "loading" || !fieldsComplete || !consented}
          whileHover={status !== "loading" ? { scale: 1.01, y: -1 } : undefined}
          whileTap={status !== "loading" ? { scale: 0.99 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-full py-4 rounded-xl bg-ocean text-white font-bold text-base shadow-lg shadow-ocean/40 hover:bg-ocean-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer overflow-hidden group"
        >
          <span className="absolute -inset-1 rounded-xl bg-ocean-light/60 blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10" aria-hidden="true" />
          <span className="inline-flex flex-col items-center leading-tight gap-0.5">
            <span>{status === "loading" ? "Sending…" : "Request my consultation"}</span>
            {status !== "loading" && (
              <span className="text-[11px] font-normal opacity-80">
                we&apos;ll contact you by phone
              </span>
            )}
          </span>
        </motion.button>

        {/* Note to clients — encourage speaking with Ariana first */}
        <div className="rounded-xl bg-seafoam/10 border border-seafoam/40 px-4 py-3 text-xs text-gray-600 leading-relaxed">
          <p className="font-semibold text-ocean-deepest mb-1">Dear Client,</p>
          <p>
            Ariana has been trained over hundreds of hours and has extensive
            knowledge of every treatment and procedure we offer. She can answer
            detailed questions clearly, thoroughly, and with sensitivity.
            Please take a few minutes to speak with her first, then schedule a
            consultation for pricing, eligibility, or any remaining questions.
          </p>
        </div>

        <p className="text-[11px] text-gray-500 text-center leading-relaxed">
          We dial within 60 seconds. No Spam. No Obligation. Cancel anytime.
        </p>

        <button
          type="button"
          onClick={() => {
            // Subcomponent doesn't have pageSource in scope. Vercel Analytics
            // also tracks the current URL, so the page is inferred from there.
            track("cta_click", { cta: "chat_with_ariana" });
            openAriana("chat");
          }}
          className="w-full inline-flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-ocean transition-colors cursor-pointer pt-1"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Or chat with Ariana instead
        </button>
      </form>
    </div>
  );
}

function ConfirmationCard() {
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
        Thanks — we&apos;ve got your request.
      </h2>
      <p className="mt-3 text-center text-gray-600 text-sm md:text-base leading-relaxed">
        Ariana is calling you now. Watch your phone — we&apos;re dialing within 60 seconds.
      </p>
      <p className="mt-5 text-center text-xs text-gray-400">
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
    <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-2 rounded-xl bg-cream/8 backdrop-blur-md border border-cream/15 px-4 py-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-seafoam/15 text-seafoam shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-cream leading-tight">
          {title}
        </p>
        <p className="text-xs text-cream/55 leading-tight tracking-wide">
          {meta}
        </p>
      </div>
    </div>
  );
}
