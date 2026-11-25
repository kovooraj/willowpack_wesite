# Willowpack website

Next.js (App Router) marketing site for Willowpack: Home, Products (Labels, Folding Cartons, Pouches, Roll Stock, Cut & Stack Can Labels), About, Contact.

- **Quote chat:** site-styled front end (`components/Conversation.tsx`) for the Willowpack AI quote engine (n8n webhook `willowpack-quote-chat`, same protocol as the quote-chat app). Flow: contact card → product/format → AI conversation. Contact details are posted to `/api/lead` immediately (with the quote session ID) and sent to the AI as `metadata.carry`. Override the webhook with `NEXT_PUBLIC_QUOTE_WEBHOOK`.
- **Media:** ElevenLabs renders listed in `media.json`, downloaded into `public/media` by `scripts/fetch-media.mjs` before each build. Commit the files to `public/media` to stop depending on the signed URLs.
- **Content:** `lib/site.ts` (contact details: confirm the TODOs), `lib/products.ts`.

## Deploy (Vercel)
1. Import this repo in Vercel (framework: Next.js, no settings needed).
2. Set `LEAD_WEBHOOK_URL` so contact captures reach n8n / Salesforce (otherwise they are only logged).
3. Allow the site's domain for CORS on the n8n `willowpack-quote-chat` webhook (Allowed Origins on the chat trigger), then re-publish that workflow, or the chat won't answer.

## Local
```bash
npm install
npm run dev
```
