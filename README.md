# Willowpack website

Next.js (App Router) marketing site for Willowpack: Home, Products (Labels, Folding Cartons, Pouches, Roll Stock, Cut & Stack Can Labels), About, Contact.

- **Quote chat:** loads the Willowpack AI quote assistant from `https://willowpacktestaiquote.vercel.app/embed.js`. "Start a project" buttons call `WillowpackChat.open()`; Contact and the closing CTA render the inline box (`campaign=website-contact` / `website-cta`). If the embed fails to load, a built-in scripted conversation posts to `/api/lead` instead.
- **Media:** ElevenLabs renders listed in `media.json`, downloaded into `public/media` by `scripts/fetch-media.mjs` before each build. Commit the files to `public/media` to stop depending on the signed URLs.
- **Content:** `lib/site.ts` (contact details: confirm the TODOs), `lib/products.ts`.

## Deploy (Vercel)
1. Import this repo in Vercel (framework: Next.js, no settings needed).
2. Optional: set `LEAD_WEBHOOK_URL` for fallback-form leads.
3. Add the site's domain to **Allowed Origins** on the n8n "When chat message received" trigger, then re-publish that workflow, or the embedded chat won't answer.

## Local
```bash
npm install
npm run dev
```
