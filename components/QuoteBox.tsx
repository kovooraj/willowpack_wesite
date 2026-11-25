"use client";

import { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";

export const EMBED_SRC = "https://willowpacktestaiquote.vercel.app/embed.js";
export const ACCENT = "#A5603D";

type WPChat = { open: (o?: { q?: string; format?: string }) => void; scan: () => void; version: string };
export const wpChat = (): WPChat | undefined =>
  typeof window !== "undefined" ? (window as unknown as { WillowpackChat?: WPChat }).WillowpackChat : undefined;

// Inline Willowpack AI quote box (from the quote-chat app's embed.js).
// Falls back to the built-in scripted conversation if the embed doesn't render.
export default function QuoteBox({
  campaign = "website",
  theme = "dark",
  formats = "pouches,labels,boxes,rollstock,help",
  placeholder = "e.g. 10,000 stand-up pouches for our new granola",
}: {
  campaign?: string;
  theme?: "dark" | "light";
  formats?: string;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    // Client-side navigation: ask the embed to pick up the new box.
    wpChat()?.scan();
    const t = window.setTimeout(() => {
      wpChat()?.scan();
      const rendered = ref.current && (ref.current.shadowRoot || ref.current.childElementCount > 0);
      if (!rendered) setFallback(true);
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  if (fallback) return <Conversation />;
  return (
    <div
      ref={ref}
      className="quotebox"
      data-willowpack-chat
      data-theme={theme}
      data-accent={ACCENT}
      data-campaign={campaign}
      data-formats={formats}
      data-placeholder={placeholder}
    />
  );
}
