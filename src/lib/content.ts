import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Content } from "./types";
import { defaultContent } from "./defaultContent";
import { getDb, isFirebaseConfigured } from "./firebase";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");
const COLLECTION = "site";
const DOC = "content";

/** Fill any fields missing from stored content with the defaults (safe after schema changes). */
function merge(stored: Partial<Content>): Content {
  return {
    ...defaultContent,
    ...stored,
    settings: { ...defaultContent.settings, ...(stored.settings ?? {}) },
    home: { ...defaultContent.home, ...(stored.home ?? {}) },
    about: { ...defaultContent.about, ...(stored.about ?? {}) },
    vision: { ...defaultContent.vision, ...(stored.vision ?? {}) },
    roadmap: { ...defaultContent.roadmap, ...(stored.roadmap ?? {}) },
    sectors: stored.sectors ?? defaultContent.sectors,
    offices: stored.offices ?? defaultContent.offices,
    news: stored.news ?? defaultContent.news,
  };
}

async function loadFromFirestore(): Promise<Content> {
  const db = getDb();
  if (!db) return defaultContent;
  const ref = db.collection(COLLECTION).doc(DOC);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set(defaultContent);
    return defaultContent;
  }
  return merge(snap.data() as Partial<Content>);
}

function loadFromFile(): Content {
  try {
    if (!fs.existsSync(FILE)) return defaultContent;
    return merge(JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<Content>);
  } catch {
    return defaultContent;
  }
}

async function load(): Promise<Content> {
  if (isFirebaseConfigured()) {
    try {
      return await loadFromFirestore();
    } catch {
      return defaultContent;
    }
  }
  return loadFromFile();
}

/** Current site content (memoised per request). */
export const getContent = cache(load);

export function storageMode(): "firestore" | "local" {
  return isFirebaseConfigured() ? "firestore" : "local";
}

export async function saveContent(content: Content): Promise<void> {
  const db = getDb();
  if (db) {
    await db.collection(COLLECTION).doc(DOC).set(content);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("Database not connected: add FIREBASE_SERVICE_ACCOUNT in Vercel to save changes.");
  }
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(content, null, 2), "utf8");
}
