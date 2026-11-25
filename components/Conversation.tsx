"use client";

import { useEffect, useRef, useState } from "react";
import { type Lead, type Quote, md, money, newSessionId, sendToQuoteEngine } from "@/lib/quoteChat";

// Site-styled front end for the Willowpack AI quote engine.
// 1) contact card (lead captured immediately) → 2) what are you packaging → 3) live AI conversation.

type Msg =
  | { from: "wp"; html: string; options?: { label: string; rec: boolean }[] }
  | { from: "you"; text: string }
  | { from: "quote"; quote: Quote }
  | { from: "error"; retry: string };

export const FORMAT_CHIPS = ["Labels", "Folding cartons", "Pouches", "Roll stock", "Cut & stack can labels", "Not sure yet"];
const LEAD_KEY = "wp_site_lead";
const emptyLead: Lead = { first_name: "", last_name: "", company: "", email: "", phone: "" };

function loadLead(): Lead | null {
  try {
    const v = JSON.parse(localStorage.getItem(LEAD_KEY) || "null");
    return v && v.email ? { ...emptyLead, ...v } : null;
  } catch {
    return null;
  }
}

function Avatar() {
  return (
  <span className="chat__ava" aria-hidden>
    <svg viewBox="0 0 28 28" width="14" height="14">
      <path d="M3 6l5.5 16L14 9l5.5 13L25 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  </span>
  );
}
const Wp = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className="chat__row chat__row--wp">
    <Avatar />
    <div className={`chat__bubble ${className}`}>{children}</div>
  </div>
);

