import { NextResponse } from "next/server";
import { deleteMessage, getMessages, updateMessage } from "@/lib/messages";
import { getSessionUser } from "@/lib/session";

async function guard() {
  return (await getSessionUser()) ? null : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json(await getMessages());
}

export async function PATCH(req: Request) {
  const denied = await guard();
  if (denied) return denied;
  const { id, read } = (await req.json()) as { id?: string; read?: boolean };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await updateMessage(id, { read: Boolean(read) });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const denied = await guard();
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
