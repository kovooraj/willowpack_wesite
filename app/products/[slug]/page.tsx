import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { TalkButton } from "@/components/Talk";

type Params = { params: Promise<{ slug: string }> };

// "Many SKUs per run" → "many SKUs per run"; leaves acronyms ("HP Indigo") alone.
const lowerFirst = (t: string) => (/^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.short, openGraph: { images: [p.image] } } : {};
}

// Product page → the quote chat's format chip, so that question is already answered.
const formatFor: Record<string, string> = {
  labels: "Labels",
  "folding-cartons": "Folding cartons",
  pouches: "Pouches",
  "roll-stock": "Roll stock",
  "can-labels": "Cut & stack can labels",
};

/* tasteskill plan (product page)
   hero: the product big (picture-develops moment: the photograph develops once as it comes on screen).
   specs: the facts beside a close-up of the product.
   in-use: the product on the line or in the hand, a different picture.
   next: the next format, then the quote conversation.
*/
export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const idx = products.findIndex((x) => x.slug === slug);
  const next = products[(idx + 1) % products.length];

  return (
    <>
      <section className="pd-hero" data-enter>
        <div className="wrap">
          <nav className="crumbs eyebrow" aria-label="Breadcrumb">
            <Link href="/products" className="link">
              Products
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" style={{ color: "var(--bone)" }}>
              {p.name}
            </span>
          </nav>
          <div className="pd-hero__top">
            <h1 className="display display--lg">
              <span className="e-line">{p.name}</span>
            </h1>
            <div className="e-2">
              <p>{p.intro}</p>
              <TalkButton variant="light" preset={{ format: formatFor[slug] }}>
                Quote {p.name.toLowerCase()}
              </TalkButton>
            </div>
          </div>
        </div>
        <div className="wrap">
          <figure className="pd-hero__img develop" data-moment="picture-develops">
            <img src={p.image} alt={p.alt.image} width={1280} height={720} />
          </figure>
        </div>
      </section>

      <section className="section screen" aria-labelledby="specs-h">
        <div className="wrap specs-split">
          <div>
            <p className="eyebrow">Specifications</p>
            <h2 id="specs-h" className="display display--md" style={{ margin: "14px 0 32px", maxWidth: "20ch" }}>
              {p.headline}
            </h2>
            <dl className="specs-list">
              {p.specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="tags" aria-label="Typical uses">
              {p.bestFor.map((b) => (
                <li className="tag" key={b}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <figure className="frame frame--tall">
            <img src={p.detail} alt={p.alt.detail} loading="lazy" width={1280} height={720} />
          </figure>
        </div>
      </section>

      <section className="section section--linen screen" aria-labelledby="use-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Made in our plant</p>
              <h2 id="use-h" className="display display--md" style={{ marginTop: 14, maxWidth: "22ch" }}>
                {p.capabilities[0]}, {lowerFirst(p.capabilities[1])}
              </h2>
            </div>
            <Link href={`/products/${next.slug}`} className="link link--strong">
              Next: {next.name}
            </Link>
          </div>
          <figure className="frame frame--wide">
            <img src={p.inUse} alt={p.alt.inUse} loading="lazy" width={1280} height={720} />
          </figure>
        </div>
      </section>

    </>
  );
}