export default function Conversation({ preset, campaign = "website" }: { preset?: { format?: string; situation?: string }; campaign?: string }) {
  const [stage, setStage] = useState<"contact" | "product" | "chat">("contact");
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [returning, setReturning] = useState(false);
  const [format, setFormat] = useState(preset?.format || "");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const session = useRef<string>("");
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    session.current = newSessionId();
    const saved = loadLead();
    if (saved) {
      setLead(saved);
      setReturning(true);
    }
  }, []);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy, stage]);

  const nameOk = lead.first_name.trim() && lead.company.trim() && /\S+@\S+\.\S+/.test(lead.email);

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameOk) return;
    try {
      localStorage.setItem(LEAD_KEY, JSON.stringify(lead));
    } catch {}
    // Capture the lead now, so sales has it even if the chat is abandoned.
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: { name: `${lead.first_name} ${lead.last_name}`.trim(), company: lead.company, email: lead.email, phone: lead.phone },
        answers: { stage: "contact", quoteSessionId: session.current, campaign, ...(preset || {}) },
        page: location.pathname,
      }),
    }).catch(() => {});
    setStage("product");
  };

  const ask = async (t: string, shown?: string) => {
    t = t.trim();
    if (!t || busy) return;
    setMsgs((m) => [...m, { from: "you", text: shown ?? t }]);
    setText("");
    setBusy(true);
    try {
      const r = await sendToQuoteEngine(session.current, t, lead, campaign);
      setMsgs((m) => [...m, { from: "wp", html: md(r.text), options: r.options }, ...(r.quote ? [{ from: "quote", quote: r.quote } as Msg] : [])]);
    } catch {
      setMsgs((m) => [...m, { from: "error", retry: t }]);
    } finally {
      setBusy(false);
    }
  };

  const startChat = (product: string) => {
    const opener = [
      `Hi, I'm ${lead.first_name} from ${lead.company}.`,
      format && format !== "Not sure yet" ? `I'm looking for ${format.toLowerCase()}` : "I'm looking for packaging",
      product ? `for ${product}.` : ".",
      preset?.situation ? `Context: ${preset.situation.toLowerCase()}.` : "",
    ]
      .join(" ")
      .replace(" .", ".");
    setStage("chat");
    ask(opener, product || format || "Help me choose");
  };

  const retry = (i: number, t: string) => {
    setMsgs((m) => m.filter((_, j) => j !== i && j !== i - 1));
    ask(t);
  };

  const stepIdx = ["contact", "product", "chat"].indexOf(stage);
  const stepName = ["Your details", "Your product", "Your quote"][stepIdx];
  return (
    <div className="convo chat">
      <header className="chat__head">
        <span className="chat__ava chat__ava--lg" aria-hidden>
          <svg viewBox="0 0 28 28" width="18" height="18">
            <path d="M3 6l5.5 16L14 9l5.5 13L25 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="chat__who">
          <strong>Willowpack quote assistant</strong>
          <small>
            Step {stepIdx + 1} of 3 · {stepName}
          </small>
        </div>
        <div className="chat__progress" aria-hidden>
          <span style={{ transform: `scaleX(${(stepIdx + 1) / 3})` }} />
        </div>
      </header>

      <div className="chat__log" ref={log} aria-live="polite">
        <Wp>
          {returning && stage === "contact"
            ? `Welcome back, ${lead.first_name}. Check your details below and we'll pick up from there.`
            : "Hi, I'm Willowpack's quote assistant. Share a few details and what you're packaging, and I'll price it in a couple of minutes."}
        </Wp>

        {stage === "contact" && (
          <div className="chat__row chat__row--wp chat__row--card">
            <span className="chat__ava chat__ava--ghost" aria-hidden />
            <form className="chat__card chat__form" onSubmit={submitContact}>
              <label>First name<input required autoComplete="given-name" value={lead.first_name} onChange={(e) => setLead({ ...lead, first_name: e.target.value })} /></label>
              <label>Last name<input autoComplete="family-name" value={lead.last_name} onChange={(e) => setLead({ ...lead, last_name: e.target.value })} /></label>
              <label>Company<input required autoComplete="organization" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} /></label>
              <label>Work email<input required type="email" autoComplete="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} /></label>
              <label className="span2"><span>Phone <em>optional</em></span><input type="tel" autoComplete="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} /></label>
              <button className="chat__primary span2" type="submit" disabled={!nameOk}>
                Continue
                <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden><path d="M3 9h11M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              </button>
            </form>
          </div>
        )}

        {stage !== "contact" && (
          <div className="chat__row chat__row--you">
            <div className="chat__bubble chat__bubble--you">
              {lead.first_name} {lead.last_name} · {lead.company}
              <span className="chat__sub">{lead.email}</span>
            </div>
          </div>
        )}
        {stage !== "contact" && <Wp>Thanks, {lead.first_name}. What are you packaging? Pick a format if you know it, then describe the product below.</Wp>}
        {stage === "product" && (
          <div className="chat__row chat__row--wp chat__row--card">
            <span className="chat__ava chat__ava--ghost" aria-hidden />
            <div className="chat__chips">
              {FORMAT_CHIPS.map((f) => (
                <button type="button" key={f} className={`chat__chip ${format === f ? "is-picked" : ""}`} onClick={() => setFormat(format === f ? "" : f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === "chat" &&
          msgs.map((m, i) => {
            if (m.from === "you")
              return (
                <div key={i} className="chat__row chat__row--you">
                  <div className="chat__bubble chat__bubble--you">{m.text}</div>
                </div>
              );
            if (m.from === "quote")
              return (
                <div key={i} className="chat__row chat__row--wp chat__row--card">
                  <span className="chat__ava chat__ava--ghost" aria-hidden />
                  <div className="qcard">
                    <span className="eyebrow">Quote {m.quote.id}</span>
                    <strong>{money(m.quote.discounted_total ?? m.quote.total, m.quote.currency)}</strong>
                    <span>
                      {m.quote.quantity ? `${Number(m.quote.quantity).toLocaleString("en-CA")} units` : ""}
                      {m.quote.summary ? ` · ${m.quote.summary}` : ""}
                    </span>
                  </div>
                </div>
              );
            if (m.from === "error")
              return (
                <Wp key={i} className="chat__bubble--err">
                  That message didn&apos;t go through.{" "}
                  <button className="convo__link" onClick={() => retry(i, m.retry)}>
                    Send again
                  </button>
                  <span className="chat__sub">We already have your details, so a specialist can follow up at {lead.email} either way.</span>
                </Wp>
              );
            const last = i === msgs.length - 1;
            return (
              <Wp key={i} className="bubble--md">
                <div dangerouslySetInnerHTML={{ __html: m.html }} />
                {last && m.options && m.options.length > 0 && (
                  <div className="chat__chips chat__chips--in">
                    {m.options.map((o) => (
                      <button key={o.label} className={`chat__chip ${o.rec ? "chat__chip--rec" : ""}`} onClick={() => ask(o.label)} disabled={busy}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </Wp>
            );
          })}

        {busy && (
          <Wp className="chat__typing">
            <i />
            <i />
            <i />
          </Wp>
        )}
      </div>

      {stage !== "contact" && (
        <form
          className="chat__composer"
          onSubmit={(e) => {
            e.preventDefault();
            if (stage === "product") {
              if (text.trim() || format) startChat(text.trim());
            } else ask(text);
          }}
        >
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={stage === "product" ? "e.g. 10,000 stand-up pouches for our new granola" : "Reply…"}
            aria-label={stage === "product" ? "What are you packaging?" : "Your reply"}
            disabled={busy}
          />
          <button
            className="chat__send"
            type="submit"
            aria-label={stage === "product" ? "Get my quote" : "Send"}
            disabled={busy || (stage === "product" ? !text.trim() && !format : !text.trim())}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden><path d="M9 14V4M4.5 8.5 9 4l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </form>
      )}
    </div>
  );
}
