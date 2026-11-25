"use client";

import { useEffect, useRef, useState } from "react";
import { type Lead, type Quote, md, money, newSessionId, sendToQuoteEngine } from "@/lib/quoteChat";

// Site-styled, fully conversational front end for the Willowpack AI quote engine.
// The assistant asks one thing at a time (name, company, email, phone, format, product),
// the lead is captured once the contact questions are answered, then the AI quote chat takes over.

type Msg =
  | { from: "wp"; html: string; options?: { label: string; rec: boolean }[] }
  | { from: "you"; text: string }
  | { from: "quote"; quote: Quote }
  | { from: "error"; retry: string };

type Step = {
  key: "name" | "company" | "email" | "phone" | "format" | "product";
  ask: (lead: Lead, format: string) => string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  chips?: string[];
  optional?: boolean;
  check?: (v: string) => string | null; // an error message, or null when the answer is fine
};

export const FORMAT_CHIPS = ["Labels", "Folding cartons", "Pouches", "Roll stock", "Cut & stack can labels", "Not sure yet"];
const LEAD_KEY = "wp_site_lead";
const emptyLead: Lead = { first_name: "", last_name: "", company: "", email: "", phone: "" };
const TYPE_MS = 550;

const STEPS: Step[] = [
  {
    key: "name",
    ask: () => "Hi, I'm Willowpack's quote assistant. I'll price your packaging in a couple of minutes. First, what's your name?",
    placeholder: "Your full name",
    check: (v) => (v.trim().length < 2 ? "Could you tell me your name?" : null),
  },
  {
    key: "company",
    ask: (l) => `Nice to meet you, ${l.first_name}. Which company are you with?`,
    placeholder: "Company name",
    check: (v) => (v.trim().length < 2 ? "Which company should the quote be for?" : null),
  },
  {
    key: "email",
    ask: () => "What's the best work email for your quote?",
    placeholder: "name@company.com",
    type: "email",
    check: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? null : "That doesn't look like an email address. Could you check it?"),
  },
  {
    key: "phone",
    ask: () => "And a phone number, in case a specialist needs to call? You can skip this.",
    placeholder: "Phone number",
    type: "tel",
    chips: ["Skip"],
    optional: true,
  },
  {
    key: "format",
    ask: () => "Thanks. Which kind of packaging do you need? Pick one below, or type it.",
    placeholder: "e.g. stand-up pouches",
    chips: FORMAT_CHIPS,
  },
  {
    key: "product",
    ask: (_l, f) =>
      f && f !== "Not sure yet"
        ? `Great, ${f.toLowerCase()}. What's going in them, and roughly how many do you need?`
        : "No problem, I'll help you choose. What's the product, and roughly how many do you need?",
    placeholder: "e.g. freeze-dried pet treats, about 10,000",
  },
];

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

