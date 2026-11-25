import Mark from "./Mark";
import { clients } from "@/lib/site";

/* Customer names set as type, never imitations of their logos. The list is
   rendered twice so the track can loop at -50% without a seam. */
export default function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.name} className={`marquee__name marquee__name--${c.style}`}>
          {c.name}
          <Mark size={10} className="marquee__sep" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="marquee" aria-label="Brands we package for">
      <div className="wrap marquee__inner">
        <p className="marquee__label">Packaging for brands like</p>
        <div className="marquee__view">
          <div className="marquee__track">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
