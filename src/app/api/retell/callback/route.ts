import { NextResponse } from "next/server";
import { z } from "zod";
import Retell from "retell-sdk";
import { normalizePhone } from "@/lib/phone";

const retell = new Retell({ apiKey: process.env.RETELL_API_KEY! });

// Defense-in-depth: client validates first, but trust nothing — re-validate
// the same way on the server so a tampered/buggy client can't push garbage
// into Retell. Shape check via zod; structural phone check via shared util.
const callbackSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = callbackSchema.parse(body);

    // Structural phone validation — uses the same util the client runs, so
    // client + server behavior can never drift.
    const phoneCheck = normalizePhone(data.phone);
    if (!phoneCheck.valid) {
      return NextResponse.json(
        { error: phoneCheck.error || "Invalid phone number" },
        { status: 400 }
      );
    }
    const phone = phoneCheck.e164!;

    const agentId = process.env.NEXT_PUBLIC_RETELL_OUTBOUND_AGENT_ID;
    const fromNumber = process.env.RETELL_FROM_NUMBER;

    if (!agentId || !fromNumber) {
      return NextResponse.json(
        { error: "Outbound calling not configured" },
        { status: 500 }
      );
    }

    await retell.call.createPhoneCall({
      from_number: fromNumber,
      to_number: phone,
      override_agent_id: agentId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid phone number", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Retell callback error:", error);
    // DEBUG MODE: surface the actual error so we can diagnose. Remove the detail
    // field once Retell is fully working.
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to initiate call", detail },
      { status: 500 }
    );
  }
}