function Wp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="chat__row chat__row--wp">
      <Avatar />
      <div className={`chat__bubble ${className}`}>{children}</div>
    </div>
  );
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default function Conversation({ preset, campaign = "website" }: { preset?: { format?: string; situation?: string }; campaign?: string }) {
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [format, setFormat] = useState(preset?.format || "");
  const [step, setStep] = useState(-1); // index into STEPS; STEPS.length means the AI chat
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const session = useRef("");
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const started = useRef(false);

  const inChat = step >= STEPS.length;
  const current = !inChat && step >= 0 ? STEPS[step] : null;

  // The assistant "types" for a moment before each intake message.
  const say = (html: string, nextChips: string[] = []) => {
    setBusy(true);
    setChips([]);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "wp", html }]);
      setChips(nextChips);
      setBusy(false);
      window.setTimeout(() => input.current?.focus({ preventScroll: true }), 30);
    }, TYPE_MS);
  };

  // Skip the format question when a product page already chose it.
  const nextIndex = (from: number, f: string) => {
    let i = from + 1;
    if (STEPS[i]?.key === "format" && f) i++;
    return i;
  };

  const goTo = (i: number, l: Lead, f: string) => {
    setStep(i);
    if (i < STEPS.length) say(esc(STEPS[i].ask(l, f)), STEPS[i].chips || []);
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    session.current = newSessionId();
    const saved = loadLead();
    if (saved) {
      setLead(saved);
      setStep(-1);
      say(esc(`Welcome back, ${saved.first_name}. Shall I quote this for ${saved.company} again, at ${saved.email}?`), [
        "Yes, that's me",
        "Use different details",
      ]);
    } else {
      goTo(0, emptyLead, format);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy, chips]);

  const captureLead = (l: Lead) => {
    try {
      localStorage.setItem(LEAD_KEY, JSON.stringify(l));
    } catch {}
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: { name: `${l.first_name} ${l.last_name}`.trim(), company: l.company, email: l.email, phone: l.phone },
        answers: { stage: "contact", quoteSessionId: session.current, campaign, ...(preset || {}) },
        page: location.pathname,
      }),
    }).catch(() => {});
  };

  const engine = (t: string, l: Lead) => {
    setBusy(true);
    sendToQuoteEngine(session.current, t, l, campaign)
      .then((r) =>
        setMsgs((m) => [...m, { from: "wp", html: md(r.text), options: r.options }, ...(r.quote ? [{ from: "quote", quote: r.quote } as Msg] : [])]),
      )
      .catch(() => setMsgs((m) => [...m, { from: "error", retry: t }]))
      .finally(() => {
        setBusy(false);
        window.setTimeout(() => input.current?.focus({ preventScroll: true }), 30);
      });
  };

  // A message in the AI conversation.
  const ask = (t: string) => {
    t = t.trim();
    if (!t || busy) return;
    setMsgs((m) => [...m, { from: "you", text: t }]);
    setText("");
    engine(t, lead);
  };

  // The visitor already sees their product answer; the engine gets the full opener.
  const startAi = (l: Lead, f: string, product: string) => {
    setStep(STEPS.length);
    const opener = [
      `Hi, I'm ${l.first_name} from ${l.company}.`,
      f && f !== "Not sure yet" ? `I'm looking for ${f.toLowerCase()} for ${product}.` : `I need packaging for ${product}.`,
      preset?.situation ? `Context: ${preset.situation.toLowerCase()}.` : "",
    ]
      .join(" ")
      .trim();
    engine(opener, l);
  };

  // An answer to the intake question on screen.
  const answer = (raw: string) => {
    const v = raw.trim();
    if (busy) return;

    if (step === -1) {
      setMsgs((m) => [...m, { from: "you", text: v }]);
      setChips([]);
      if (v.startsWith("Yes")) {
        captureLead(lead);
        goTo(nextIndex(STEPS.findIndex((s) => s.key === "phone"), format), lead, format);
      } else {
        setLead(emptyLead);
        goTo(0, emptyLead, format);
      }
      return;
    }
    if (!current) return;
    const skip = !!current.optional && (v === "" || v === "Skip");
    if (!skip && !v) return;
    setMsgs((m) => [...m, { from: "you", text: skip ? "Skip" : v }]);
    setText("");
    setChips([]);

    const err = skip ? null : current.check?.(v) ?? null;
    if (err) {
      say(esc(err), current.chips || []);
      return;
    }

    let l = lead;
    let f = format;
    if (current.key === "name") {
      const [first, ...rest] = v.split(/\s+/);
      l = { ...lead, first_name: first, last_name: rest.join(" ") };
    } else if (current.key === "company") l = { ...lead, company: v };
    else if (current.key === "email") l = { ...lead, email: v };
    else if (current.key === "phone") {
      l = { ...lead, phone: skip ? "" : v };
      captureLead(l);
    } else if (current.key === "format") {
      f = FORMAT_CHIPS.find((c) => c.toLowerCase() === v.toLowerCase()) || v;
      setFormat(f);
    }
    setLead(l);

    if (current.key === "product") {
      startAi(l, f, v);
      return;
    }
    goTo(nextIndex(step, f), l, f);
  };

  const retry = (i: number, t: string) => {
    setMsgs((m) => m.filter((_, j) => j !== i));
    engine(t, lead);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inChat) ask(text);
    else answer(text);
  };

  const total = STEPS.length;
  const done = inChat ? total : Math.max(step, 0);
  const stepLabel = inChat ? "Your quote" : step === -1 ? "Welcome back" : `Question ${step + 1} of ${total}`;
  const placeholder = inChat ? "Reply…" : current?.placeholder || "Type your answer…";
  const inputType = !inChat && current?.type ? current.type : "text";
  const auto = { name: "name", company: "organization", email: "email", phone: "tel" } as Record<string, string>;
  const canSend = !busy && (text.trim().length > 0 || (!!current?.optional && !inChat));

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
          <small>{stepLabel}</small>
        </div>
        <div className="chat__progress" aria-hidden>
          <span style={{ transform: `scaleX(${Math.max(0.04, done / total)})` }} />
        </div>
      </header>

      <div className="chat__log" ref={log} aria-live="polite">
        {msgs.map((m, i) => {
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
                {lead.email && <span className="chat__sub">We have your details, so a specialist can follow up at {lead.email} either way.</span>}
              </Wp>
            );
          const last = i === msgs.length - 1;
          return (
            <Wp key={i} className="bubble--md">
              <div dangerouslySetInnerHTML={{ __html: m.html }} />
              {inChat && last && !busy && m.options && m.options.length > 0 && (
                <div className="chat__chips chat__chips--in">
                  {m.options.map((o) => (
                    <button key={o.label} className={`chat__chip ${o.rec ? "chat__chip--rec" : ""}`} onClick={() => ask(o.label)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </Wp>
          );
        })}

        {!inChat && !busy && chips.length > 0 && (
          <div className="chat__row chat__row--wp chat__row--card">
            <span className="chat__ava chat__ava--ghost" aria-hidden />
            <div className="chat__chips">
              {chips.map((c) => (
                <button type="button" key={c} className="chat__chip" onClick={() => answer(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {busy && (
          <Wp className="chat__typing">
            <i />
            <i />
            <i />
          </Wp>
        )}
      </div>

      <form className="chat__composer" onSubmit={submit} noValidate>
        <input
          ref={input}
          type={inputType}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete={(current && auto[current.key]) || "off"}
        />
        <button className="chat__send" type="submit" aria-label="Send" disabled={!canSend}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path d="M9 14V4M4.5 8.5 9 4l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}
