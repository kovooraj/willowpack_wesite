import { NextResponse } from "next/server";
import { scoreTier, type Answers } from "@/lib/conversation";

// Receives a completed conversation, adds a tier signal, and forwards it to
// LEAD_WEBHOOK_URL (n8n / Zapier / Salesforce Web-to-Lead relay) when configured.
export async function POST(req: Request) {
  let body: { answers?: Answers; contact?: Record<string, string>; page?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { answers = {}, contact = {}, page = "" } = body;
  if (!contact.name || !contact.company || !/\S+@\S+\.\S+/.test(contact.email ?? "")) {
    return NextResponse.json({ ok: false, error: "Missing contact details" }, { status: 400 });
  }

  const lead = {
    source: "willowpack.com conversation",
    brand: "Willowpack",
    submittedAt: new Date().toISOString(),
    tierSignal: scoreTier(answers),
    page,
    contact,
    answers,
  };

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch(() => null);
    if (!r || !r.ok) {
      console.error("Lead webhook failed", r?.status);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else {
    console.log("[lead]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true, tier: lead.tierSignal });
}
