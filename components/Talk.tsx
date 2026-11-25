"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Conversation from "./Conversation";
import type { Answers } from "@/lib/conversation";

const Ctx = createContext<(preset?: Partial<Answers>) => void>(() => {});
export const useTalk = () => useContext(Ctx);

export function TalkProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Partial<Answers> | undefined>();
  const [key, setKey] = useState(0);

  const start = (p?: Partial<Answers>) => {
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
              <p>Pricing in about two minutes.</p>
            </div>
            <button className="talk__close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
          </header>
          {open && <Conversation key={key} preset={preset} campaign="website-overlay" />}
        </div>
      </div>
    </Ctx.Provider>
  );
}

export function TalkButton({
  children = "Get a quote",
  preset,
  variant = "solid",
}: {
  children?: React.ReactNode;
  preset?: Partial<Answers>;
  variant?: "solid" | "ghost" | "light" | "ghost-dark";
}) {
  const start = useTalk();
  return (
    <button className={`btn btn--${variant}`} onClick={() => start(preset)}>
      {children}
      <svg className="m-arrow" width="16" height="16" viewBox="0 0 18 18" aria-hidden>
        <path d="M3 9h11M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
