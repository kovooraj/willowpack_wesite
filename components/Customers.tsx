import Link from "next/link";
import { proof } from "@/lib/site";

export default function Customers() {
  const featured = proof.find((p) => p.quote)!;
  const rest = proof.filter((p) => p !== featured);
  return (
    <section className="section customers" id="customers" aria-labelledby="customers-h">
      <div className="wrap">
        <div className="customers__head">
          <div>
            <p className="eyebrow">Customers</p>
            <h2 id="customers-h" className="display display--md">
              Packaging our customers reorder
            </h2>
          </div>
          <p className="lede">Real jobs from our floor, told by the numbers we printed.</p>
        </div>

        <article className="feature">
          <Link href={featured.href} className="feature__pic m-zoom" aria-label={`${featured.product} for ${featured.client}`}>
            <img src={featured.thumb} alt="" loading="lazy" />
            <span className="feature__chip">{featured.format}</span>
          </Link>
          <div className="feature__body">
            <svg className="feature__mark" viewBox="0 0 48 36" aria-hidden="true">
              <path d="M0 36V20C0 8 6 1 18 0v7c-6 1-9 5-9 12h9v17H0Zm30 0V20c0-12 6-19 18-20v7c-6 1-9 5-9 12h9v17H30Z" fill="currentColor" />
            </svg>
            <blockquote className="feature__quote">{featured.quote}</blockquote>
            <p className="feature__by">
              <strong>{featured.client}</strong>
              <span>{featured.quoteBy}</span>
            </p>
            <p className="feature__story">{featured.story}</p>
            <Link href={featured.href} className="link feature__link">
              See {featured.product.toLowerCase()} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        <div className="cases">
          {rest.map((p) => (
            <Link href={p.href} className="case card" key={p.client}>
              <figure className="case__pic">
                <img src={p.thumb} alt="" loading="lazy" />
                <span className="case__chip">{p.product}</span>
              </figure>
              <div className="case__body">
                <p className="case__stat">
                  {p.stat}
                  <span>{p.statLabel}</span>
                </p>
                <h3 className="case__client">{p.client}</h3>
                <p>{p.story}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
