import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  fullName: z.string().optional(),
  email: z.email().optional().or(z.literal("")),
  phone: z.string().min(7),
  condition: z.string().optional(),
  painLevel: z.string().optional(),
  timeline: z.string().optional(),
  contactPreference: z.enum(["zoom", "phone"]).optional(),
  pageSource: z.string().optional(),
  timezone: z.string().optional(),
  referralSource: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

/**
 * Split "Jane Doe" into { first_name: "Jane", last_name: "Doe" }.
 * Single-word names go entirely into first_name.
 */
function splitName(fullName?: string): { first_name?: string; last_name?: string } {
  if (!fullName || !fullName.trim()) return {};
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0] };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    const orgId = process.env.LEAD_CAPTURE_ORG_ID;

    if (webhookUrl) {
      // CoreLinq's /api/public/leads/capture requires org_id. If a target
      // webhook is configured but org_id isn't, fall back to forwarding
      // the raw payload so we don't silently drop the lead.
      const isCoreLinq = webhookUrl.includes("/api/public/leads/capture");

      const payload = isCoreLinq && orgId
        ? {
            ...splitName(data.fullName),
            email: data.email,
            phone: data.phone,
            source: "lavida-landing-page",
            org_id: orgId,
            metadata: {
              condition: data.condition,
              pain_level: data.painLevel,
              timeline: data.timeline,
              contact_preference: data.contactPreference,
              page_source: data.pageSource,
              timezone: data.timezone,
              referral_source: data.referralSource,
              utm_source: data.utm_source,
              utm_medium: data.utm_medium,
              utm_campaign: data.utm_campaign,
              utm_term: data.utm_term,
              utm_content: data.utm_content,
              submitted_at: new Date().toISOString(),
            },
          }
        : {
            ...data,
            source: "lavida-landing-page",
            timestamp: new Date().toISOString(),
          };

      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        console.error(
          "Webhook failed:",
          webhookResponse.status,
          await webhookResponse.text()
        );
        return NextResponse.json(
          { error: "We couldn't process your request. Please try again or call us at (740) 547-0921." },
          { status: 502 }
        );
      }
    } else {
      console.log("Lead received (no webhook configured):", {
        condition: data.condition,
        referralSource: data.referralSource,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
