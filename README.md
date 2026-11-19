# The Luxe Organization website

Corporate website for The Luxe Organization and Vision 2035. Built by Datix AI with Next.js 16 and Tailwind CSS 4.

## Run locally
```
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD and ADMIN_SECRET
npm run dev -- -p 3210
```
Website: http://localhost:3210, admin panel: http://localhost:3210/admin

## Admin panel
Edit all page text and photos, the six sectors, roadmap, offices, WhatsApp number and email; publish news; read contact form messages; upload photos, PDFs and short videos.

## Deploy (Vercel)
Framework preset: Next.js. Add the environment variables from `.env.example`:
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET` (required for the admin panel)
- `FIREBASE_SERVICE_ACCOUNT` (Firestore database, required for saving in production)
- a Vercel Blob store (adds `BLOB_READ_WRITE_TOKEN`) for uploads
- `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_GA_ID`

Photo credits: public/images/CREDITS.txt (Unsplash licence).
