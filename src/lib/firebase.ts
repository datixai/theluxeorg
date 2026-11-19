import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp, type App, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/**
 * Firebase Admin SDK (Firestore database).
 *
 * Credentials come from either:
 *   - the FIREBASE_SERVICE_ACCOUNT env var (full JSON on one line), used on Vercel, or
 *   - a local firebase-service-account.json file (gitignored), used in development.
 *
 * Without either, the site falls back to local JSON files in data/ so it still
 * runs anywhere (development only: Vercel's file system is read-only).
 */

let cached: App | null | undefined;

function init(): App | null {
  if (cached !== undefined) return cached;

  let serviceAccount: ServiceAccount | null = null;
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
      const p = path.join(process.cwd(), "firebase-service-account.json");
      if (fs.existsSync(p)) serviceAccount = JSON.parse(fs.readFileSync(p, "utf8"));
    }
  } catch {
    serviceAccount = null;
  }

  if (!serviceAccount) {
    cached = null;
    return cached;
  }

  cached = getApps().length
    ? getApps()[0]!
    : initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
      });
  return cached;
}

export function isFirebaseConfigured(): boolean {
  return init() !== null;
}

export function getDb(): Firestore | null {
  const app = init();
  return app ? getFirestore(app) : null;
}

export function getBucket() {
  const app = init();
  if (!app || !process.env.FIREBASE_STORAGE_BUCKET) return null;
  return getStorage(app).bucket();
}
