// Downloads any media listed in media.json that isn't already in public/media.
// Never fails the build: missing media falls back to CSS gradients in the UI.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../media.json", import.meta.url), "utf8"));
const dir = new URL("../public/media/", import.meta.url);
await mkdir(dir, { recursive: true });

await Promise.all(
  Object.entries(manifest)
    .filter(([k]) => !k.startsWith("_"))
    .map(async ([name, url]) => {
      const dest = new URL(name, dir);
      try {
        await access(dest);
        return;
      } catch {}
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await writeFile(dest, Buffer.from(await res.arrayBuffer()));
        console.log(`media: fetched ${name}`);
      } catch (e) {
        console.warn(`media: could not fetch ${name} (${e.message})`);
      }
    }),
);
