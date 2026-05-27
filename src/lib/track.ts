/**
 * Event tracking helper for La Vida landing pages.
 *
 * What it does:
 *  1. Fires the event into Vercel Web Analytics via @vercel/analytics
 *     `track()` so it shows up in the project dashboard.
 *  2. Forwards the same payload (best-effort, fire-and-forget) to the
 *     CoreLinq comm-stack event ingest endpoint at
 *     `NEXT_PUBLIC_EVENT_WEBHOOK_URL`. If the env var is unset, the
 *     forward is a no-op.
 *
 * Why both:
 *  - Vercel gives Britt/Perry a free in-dashboard funnel view.
 *  - CoreLinq receiver powers real-time UX components in the comm
 *    codebase ("Someone just booked a consult", etc.).
 *
 * Event payload contract (what CoreLinq's /api/events should accept):
 *
 *    POST {NEXT_PUBLIC_EVENT_WEBHOOK_URL}
 *    Content-Type: application/json
 *    {
 *      "event": "lead_submitted" | "cta_click" | "phone_click" |
 *               "chat_opened" | "talk_now_started" | "callback_requested",
 *      "page": "squeeze" | "qualify" | "consultation",
 *      "properties": {
 *        // event-specific fields (e.g. cta name, method)
 *        ...
 *      },
 *      "timestamp": "2026-05-27T22:00:00.000Z",
 *      "url": "https://...",        // window.location.href at fire time
 *      "referrer": "https://..."    // document.referrer
 *    }
 *
 *  Response: ignored. Errors are swallowed. This is fire-and-forget so the
 *  user's main interaction never blocks on event delivery.
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

const WEBHOOK_URL =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_EVENT_WEBHOOK_URL || ""
    : "";

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

  // 2) CoreLinq comm-stack ingest — fire-and-forget
  if (!WEBHOOK_URL) return;

  const payload = {
    event,
    page: properties.page ?? null,
    properties,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || null,
  };

  try {
    // Prefer sendBeacon so the request survives page navigation (e.g.
    // when a CTA click triggers a route change immediately after).
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon(WEBHOOK_URL, blob);
      return;
    }

    void fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // swallow
    });
  } catch {
    // swallow
  }
}
