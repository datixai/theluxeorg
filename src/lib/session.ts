import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken } from "./auth";

/** Returns the signed-in admin username, or null. */
export async function getSessionUser(): Promise<string | null> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
