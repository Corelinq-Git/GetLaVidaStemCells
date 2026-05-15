import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  phone: z.string().min(7),
  condition: z.string().min(1),
  referralSource: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "lavida-landing-page",
          timestamp: new Date().toISOString(),
        }),
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
