import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { Reveal } from "@/components/Chrome";
import { Img } from "@/components/Media";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Products",
  description: "Labels, folding cartons, pouches, roll stock and cut & stack can labels, all made in-house by Willowpack.",
};

export default function Products() {
  return (
    <>
      <section className="pd-hero">
        <div className="wrap">
          <div className="pd-hero__top">
            <div>
              <span className="eyebrow">Products</span>
              <h1 className="display display--xl" style={{ marginTop: 18 }}>
                Every format.
                <br />
                One standard.
              </h1>
            </div>
            <p>
              Labels, cartons, pouches, roll stock and can labels are all printed digitally and finished in our own
              facility. You can combine formats under one supplier and know the colour will match across all of them.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--ink" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="pgrid">
            {products.map((p, i) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="pcard">
                <Img src={p.image} alt={`${p.name} by Willowpack`} />
                <span className="eyebrow">0{i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <Reveal className="statement">
            <span className="eyebrow">Not sure which format?</span>
            <div>
              <h2 className="display display--md" style={{ maxWidth: "20ch" }}>
                Tell us about the product and we'll recommend the right packaging.
              </h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Contents, fill weight, shelf life, filling equipment and retail environment all affect which format and
                material make sense. Our specialists work through those details with you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <Cta />
    </>
  );
}
