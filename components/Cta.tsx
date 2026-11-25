import Conversation from "./Conversation";
import { site } from "@/lib/site";

const next = [
  { t: "Price breaks in minutes", d: "Our quote assistant prices most jobs during the chat." },
  { t: "A specialist checks it", d: "A packaging specialist reviews every quote before it's final." },
  { t: "Proof before print", d: "Digital proofs, and physical samples when you want them." },
];

export default function Cta() {
  return (
    <div className="cta__inner cta" id="quote">
      <div className="cta__copy">
        <p className="eyebrow cta__eyebrow">Get a quote</p>
        <h2 id="quote-h" className="display cta__title">
          Tell us what you&apos;re packaging
        </h2>
        <p className="cta__lead">Your details first, then the product. You&apos;ll see price breaks in about two minutes.</p>
        <ol className="cta__next">
          {next.map((n, i) => (
            <li key={n.t}>
              <span className="cta__num">0{i + 1}</span>
              <span>
                <strong>{n.t}</strong>
                {n.d}
              </span>
            </li>
          ))}
        </ol>
        <p className="cta__mail">
          Prefer email?{" "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </div>
      <div className="cta__card">
        <div className="cta__card-head">
          <span className="cta__mark" aria-hidden>
            <svg viewBox="0 0 28 28" width="18" height="18">
              <path d="M3 6l5.5 16L14 9l5.5 13L25 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <strong>Willowpack quote assistant</strong>
            <small>Pricing for labels, cartons, pouches, film and can labels</small>
          </span>
        </div>
        <div className="convo-frame convo-frame--cta">
          <Conversation campaign="website-cta" />
        </div>
      </div>
    </div>
  );
}
