import Link from "next/link";
import { products } from "@/lib/products";

// Two large photographs over three. Each card is a link: it lifts 2px and its photograph zooms inside the frame.
export default function ProductGrid() {
  return (
    <div className="pgrid">
      {products.map((p, i) => (
        <Link key={p.slug} href={`/products/${p.slug}`} className={`pcard card ${i > 1 ? "pcard--below" : ""}`}>
          <img src={p.image} alt={p.alt.image} loading="lazy" width={1280} height={720} />
          <span className="pcard__body">
            <span className="pcard__name">{p.name}</span>
            <span className="pcard__go" aria-hidden>
              <svg className="m-arrow" width="18" height="18" viewBox="0 0 18 18">
                <path d="M3 9h11M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
