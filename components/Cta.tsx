import Conversation from "./Conversation";

export default function Cta() {
  return (
    <div className="cta__inner cta" id="quote">
        <div>
          <p className="eyebrow" style={{ color: "rgba(242,237,228,.75)" }}>
            Get a quote
          </p>
          <h2 id="quote-h" className="display display--md" style={{ marginTop: 14 }}>
            Tell us what you&apos;re packaging
          </h2>
          <p className="cta__lead">
            Share your details and the product. Our quote assistant prices it in a couple of minutes, and a packaging
            specialist reviews every quote before it&apos;s final.
          </p>
          <figure className="frame cta__photo">
            <img src="/media/pouches-detail.jpg" alt="The zipper and tear notch of an olive stand-up pouch" loading="lazy" width={1280} height={720} />
          </figure>
        </div>
        <div className="convo-frame convo-frame--cta">
          <Conversation campaign="website-cta" />
        </div>
    </div>
  );
}
