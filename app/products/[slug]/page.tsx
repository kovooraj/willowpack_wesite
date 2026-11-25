import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { FORMATS } from "@/lib/conversation";
import { TalkButton } from "@/components/Talk";
import { Reveal } from "@/components/Chrome";
import { Img } from "@/components/Media";
import Cta from "@/components/Cta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.short } : {};
}

// Map product page → conversation format option so the chat skips that question.
const formatFor: Record<string, string> = {
  labels: "Labels",
  "folding-cartons": "Folding cartons",
  pouches: "Pouches",
  "roll-stock": "Roll stock",
  "can-labels": "Cut & stack can labels",
};

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const idx = products.findIndex((x) => x.slug === slug);
  const next = products[(idx + 1) % products.length];
  const format = FORMATS.includes(formatFor[slug]) ? formatFor[slug] : undefined;

  return (
    <>
      <section className="pd-hero">
        <div className="wrap">
          <nav className="crumbs eyebrow" aria-label="Breadcrumb">
            <Link href="/products">Products</Link>
            <span>/</span>
            <span style={{ color: "var(--bone)" }}>{p.name}</span>
          </nav>
          <div className="pd-hero__top">
            <h1 className="display display--lg">{p.name}</h1>
            <div>
              <p>{p.intro}</p>
              <TalkButton variant="light" preset={format ? { format } : undefined}>
                Quote {p.name.toLowerCase()}
              </TalkButton>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="pd-hero__img">
            <Img src={p.image} alt={`${p.name} produced by Willowpack`} />
          </div>
        </div>
        <div className="spacer" style={{ height: 80 }} />
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="display display--md" style={{ maxWidth: "22ch", marginBottom: 56 }}>
              {p.headline}
            </h2>
          </Reveal>
          <Reveal className="specs">
            <span className="eyebrow">Specifications</span>
            <dl>
              {p.specs.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="spacer" style={{ height: 64 }} />
          <Reveal className="specs">
            <span className="eyebrow">Best for</span>
            <div className="tags">
              {p.bestFor.map((b) => (
                <span className="tag" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <Reveal className="caps">
            {p.capabilities.slice(0, 3).map((c, i) => (
              <div className="cap" key={c}>
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="h3">{c}</h3>
              </div>
            ))}
          </Reveal>
          <div className="spacer" style={{ height: 56 }} />
          <Link href={`/products/${next.slug}`} className="link-arrow">
            Next: {next.name} →
          </Link>
        </div>
      </section>

      <Cta />
    </>
  );
}
