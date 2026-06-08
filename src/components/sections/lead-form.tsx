"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackMetaLead, trackGoogleConversion, getUtmParams } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  condition: z.string().min(1, "Please describe your condition or interest"),
  referralSource: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const referralOptions = [
  { value: "", label: "Select an option" },
  { value: "facebook_ad", label: "Facebook Ad" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    setUtmParams(getUtmParams());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setServerError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...utmParams,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? "Something went wrong. Please try again.");
      }

      trackMetaLead();
      trackGoogleConversion();
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id="lead-form" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center mb-10">
          <h2
            className="font-bold text-ocean-deepest"
            style={{ fontSize: "var(--text-heading-1)" }}
          >
            Start Your Healing Journey
          </h2>
          <p className="mt-3 text-gray-600" style={{ fontSize: "var(--text-body-lg)" }}>
            Schedule your free consultation today
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-10">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-seafoam/20">
                <svg
                  className="h-8 w-8 text-seafoam-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ocean-deepest">Thank you!</h3>
              <p className="mt-2 text-gray-600">
                Our team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <Input
                id="fullName"
                label="Full Name"
                placeholder="John Doe"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                id="phone"
                label="Phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                error={errors.phone?.message}
                {...register("phone")}
              />

              <div className="w-full">
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Condition / Interest
                </label>
                <textarea
                  id="condition"
                  rows={3}
                  placeholder="Describe your condition or what you'd like to learn about..."
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent",
                    "transition-all duration-200 resize-none",
                    errors.condition && "border-red-500 focus:ring-red-500"
                  )}
                  {...register("condition")}
                />
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="referralSource"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  How did you hear about us?
                </label>
                <select
                  id="referralSource"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800",
                    "focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent",
                    "transition-all duration-200 bg-white"
                  )}
                  {...register("referralSource")}
                >
                  {referralOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {serverError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={isSubmitting}
                className="mt-2 w-full"
              >
                {isSubmitting ? "Submitting..." : "Request Free Consultation"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeadForm;
