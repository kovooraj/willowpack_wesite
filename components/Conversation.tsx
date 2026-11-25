"use client";

import { useEffect, useRef, useState } from "react";
import { steps, nextStepIndex, type Answers } from "@/lib/conversation";

type Msg = { from: "wp" | "you"; text: string };

export default function Conversation({ preset, compact }: { preset?: Partial<Answers>; compact?: boolean }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const scroller = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const presetKeys = useRef<Set<string>>(new Set());

  const say = (text: string, delay = 650) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "wp", text }]);
    }, delay);
  };

  // Opening lines, with optional preset (e.g. format chosen from a product page).
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const initial: Answers = { ...(preset as Answers) };
    presetKeys.current = new Set(Object.keys(initial));
    setMsgs([{ from: "wp", text: "Hi, I'm with the Willowpack packaging team. A few quick questions and we'll get a specialist on your project." }]);
    setAnswers(initial);
    let i = 0;
    while (i < steps.length && initial[steps[i].id]) i = nextStepIndex(i, initial);
    setIdx(i);
    say(steps[i].ask(initial), 900);
  }, [preset]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, status]);

  const step = steps[idx];

  const answer = (value: string, shown?: string) => {
    const a = { ...answers, [step.id]: value };
    setAnswers(a);
    setMsgs((m) => [...m, { from: "you", text: shown ?? (value || "Skip") }]);
    setText("");
    const n = nextStepIndex(idx, a);
    setIdx(n);
    if (n < steps.length) say(steps[n].ask(a));
  };

  const back = () => {
    // Undo the last answer: drop the last question + reply and re-ask the previous step.
    let prev = idx - 1;
    while (prev >= 0 && ((steps[prev].when && !steps[prev].when!(answers)) || presetKeys.current.has(steps[prev].id))) prev--;
    if (prev < 0) return;
    const a = { ...answers };
    delete a[steps[prev].id];
    setAnswers(a);
    setIdx(prev);
    setMsgs((m) => {
      const out = [...m];
      out.pop(); // current question
      out.pop(); // your previous reply
      return out;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, contact, page: typeof window !== "undefined" ? window.location.pathname : "" }),
      });
      if (!res.ok) throw new Error();
      setMsgs((m) => [...m, { from: "you", text: `${contact.name}, ${contact.company}` }]);
      setStatus("done");
      say(
        `Thanks, ${contact.name.split(" ")[0]}. A packaging specialist will email ${contact.email} within one business day with next steps, and samples if they'd help.`,
        700,
      );
    } catch {
      setStatus("error");
    }
  };

  const canSend = contact.name && contact.company && /\S+@\S+\.\S+/.test(contact.email);
  const total = steps.length;
  const progress = Math.min(idx, total) / total;

  return (
    <div className={`convo ${compact ? "convo--compact" : ""}`}>
      <div className="convo__bar" aria-hidden>
        <span style={{ transform: `scaleX(${status === "done" ? 1 : progress})` }} />
      </div>
      <div className="convo__log" ref={scroller} aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`bubble bubble--${m.from}`}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="bubble bubble--wp bubble--typing" aria-label="Typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>

      {!typing && status !== "done" && step && (
        <div className="convo__input">
          {step.kind === "choice" && (
            <div className="chips">
              {step.options!(answers).map((o) => (
                <button key={o} className="chip" onClick={() => answer(o)}>
                  {o}
                </button>
              ))}
            </div>
          )}

          {step.kind === "text" && (
            <form
              className="convo__text"
              onSubmit={(e) => {
                e.preventDefault();
                if (text.trim() || step.optional) answer(text.trim());
              }}
            >
              <input
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={step.placeholder}
                aria-label={step.ask(answers)}
              />
              <button className="btn btn--solid" type="submit" disabled={!text.trim() && !step.optional}>
                {text.trim() || !step.optional ? "Send" : "Skip"}
              </button>
            </form>
          )}

          {step.kind === "contact" && (
            <form className="convo__contact" onSubmit={submit}>
              <input required placeholder="Full name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
              <input required placeholder="Company" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
              <input required type="email" placeholder="Work email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              <input placeholder="Phone (optional)" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
              <button className="btn btn--solid" type="submit" disabled={!canSend || status === "sending"}>
                {status === "sending" ? "Sending…" : "Send to a specialist"}
              </button>
              {status === "error" && <p className="convo__err">That didn't go through. Please try again, or email us directly.</p>}
            </form>
          )}

          {idx > 0 && (
            <button className="convo__back" onClick={back}>
              ← Back
            </button>
          )}
        </div>
      )}
    </div>
  );
}
