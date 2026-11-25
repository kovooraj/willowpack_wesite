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

  return (
    <div className="convo">
      <div className="convo__steps" aria-hidden>
        {["Your details", "Your product", "Quote"].map((s, i) => (
          <span key={s} className={i <= ["contact", "product", "chat"].indexOf(stage) ? "is-on" : ""}>
            <b>0{i + 1}</b> {s}
          </span>
        ))}
      </div>

      <div className="convo__log" ref={log} aria-live="polite">
        <div className="bubble bubble--wp">
          {returning && stage === "contact"
            ? `Welcome back, ${lead.first_name}. Confirm your details and we'll pick up from there.`
            : "Hi, I'm Willowpack's quote assistant. Start with your details, then the product, and I'll price it in a couple of minutes."}
        </div>

        {stage !== "contact" && (
          <div className="bubble bubble--you">
            {lead.first_name} {lead.last_name} · {lead.company}
            <br />
            <span className="bubble__sub">{lead.email}</span>
          </div>
        )}
        {stage !== "contact" && (
          <div className="bubble bubble--wp">
            Thanks, {lead.first_name}. What are you packaging? Pick a format if you know it.
          </div>
        )}

        {stage === "chat" &&
          msgs.map((m, i) => {
            if (m.from === "you")
              return (
                <div key={i} className="bubble bubble--you">
                  {m.text}
                </div>
              );
            if (m.from === "quote")
              return (
                <div key={i} className="qcard">
                  <span className="eyebrow">Quote {m.quote.id}</span>
                  <strong>{money(m.quote.discounted_total ?? m.quote.total, m.quote.currency)}</strong>
                  <span>
                    {m.quote.quantity ? `${Number(m.quote.quantity).toLocaleString("en-CA")} units` : ""}
                    {m.quote.summary ? ` · ${m.quote.summary}` : ""}
                  </span>
                </div>
              );
            if (m.from === "error")
              return (
                <div key={i} className="bubble bubble--wp bubble--err">
                  That message didn't go through.{" "}
                  <button className="convo__link" onClick={() => retry(i, m.retry)}>
                    Send again
                  </button>
                  <div className="bubble__sub">
                    We already have your details, so a specialist can follow up at {lead.email} either way.
                  </div>
                </div>
              );
            const last = i === msgs.length - 1;
            return (
              <div key={i} className="bubble bubble--wp bubble--md">
                <div dangerouslySetInnerHTML={{ __html: m.html }} />
                {last && m.options && m.options.length > 0 && (
                  <div className="chips chips--inline">
                    {m.options.map((o) => (
                      <button key={o.label} className={`chip ${o.rec ? "chip--rec" : ""}`} onClick={() => ask(o.label)} disabled={busy}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        {busy && (
          <div className="bubble bubble--wp bubble--typing" aria-label="Typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>

      <div className="convo__input">
        {stage === "contact" && (
          <form className="convo__contact" onSubmit={submitContact}>
            <label>First name<input required autoComplete="given-name" value={lead.first_name} onChange={(e) => setLead({ ...lead, first_name: e.target.value })} /></label>
            <label>Last name<input autoComplete="family-name" value={lead.last_name} onChange={(e) => setLead({ ...lead, last_name: e.target.value })} /></label>
            <label>Company<input required autoComplete="organization" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} /></label>
            <label>Work email<input required type="email" autoComplete="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} /></label>
            <label className="span2">Phone (optional)<input type="tel" autoComplete="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} /></label>
            <button className="btn btn--solid span2" type="submit" disabled={!nameOk}>
              Continue <span aria-hidden>→</span>
            </button>
          </form>
        )}

        {stage === "product" && (
          <form
            className="convo__product"
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim() || format) startChat(text.trim());
            }}
          >
            <div className="chips">
              {FORMAT_CHIPS.map((f) => (
                <button type="button" key={f} className={`chip ${format === f ? "is-picked" : ""}`} onClick={() => setFormat(format === f ? "" : f)}>
                  {f}
                </button>
              ))}
            </div>
            <div className="convo__text">
              <input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. 10,000 stand-up pouches for our new granola" aria-label="What are you packaging?" />
              <button className="btn btn--solid" type="submit" disabled={!text.trim() && !format}>
                Get my quote <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        )}

        {stage === "chat" && (
          <form
            className="convo__text"
            onSubmit={(e) => {
              e.preventDefault();
              ask(text);
            }}
          >
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Reply…" aria-label="Your reply" disabled={busy} />
            <button className="btn btn--solid" type="submit" disabled={busy || !text.trim()}>
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
