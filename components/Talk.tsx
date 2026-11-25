"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Conversation from "./Conversation";
import type { Answers } from "@/lib/conversation";
import { wpChat } from "./QuoteBox";

// Map site presets onto the quote chat's formats (pouches, labels, boxes, rollstock, help).
const FORMAT_MAP: Record<string, { format?: string; q?: string }> = {
  Labels: { format: "labels" },
  "Folding cartons": { format: "boxes" },
  Pouches: { format: "pouches" },
  "Roll stock": { format: "rollstock" },
  "Cut & stack can labels": { q: "I need cut & stack labels for aluminum cans" },
};
const SITUATION_Q: Record<string, string> = {
  "Consolidating suppliers": "We want to consolidate our packaging suppliers across several SKUs",
  "Launching a new product": "We're launching a new product and need packaging",
};

const Ctx = createContext<(preset?: Partial<Answers>) => void>(() => {});
export const useTalk = () => useContext(Ctx);

export function TalkProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Partial<Answers> | undefined>();
  const [key, setKey] = useState(0);

  const start = (p?: Partial<Answers>) => {
    const chat = wpChat();
    if (chat) {
      const m = (p?.format && FORMAT_MAP[p.format]) || {};
      chat.open({ format: m.format, q: m.q || (p?.situation ? SITUATION_Q[p.situation] : undefined) });
      return;
    }
    setPreset(p);
    setKey((k) => k + 1);
    setOpen(true);
  };

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Ctx.Provider value={start}>
      {children}
      <div className={`talk ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Start a project" aria-hidden={!open}>
        <div className="talk__scrim" onClick={() => setOpen(false)} />
        <div className="talk__panel">
          <header className="talk__head">
            <div>
              <span className="eyebrow">Start a project</span>
              <p>Usually a two-minute conversation.</p>
            </div>
            <button className="talk__close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
          </header>
          {open && <Conversation key={key} preset={preset} />}
        </div>
      </div>
    </Ctx.Provider>
  );
}

export function TalkButton({
  children = "Start a project",
  preset,
  variant = "solid",
}: {
  children?: React.ReactNode;
  preset?: Partial<Answers>;
  variant?: "solid" | "ghost" | "light";
}) {
  const start = useTalk();
  return (
    <button className={`btn btn--${variant}`} onClick={() => start(preset)}>
      {children} <span aria-hidden>→</span>
    </button>
  );
}
