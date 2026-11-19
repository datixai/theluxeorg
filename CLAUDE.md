# The Luxe Organization website (Datix AI)

Context file for Claude on any PC. Read this first, then README.md. Update "Status", "Next steps" and the "Progress log" at the end of every work session.

## What the project is
Corporate website for The Luxe Organization (UK holding company with Middle East offices) and its Vision 2035 programme (EV charging, data centres, AI, AI-backed solar grids, healthcare, broadband; Pakistan first, then worldwide). Built by Datix AI. Version 1 = Package 1 (Launch) plus the admin panel add-on. Packages 2 and 3 (more SEO, LLM SEO, schema, Business Profile work) can be layered on later.

Design: layout and mood inspired by a luxury corporate site the client named (white header with centred logo, black/gold, full-bleed photo mosaic with spaced capital labels). Nothing copied: own logo, copy, photos and code.

## Status (19 Nov 2026)
- Done: multi-page Next.js site (Home, Vision 2035, Sectors + 6 sector pages, About, Roadmap, Offices, News + articles, Contact), WhatsApp floating button, admin panel (/admin: content, news, messages, uploads), technical SEO (sitemap, robots with AI crawlers allowed, llms.txt, Organization schema, Open Graph image), optional Google Analytics.
- Waiting on: client content (see CONTENT_TODO.md), Firebase project + Vercel env vars, Vercel Blob store, decision on how the full site replaces the coming-soon page.

## Key decisions
1. Content lives in one Firestore document `site/content` (seeded from src/lib/defaultContent.ts); contact messages in collection `messages`. Without Firebase, dev falls back to data/*.json (gitignored). On Vercel without Firebase, saves fail with a clear message.
2. Admin auth: username/password from env (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SECRET), signed httpOnly cookie, `src/proxy.ts` guards /admin (Next 16 renamed middleware to proxy).
3. Uploads: Vercel Blob if BLOB_READ_WRITE_TOKEN, else Firebase Storage if FIREBASE_STORAGE_BUCKET, else public/uploads locally. Max 4 MB (Vercel body limit).
4. Public pages are static with ISR (revalidate 1 h) and are revalidated instantly when the admin saves.
5. firebase-admin v14: use modular imports (firebase-admin/app, /firestore, /storage), not the old namespace API.
6. GitHub repo datixai/theluxeorg is PUBLIC: invoices/, documentation/, docs/, assets/, BRIEF.md, CONTENT_TODO.md, .env* and data/ are gitignored and must never be pushed. coming-soon/ is a separate nested repo (also ignored).

## Folder structure
```
src/app/(site)/      public pages (layout has header, footer, WhatsApp button, JSON-LD)
src/app/admin/       login + (panel)/ dashboard, content, news, messages, media
src/app/api/         auth, content, contact, messages, upload
src/lib/             types, defaultContent (seed copy), content/messages stores, firebase, auth, seo
src/components/site  header, footer, mosaic, page hero, contact form, WhatsApp
src/components/admin editors and fields
public/brand         logo variants and icons; public/images photos (+ CREDITS.txt)
coming-soon/         separate repo (coming-soon page), ignored here
```

## How to set up and run
- `npm install`, copy `.env.example` to `.env.local` and set ADMIN_PASSWORD and ADMIN_SECRET (local .env.local exists on the build PC).
- `npm run dev -- -p 3210`, site at http://localhost:3210, admin at /admin.
- `npm run build` must pass before pushing. `npx eslint src` clean.
- Vercel: framework preset Next.js; env vars as in .env.example.

## Known problems / risks
- Live admin needs FIREBASE_SERVICE_ACCOUNT on Vercel, otherwise it cannot save.
- Office photos imply London and Dubai until the client confirms cities.

## Next steps
1. Agree with Ahmed how to publish over the coming-soon page (branch / preview first).
2. Create Firebase project and Vercel Blob store; add env vars on Vercel.
3. Client content pass (CONTENT_TODO.md), then Search Console, Analytics, Business Profile.

## Rules for this project
- No em or en dashes anywhere. No decorative dash or hairline before labels.
- Keep this project's files only in this folder.
- Git: commit as the local identity, no Claude/AI attribution, ask before every push. Never push private files to the public repo.

## Progress log
- 2026-11-19: Logo cut into transparent variants; first one-page draft replaced by the full multi-page v1 with admin panel, photos, WhatsApp button and Package 1 SEO.
