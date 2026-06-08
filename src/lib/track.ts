/**
 * Event tracking helper for La Vida landing pages.
 *
 * Dual-pipe:
 *  1. Vercel Web Analytics (`@vercel/analytics` → in-dashboard funnel for
 *     Britt/Perry — kept unchanged).
 *  2. CoreLinq CRM via `window.CLQ.conversion()`, exposed by the embed
 *     script that's loaded in `src/app/layout.tsx`. The script auto-tracks
 *     page views, sessions, form submits, and UTM/referrer attribution.
 *     This helper is for explicitly-named CTA events (phone clicks, voice
 *     widget opens, etc.) which the script wouldn't catch on its own
 *     because `tracking_configs.track_clicks` doesn't do blind capture.
 *
 * If `window.CLQ` isn't loaded yet (e.g. event fires before script
 * hydrates) the call is silently dropped — fire-and-forget, never throws.
 *
 * NOTE: structured Contact creation still flows through the server-side
 * proxy at `src/app/api/lead/route.ts` → CoreLinq `/api/public/leads/capture`.
 * `CLQ.identify()` is invoked automatically by the embed script's form
 * listener for any form that has an `email` or `phone` input.
 */

import { track as vercelTrack } from "@vercel/analytics";

export type EventName =
  | "lead_submitted"
  | "cta_click"
  | "phone_click"
  | "chat_opened"
  | "talk_now_started"
  | "callback_requested";

export type PageSource = "squeeze" | "qualify" | "consultation";

export type EventProperties = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    CLQ?: {
      conversion: (
        type: string,
        data: { conversionName?: string; metadata?: Record<string, unknown> },
      ) => void;
      identify: (data: { email?: string; phone?: string }) => void;
    };
  }
}

export function track(
  event: EventName,
  properties: EventProperties = {},
): void {
  if (typeof window === "undefined") return;

  // 1) Vercel Web Analytics
  try {
    vercelTrack(event, properties);
  } catch {
    // never throw from tracking
  }

  // 2) CoreLinq CRM — fire conversion event with full metadata
  try {
    window.CLQ?.conversion(event, {
      conversionName: event,
      metadata: properties,
    });
  } catch {
    // swallow
  }
}
