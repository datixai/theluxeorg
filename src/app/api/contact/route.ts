import { NextResponse } from "next/server";
import { addMessage } from "@/lib/messages";

// Best-effort, per-instance rate limit (serverless instances are short-lived,
// so this is a soft throttle rather than a hard guarantee).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const LIMITS = { name: 100, email: 150, organisation: 150, interest: 60, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff ? xff.split(",")[0] : req.headers.get("x-real-ip") || "unknown").trim();
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  const limited = arr.length >= MAX_PER_WINDOW;
  if (!limited) arr.push(now);
  hits.set(ip, arr);
  return limited;
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const field = (k: keyof typeof LIMITS) => String(body[k] ?? "").trim().slice(0, LIMITS[k]);
  const name = field("name");
  const email = field("email");
  const organisation = field("organisation");
  const interest = field("interest");
  const message = field("message");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await addMessage({ name, email, organisation, interest, message });
  } catch {
    return NextResponse.json(
      { error: "Sorry, we could not send your message right now. Please email us instead." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
