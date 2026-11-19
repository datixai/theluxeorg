import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createToken,
  getCredentials,
  sessionMaxAge,
  isAdminConfigured,
  safeEqual,
} from "@/lib/auth";

// Best-effort per-instance throttle against password brute-forcing.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff ? xff.split(",")[0] : req.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin is not configured" }, { status: 503 });
  }

  const ip = clientIp(req);
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = String(body.username || "");
    password = String(body.password || "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const creds = getCredentials();
  const ok = safeEqual(username, creds.username) && safeEqual(password, creds.password);
  if (!ok) {
    recent.push(now);
    attempts.set(ip, recent);
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }
  attempts.delete(ip);

  const token = await createToken(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
  return res;
}
