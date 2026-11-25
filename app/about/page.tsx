import type { Metadata } from "next";
import { Reveal } from "@/components/Chrome";
import { Img, LoopVideo } from "@/components/Media";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "About",
  description: "Willowpack is a Canadian packaging manufacturer making labels, cartons and flexible packaging in-house for food and beverage brands.",
};

const equipment = [
  ["HP Indigo 18K, 200K & 6900", "Digital print for cartons, flexible packaging and labels"],
  ["Heidelberg Speedmaster CX102 & XL Perfector", "Offset print with UV coating for higher volumes"],
  ["Nordmeccanica Super Simplex", "Gloss, matte, soft-touch and high-barrier ALOx lamination"],
  ["Totani & Karlville pouch makers", "Stand-up and lay-flat pouch converting"],
  ["Karlville slitter", "Roll stock slit to width and wound to spec"],
  ["ABG Digilase", "Laser and rotary label die-cutting"],
  ["Diana Easy 115-C folder-gluer", "Carton folding and gluing"],
];

const values = [
  {
    t: "Reliability",
    d: "Packaging matters because it holds your launch dates and retail slots. We plan production around your calendar and tell you early if anything changes.",
  },
  {
    t: "Craft",
    d: "Colour, registration and finish are checked on every run, and your second order should match your first. Digital previews and physical samples come standard.",
  },
  {
    t: "Partnership",
    d: "We spend time understanding your product, your line and your retailers before we recommend anything, and then we help you work through the details.",
  },
];

export default function About() {
  return (
    <>
      <section className="hero hero--short">
        <div className="hero__media">
          <LoopVideo src="/media/press.mp4" poster="/media/press-poster.jpg" />
        </div>
        <div className="wrap hero__content">
          <span className="eyebrow" style={{ color: "rgba(242,237,228,.7)" }}>
            About Willowpack
          </span>
          <h1 className="display display--xl" style={{ marginTop: 18 }}>
            Made here.
            <br />
            Made right.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap twocol">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="display display--md" style={{ margin: "18px 0 24px" }}>
              A packaging manufacturer, not a broker.
            </h2>
            <p className="lede">
              Willowpack was set up to fix a common problem for food and beverage brands: too many suppliers, long lead
              times and large minimums that tie up cash.
            </p>
            <p className="lede">
              We bought the presses, laminators and converting lines and brought everything in-house. Because all print
              is digital, there are no plates to make, so adding a new SKU or reordering a small run costs much less.
            </p>
          </Reveal>
          <Reveal>
            <Img src="/media/facility.png" alt="A Willowpack press operator inspecting printed carton sheets" />
          </Reveal>
        </div>
      </section>

      <section className="section section--linen">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What we stand for</span>
          </Reveal>
          <div className="spacer" style={{ height: 40 }} />
          <Reveal className="values">
            {values.map((v, i) => (
              <div key={v.t}>
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="display display--md">{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap twocol" style={{ alignItems: "start" }}>
          <Reveal>
            <span className="eyebrow">The floor</span>
            <h2 className="display display--lg" style={{ marginTop: 18 }}>
              Our own equipment.
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Every format runs on equipment we own and operate, from the first print to the finished pallet.
            </p>
          </Reveal>
          <Reveal>
            <ul className="equip">
              {equipment.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Cta />
    </>
  );
}
