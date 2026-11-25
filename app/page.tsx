import Link from "next/link";
import { products } from "@/lib/products";
import { stats, proof } from "@/lib/site";
import { TalkButton } from "@/components/Talk";
import { Reveal } from "@/components/Chrome";
import { Img, LoopVideo } from "@/components/Media";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__media">
          <LoopVideo src="/media/hero.mp4" poster="/media/hero-poster.jpg" />
        </div>
        <div className="wrap hero__content">
          <span className="eyebrow" style={{ color: "rgba(242,237,228,.7)" }}>
            Labels · Cartons · Pouches · Roll stock · Can labels
          </span>
          <h1 className="display display--xl" style={{ marginTop: 18 }}>
            Packaging,
            <br />
            made with
            <br />
            precision.
          </h1>
          <div className="hero__grid">
            <p>
              Willowpack prints and converts packaging for food and beverage brands that can't afford to miss a shelf date.
              Everything is digital and made in-house, so turnarounds are fast and the quality holds from run to run.
            </p>
            <div className="hero__actions">
              <TalkButton variant="light" />
              <Link href="/products" className="btn btn--ghost">
                Explore products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="strip" aria-hidden>
        <div className="strip__track">
          {[0, 1].map((k) =>
            ["HP Indigo digital print", "In-house lamination", "Pouch converting", "Laser die-cutting", "Fold & glue", "Managed inventory", "Made in Canada"].map(
              (t) => <span key={`${k}-${t}`}>{t}</span>,
            ),
          )}
        </div>
      </div>

      {/* Statement */}
      <section className="section">
        <div className="wrap">
          <Reveal className="statement">
            <span className="eyebrow">01 · Why Willowpack</span>
            <div>
              <h2 className="display display--lg">Fewer suppliers. Fewer surprises. Better packaging.</h2>
              <p className="lede" style={{ marginTop: 28 }}>
                We print, laminate, cut, fold and convert in our own facility. Fewer hand-offs means fewer delays, and
                there are no plate costs when you add a SKU.
              </p>
            </div>
          </Reveal>
          <Reveal className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat__value">{s.value}</div>
                <div className="stat__unit">{s.unit}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Who we build for — Tier A / Tier B */}
      <section className="section section--ink">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">02 · Who we work with</span>
            <h2 className="display display--lg" style={{ marginTop: 18, maxWidth: "16ch" }}>
              Built for brands with growing SKU lists.
            </h2>
          </Reveal>
          <Reveal className="split">
            <div className="split__col">
              <span className="eyebrow">Scaling portfolios</span>
              <h3 className="h3">Keep packaging running smoothly as your SKU count grows.</h3>
              <p>For operations and procurement teams managing retail distribution across many products.</p>
              <ul>
                <li>Combine cartons, labels and flexible packaging with one supplier</li>
                <li>Consistent production that keeps retail shelves stocked</li>
                <li>Managed inventory: we hold stock and ship the next business day</li>
                <li>Order what you need, without carrying excess packaging</li>
              </ul>
              <TalkButton variant="light" preset={{ situation: "Consolidating suppliers" }}>
                Simplify my packaging
              </TalkButton>
            </div>
            <div className="split__col">
              <span className="eyebrow">Launching & growing</span>
              <h3 className="h3">Launch new products without packaging risk.</h3>
              <p>For founders and brand leads bringing new SKUs to market.</p>
              <ul>
                <li>Low minimums, so you can test a SKU without tying up cash</li>
                <li>Packaging in days, so your launch date holds</li>
                <li>Retail-ready quality from your first order</li>
                <li>A specialist who works through the details with you, beyond the quote</li>
              </ul>
              <TalkButton variant="ghost" preset={{ situation: "Launching a new product" }}>
                Plan my launch
              </TalkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">03 · Products</span>
              <h2 className="display display--lg" style={{ marginTop: 18 }}>
                Five formats.
                <br />
                One partner.
              </h2>
            </div>
            <Link href="/products" className="link-arrow">
              All products →
            </Link>
          </Reveal>
          <ul className="plist">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug}>
                <Link href={`/products/${p.slug}`} className="prow">
                  <span className="prow__n">0{i + 1}</span>
                  <span className="prow__name">{p.name}</span>
                  <p>{p.short}</p>
                  <div className="prow__img">
                    <Img src={p.image} alt="" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Manufacturing band */}
      <section className="band">
        <LoopVideo src="/media/press.mp4" poster="/media/press-poster.jpg" />
        <div className="wrap">
          <Reveal>
            <span className="eyebrow" style={{ color: "rgba(242,237,228,.7)" }}>
              04 · Manufacturing
            </span>
            <h2 className="display display--lg" style={{ margin: "18px 0 24px" }}>
              Everything made under one roof.
            </h2>
            <p>
              HP Indigo digital presses, Heidelberg offset, Nordmeccanica lamination, Totani pouch making and laser
              die-cutting. Your packaging never leaves our facility until it ships to you.
            </p>
            <div className="spacer" />
            <Link href="/about" className="btn btn--light">
              How we work <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="section section--linen">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">05 · In practice</span>
              <h2 className="display display--lg" style={{ marginTop: 18 }}>
                Brands that count on us.
              </h2>
            </div>
          </Reveal>
          <Reveal className="proof">
            {proof.map((p) => (
              <article className="proof__item" key={p.client}>
                <span className="eyebrow">{p.format}</span>
                <h3>{p.client}</h3>
                <p>{p.story}</p>
                {p.quote && (
                  <blockquote>
                    “{p.quote}”<cite>{p.quoteBy}</cite>
                  </blockquote>
                )}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Cta />
    </>
  );
}
