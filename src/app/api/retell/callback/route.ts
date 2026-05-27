import { NextResponse } from "next/server";
import { z } from "zod";
import Retell from "retell-sdk";

const retell = new Retell({ apiKey: process.env.RETELL_API_KEY! });

const callbackSchema = z.object({
  phone: z.string().min(7, "Valid phone number required"),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = callbackSchema.parse(body);

    const agentId = process.env.NEXT_PUBLIC_RETELL_OUTBOUND_AGENT_ID;
    const fromNumber = process.env.RETELL_FROM_NUMBER;

    if (!agentId || !fromNumber) {
      return NextResponse.json(
        { error: "Outbound calling not configured" },
        { status: 500 }
      );
    }

    // Format phone to E.164
    let phone = data.phone.replace(/\D/g, "");
    if (phone.length === 10) phone = "1" + phone;
    if (!phone.startsWith("+")) phone = "+" + phone;

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
