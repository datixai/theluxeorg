import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent } from "@/lib/content";
import { getSessionUser } from "@/lib/session";
import type { Content } from "@/lib/types";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getContent());
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Content;
  try {
    body = (await req.json()) as Content;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !body.settings || !Array.isArray(body.sectors)) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  try {
    await saveContent(body);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Save failed" }, { status: 503 });
  }
  // Refresh every public page so the change shows immediately.
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
