declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackMetaLead() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
}

export function trackMetaPageView() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
}

export function trackGoogleConversion() {
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (typeof window !== "undefined" && window.gtag && conversionId) {
    window.gtag("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
    });
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  const utms: Record<string, string> = {};
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) utms[key] = value;
  }
  return utms;
}
