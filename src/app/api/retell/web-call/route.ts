import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retell = new Retell({ apiKey: process.env.RETELL_API_KEY! });

export async function POST() {
  try {
    const agentId = process.env.NEXT_PUBLIC_RETELL_INBOUND_AGENT_ID;
    if (!agentId) {
      return NextResponse.json({ error: "Agent not configured" }, { status: 500 });
    }

    const webCallResponse = await retell.call.createWebCall({
      agent_id: agentId,
    });

    return NextResponse.json({ access_token: webCallResponse.access_token });
  } catch (error) {
    console.error("Retell web call error:", error);
    return NextResponse.json({ error: "Failed to create call" }, { status: 500 });
  }
}
