import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ContactMessage } from "./types";
import { getDb } from "./firebase";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "messages.json");
const COLLECTION = "messages";

function readFile(): ContactMessage[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as ContactMessage[];
  } catch {
    return [];
  }
}

function writeFile(list: ContactMessage[]): void {
  if (process.env.VERCEL) throw new Error("Database not connected");
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf8");
}

export async function addMessage(m: Omit<ContactMessage, "id" | "createdAt" | "read">): Promise<void> {
  const entry: ContactMessage = {
    ...m,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
    read: false,
  };
  const db = getDb();
  if (db) {
    await db.collection(COLLECTION).doc(entry.id).set(entry);
    return;
  }
  const list = readFile();
  list.unshift(entry);
  writeFile(list.slice(0, 1000));
}

export async function getMessages(): Promise<ContactMessage[]> {
  const db = getDb();
  if (db) {
    const snap = await db.collection(COLLECTION).orderBy("createdAt", "desc").limit(500).get();
    return snap.docs.map((d: { data: () => unknown }) => d.data() as ContactMessage);
  }
  return readFile();
}

export async function updateMessage(id: string, patch: Partial<Pick<ContactMessage, "read">>): Promise<void> {
  const db = getDb();
  if (db) {
    await db.collection(COLLECTION).doc(id).update(patch);
    return;
  }
  writeFile(readFile().map((m) => (m.id === id ? { ...m, ...patch } : m)));
}

export async function deleteMessage(id: string): Promise<void> {
  const db = getDb();
  if (db) {
    await db.collection(COLLECTION).doc(id).delete();
    return;
  }
  writeFile(readFile().filter((m) => m.id !== id));
}
