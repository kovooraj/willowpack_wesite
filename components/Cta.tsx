import QuoteBox from "./QuoteBox";
import { Reveal } from "./Chrome";

export default function Cta() {
  return (
    <section className="cta">
      <div className="wrap cta__inner">
        <Reveal>
          <span className="eyebrow" style={{ color: "rgba(242,237,228,.7)" }}>
            Start a project
          </span>
          <h2 className="display display--lg" style={{ marginTop: 18 }}>
            Tell us what you're making.
          </h2>
        </Reveal>
        <Reveal>
          <p>Describe your project and get price breaks in seconds. A packaging specialist finalizes every quote.</p>
          <QuoteBox campaign="website-cta" />
        </Reveal>
      </div>
    </section>
  );
}
