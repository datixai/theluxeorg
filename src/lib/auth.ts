// Minimal, dependency-free session auth for the admin panel.
// A signed token (HMAC-SHA256 via Web Crypto) is stored in an httpOnly cookie,
// so it works in both the Node and Edge (middleware) runtimes.

export const SESSION_COOKIE = "luxe_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days (seconds)

const DEV_SECRET = "luxe-dev-secret-change-me";

function getSecret(): string {
  return process.env.ADMIN_SECRET || DEV_SECRET;
}

export function getCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "",
  };
}

/**
 * A password is always required (set ADMIN_PASSWORD in .env.local for development).
 * In production the admin credentials and signing secret MUST come from env
 * vars; otherwise the panel would be left open with weak defaults. Fail closed.
 */
export function isAdminConfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return Boolean(process.env.ADMIN_PASSWORD);
  return Boolean(
    process.env.ADMIN_SECRET &&
      process.env.ADMIN_SECRET !== DEV_SECRET &&
      process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD
  );
}

/** Constant-time string comparison to avoid leaking info via timing. */
export function safeEqual(a: string, b: string): boolean {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  const len = Math.max(ab.length, bb.length);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < len; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64url(sig);
}

/** Create a signed session token for the given user. */
export async function createToken(username: string): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL * 1000 })));
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Verify a session token; returns the username or null. */
export async function verifyToken(token: string | undefined): Promise<string | null> {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = await hmac(payload);
  if (!safeEqual(sig, expected)) return null;
  try {
    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    ) as { u: string; exp: number };
    if (!json.exp || json.exp < Date.now()) return null;
    return json.u;
  } catch {
    return null;
  }
}

export const sessionMaxAge = SESSION_TTL;
