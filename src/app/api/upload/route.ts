import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import { getSessionUser } from "@/lib/session";
import { getBucket } from "@/lib/firebase";

/*
 * Admin file uploads (photos, PDF documents, short videos).
 * Storage, in order of preference:
 *   1. Vercel Blob (BLOB_READ_WRITE_TOKEN set on Vercel)
 *   2. Firebase Storage (FIREBASE_STORAGE_BUCKET set)
 *   3. public/uploads on the local disk (development only)
 * Vercel limits a request body to about 4.5 MB, so uploads are capped at 4 MB.
 * Larger videos should be hosted on YouTube or Vimeo and linked.
 */

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "application/pdf": "pdf",
  "video/mp4": "mp4",
  "video/webm": "webm",
};
const MAX = 4 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await getSessionUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Use JPG, PNG, WebP, PDF, MP4 or WebM files." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "File too large (max 4 MB)." }, { status: 400 });

  const base =
    (file.name || "file")
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "file";
  const name = `${base}-${Date.now().toString(36)}.${ext}`;

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${name}`, file, { access: "public", contentType: file.type });
      return NextResponse.json({ url: blob.url });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const bucket = getBucket();
    if (bucket) {
      const objectPath = `uploads/${name}`;
      await bucket.file(objectPath).save(buf, {
        metadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" },
      });
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media`;
      return NextResponse.json({ url });
    }

    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: "File storage is not connected yet. Add Vercel Blob to the project, then try again." },
        { status: 503 },
      );
    }
    const dir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name), buf);
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
