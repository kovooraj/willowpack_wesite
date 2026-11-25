import type { Metadata } from "next";
import { LoopVideo } from "@/components/Media";

export const metadata: Metadata = {
  title: "About",
  description: "Willowpack is an Ontario packaging manufacturer that prints and converts labels, cartons and flexible packaging in-house for food and drink brands.",
};

const equipment = [
  ["HP Indigo 18K, 200K and 6900", "Digital print for cartons, flexible packaging and labels"],
  ["Heidelberg Speedmaster CX102 and XL Perfector", "Offset print with UV coating for long runs"],
  ["Nordmeccanica Super Simplex", "Gloss, matte, soft-touch and high-barrier ALOx lamination"],
  ["Totani and Karlville pouch makers", "Stand-up and lay-flat pouch converting"],
  ["Karlville slitter", "Roll stock slit to width and wound to your spec"],
  ["ABG Digilase", "Laser and rotary label die-cutting"],
  ["Diana Easy 115-C folder-gluer", "Carton folding and gluing"],
];

/* tasteskill plan (about)
   hero: the press film, entrance once.
   story: who we are beside the press operator photograph.
   statement: moment word-highlight, the one idea that explains the business (no plates).
   floor: the equipment list beside the shipping photograph.
*/
export default function About() {
  return (
    <>
      <section className="hero hero--short" data-enter>
        <LoopVideo className="hero__bg" src="/media/press.mp4" poster="/media/press-poster.jpg" />
        <div className="wrap hero__content">
          <div className="hero-text">
          <p className="eyebrow e-1" style={{ color: "rgba(242,237,228,.75)" }}>
            About Willowpack
          </p>
          <h1 className="display display--xl" style={{ marginTop: 18 }}>
            <span className="e-line">A packaging plant</span>
            <span className="e-line">in Ontario</span>
          </h1>
          </div>
        </div>
      </section>

      <section className="section screen" aria-labelledby="story-h">
        <div className="wrap twocol">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story-h" className="display display--md" style={{ margin: "14px 0 24px" }}>
              We make the packaging we sell
            </h2>
            <p className="lede">
              Food and drink brands told us the same things: too many suppliers, six-week lead times and minimums that
              tied up cash.
            </p>
            <p className="lede">
              So we put the presses, the laminator, the die-cutters and the pouch makers in one building. Your order
              moves from file to pallet without leaving it.
            </p>
          </div>
          <figure className="frame">
            <img src="/media/facility.jpg" alt="A press operator inspecting printed carton sheets at a light table" width={1280} height={720} />
          </figure>
        </div>
      </section>

      <section className="section section--linen statement screen" data-moment="word-highlight" aria-label="How we print">
        <div className="wrap">
          <p className="eyebrow">How we print</p>
          <p className="mo-wh__text">
            Our presses print without plates. A new flavour, a seasonal label or a corrected typo is a new file, so a
            short run costs what it should and <strong>your reorder matches</strong> the last one.
          </p>
        </div>
      </section>

      <section className="section section--ink screen" aria-labelledby="floor-h">
        <div className="wrap twocol" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">The equipment</p>
            <h2 id="floor-h" className="display display--md" style={{ margin: "14px 0 32px" }}>
              What runs on our floor
            </h2>
            <ul className="equip">
              {equipment.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="frame frame--tall">
            <img src="/media/ch-ship.jpg" alt="A wrapped pallet of cartons and a pallet of film rolls at the loading dock" loading="lazy" width={1280} height={720} />
          </figure>
        </div>
      </section>

    </>
  );
}
