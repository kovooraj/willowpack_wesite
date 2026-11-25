import Link from "next/link";
import { proof } from "@/lib/site";
import { TalkButton } from "@/components/Talk";
import { LoopVideo } from "@/components/Media";
import ProductGrid from "@/components/ProductGrid";
import HeroReel from "@/components/HeroReel";

/* tasteskill plan
   kind: product (site-kind other). Main action: Get a quote.
   deal: own brand palette (bone, linen, clay, olive on espresso ink): earth tones for food packaging; Archivo + Inter.
   hero: film (client video), entrance once on load.
   products: the five formats as photographs, two large over three.
   how-it-runs: moment photo-chapters, four steps of one order shown in the space of one screen.
   who: two buyers, each with its photograph.
   proof: customers by name, no figures invented.
   close: the quote conversation.
*/
const chapters = [
  {
    img: "/media/ch-prepress.jpg",
    alt: "Hands checking a carton proof beside a fan of colour swatches",
    title: "Prepress and proofing",
    text: "We check your dieline, fonts and colour, then send a digital proof. Physical samples are available before you approve.",
  },
  {
    img: "/media/ch-press.jpg",
    alt: "A press operator lifting a printed sheet of carton layouts",
    title: "Printing",
    text: "HP Indigo presses print without plates, so a new SKU is a new file. Long carton runs move to our Heidelberg offset press.",
  },
  {
    img: "/media/ch-finish.jpg",
    alt: "Glued cartons leaving the folder-gluer on a conveyor",
    title: "Finishing",
    text: "Lamination, die-cutting, folding and gluing, slitting and pouch making all run on equipment in our building.",
  },
  {
    img: "/media/ch-ship.jpg",
    alt: "A wrapped pallet of cartons and a pallet of film rolls at the loading dock",
    title: "Packing and shipping",
    text: "Packed by version and labelled for your receiving team. Roll stock can stay with us and ship the next business day you call for it.",
  },
];

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

      <section className="section chapters" id="process" data-moment="photo-chapters" aria-labelledby="process-h">
        <div className="wrap mo-ph">
          <div className="mo-ph__head">
            <h2 id="process-h">How an order runs</h2>
            <p>From your artwork to a pallet at your dock, every step happens in our building.</p>
          </div>
          <ol className="mo-ph__list">
            {chapters.map((c) => (
              <li className="mo-ph__ch" key={c.title}>
                <figure className="mo-ph__pic">
                  <img src={c.img} alt={c.alt} width={1280} height={720} loading="lazy" />
                </figure>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--linen screen" id="who" aria-labelledby="who-h">
        <div className="wrap">
          <p className="eyebrow">Who we work with</p>
          <h2 id="who-h" className="display display--md" style={{ margin: "14px 0 32px", maxWidth: "22ch" }}>
            Brands with growing product lines
          </h2>
          <div className="who">
            <article className="who__col">
              <Link href="/products/folding-cartons" className="frame m-zoom" aria-label="Folding cartons">
                <img src="/media/cartons-detail.jpg" alt="A stack of die-cut carton blanks ready to fold" loading="lazy" />
              </Link>
              <h3 className="h3">Packaging for a multi-SKU range</h3>
              <p>
                Operations and purchasing teams who ship to retail across many products. Put cartons, labels and
                flexible packaging with one supplier, and let us hold stock so you order what you need.
              </p>
              <TalkButton variant="solid" preset={{ situation: "Consolidating suppliers" }}>
                Plan a supplier switch
              </TalkButton>
            </article>
            <article className="who__col">
              <Link href="/products/pouches" className="frame m-zoom" aria-label="Pouches">
                <img src="/media/pouches-hand.jpg" alt="A coffee pouch and a snack pouch held up in sunlight" loading="lazy" />
              </Link>
              <h3 className="h3">Packaging for a product launch</h3>
              <p>
                Founders and brand leads bringing a product to shelf. Small first runs, packaging in days, and a
                specialist who checks the details with you before anything prints.
              </p>
              <TalkButton variant="solid" preset={{ situation: "Launching a new product" }}>
                Plan a launch
              </TalkButton>
            </article>
          </div>
        </div>
      </section>

      <section className="section screen" id="customers" aria-labelledby="customers-h">
        <div className="wrap">
          <p className="eyebrow">Customers</p>
          <h2 id="customers-h" className="display display--md" style={{ margin: "14px 0 32px", maxWidth: "22ch" }}>
            Packaging our customers reorder
          </h2>
          <div className="proof">
            {proof.map((p) => (
              <article className="proof__item" key={p.client}>
                <Link href={p.href} className="proof__thumb m-zoom" aria-label={p.product}>
                  <img src={p.thumb} alt="" loading="lazy" />
                </Link>
                <h3>{p.heading}</h3>
                <p className="proof__client">{p.client}</p>
                <p>{p.story}</p>
                {p.quote && (
                  <blockquote>
                    “{p.quote}”<cite>{p.quoteBy}</cite>
                  </blockquote>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
