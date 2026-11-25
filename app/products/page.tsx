import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { TalkButton } from "@/components/Talk";

export const metadata: Metadata = {
  title: "Products",
  description: "Labels, folding cartons, pouches, roll stock and cut & stack can labels, printed and converted in Willowpack's Ontario plant.",
};

export default function Products() {
  return (
    <>
      <section className="pd-hero pd-hero--index" data-enter>
        <div className="wrap">
          <div className="pd-hero__top">
            <div>
              <p className="eyebrow e-1">Products</p>
              <h1 className="display display--xl" style={{ marginTop: 18 }}>
                <span className="e-line">Five packaging</span>
                <span className="e-line">formats</span>
              </h1>
            </div>
            <div className="e-2">
              <p>
                Every format is printed digitally and finished on our own equipment, so one order can mix cartons,
                labels and film and the colour still matches.
              </p>
              <TalkButton variant="light" preset={{ format: "Not sure yet" }}>
                Help me choose a format
              </TalkButton>
            </div>
          </div>
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
