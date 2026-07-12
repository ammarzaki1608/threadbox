import { NextResponse } from "next/server";

interface OrderPayload {
  name: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
  items: { name: string; size: string; qty: number }[];
  subtotal: number;
  bankName?: string;
  bankAccountHolder?: string;
  bankAccountNumber?: string;
  receiptWhatsapp?: string;
}

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.phone || !body.address || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;

  if (!webhookUrl || !secret) {
    // Not configured yet — don't block the WhatsApp/email flow over this.
    return NextResponse.json({ skipped: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, secret }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
