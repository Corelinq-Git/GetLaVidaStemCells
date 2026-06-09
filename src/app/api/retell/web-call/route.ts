import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retell = new Retell({ apiKey: process.env.RETELL_API_KEY! });

export async function POST(request: Request) {
  try {
    const agentId = process.env.NEXT_PUBLIC_RETELL_INBOUND_AGENT_ID;
    if (!agentId) {
      return NextResponse.json({ error: "Agent not configured" }, { status: 500 });
    }

    // Forward the visitor's browser timezone (+ any name/phone/email) so the
    // agent offers and books slots in their local time via {{patient_timezone}}.
    // A missing/invalid body must not block minting the call token.
    let body: { name?: string; phone?: string; email?: string; timezone?: string } = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const dynamicVariables: Record<string, string> = {};
    if (body.name) dynamicVariables.attendee_name = body.name;
    if (body.phone) dynamicVariables.attendee_phone = body.phone;
    if (body.email) dynamicVariables.attendee_email = body.email;
    if (body.timezone) dynamicVariables.patient_timezone = body.timezone;

    const webCallResponse = await retell.call.createWebCall({
      agent_id: agentId,
      ...(Object.keys(dynamicVariables).length > 0
        ? { retell_llm_dynamic_variables: dynamicVariables }
        : {}),
    });

    return NextResponse.json({ access_token: webCallResponse.access_token });
  } catch (error) {
    console.error("Retell web call error:", error);
    return NextResponse.json({ error: "Failed to create call" }, { status: 500 });
  }
}
