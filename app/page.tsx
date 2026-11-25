import Link from "next/link";
import { TalkButton } from "@/components/Talk";
import { LoopVideo } from "@/components/Media";
import ProductGrid from "@/components/ProductGrid";
import HeroReel from "@/components/HeroReel";
import LogoMarquee from "@/components/LogoMarquee";
import Process from "@/components/Process";
import Customers from "@/components/Customers";
import Industries from "@/components/Industries";

/* tasteskill plan
   kind: product (site-kind other). Main action: Get a quote.
   deal: own brand palette (bone, linen, clay, olive on espresso ink): earth tones for food packaging; Archivo + Inter.
   hero: film (client video), entrance once on load.
   products: the five formats as photographs, two large over three.
   marquee: customer names in type under the hero, no logo imitations.
   how-it-runs: sticky split, steps scroll on the left while the photograph changes on the right.
   industries: six categories, each with its photograph and formats.
   proof: one featured quote (the only real one) and three jobs by their real numbers.
   close: the quote conversation.
*/
export default function Home() {
  return (
    <>
      <section className="hero" data-enter>
        <LoopVideo className="hero__bg" src="/media/hero.mp4" poster="/media/hero-poster.jpg" />
        <div className="wrap hero__content">
          <div className="hero-text">
          <p className="eyebrow e-1" style={{ color: "rgba(242,237,228,.75)" }}>
            Willowpack · Ontario packaging manufacturer
          </p>
          <h1 className="display display--xl" style={{ marginTop: 18 }}>
            <span className="e-line">Packaging</span>
            <span className="e-line">for food and</span>
            <span className="e-line">drink brands</span>
          </h1>
          <div className="hero__grid">
            <p className="e-2">
              Labels, folding cartons, pouches, roll stock and can labels, printed and converted in our own plant. Most
              orders ship in about 5 business days.
            </p>
            <div className="hero__actions e-3">
              <TalkButton variant="light">Get a quote</TalkButton>
              <Link href="/products" className="btn btn--ghost">
                See the five formats
              </Link>
            </div>
          </div>
          <HeroReel />
          </div>
        </div>
      </section>

      <LogoMarquee />

      <section className="section screen products-sec" id="products" aria-labelledby="products-h">
        <div className="wrap">
          <div className="head-block">
            <p className="eyebrow">Products</p>
            <h2 id="products-h" className="display display--md" style={{ marginTop: 14 }}>
              Five formats from one plant
            </h2>
            <p className="lede">Buy cartons, labels and film from one supplier, and the colour matches across all of them.</p>
          </div>
          <ProductGrid />
        </div>
      </section>

      <Process />

      <Industries />

      <Customers />
    </>
  );
}
