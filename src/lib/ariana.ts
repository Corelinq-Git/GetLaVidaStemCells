// Helper for opening the Ariana voice/chat widget from anywhere on the page.
// The <VoiceAgentWidget /> in layout.tsx listens for the "ariana:open" event
// and switches to the requested view.

export type ArianaMode = "menu" | "chat" | "calling" | "callback";

export interface ArianaOpenDetail {
  mode: ArianaMode;
  // Optional human-readable context shown to the agent (not yet wired to Retell,
  // but exposed for future use by callers that want to prefill a topic).
  context?: string;
}

export const ARIANA_OPEN_EVENT = "ariana:open";

export function openAriana(
  mode: ArianaMode = "menu",
  context?: string,
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ArianaOpenDetail>(ARIANA_OPEN_EVENT, {
      detail: { mode, context },
    }),
  );
}
