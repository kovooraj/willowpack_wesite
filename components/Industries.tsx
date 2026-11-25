import { industries } from "@/lib/site";
import { TalkButton } from "./Talk";

export default function Industries() {
  return (
    <section className="section industries" id="industries" aria-labelledby="industries-h">
      <div className="wrap">
        <div className="customers__head">
          <div>
            <p className="eyebrow">Industries</p>
            <h2 id="industries-h" className="display display--md">
              Made for the shelves we know best
            </h2>
          </div>
          <p className="lede">Barrier films, finishes and formats chosen for what goes inside, not just how it looks.</p>
        </div>
        <ul className="ind">
          {industries.map((it, i) => (
            <li className="ind__card" key={it.name}>
              <figure className="ind__pic">
                <img src={it.img} alt={it.alt} loading="lazy" />
              </figure>
              <div className="ind__body">
                <span className="ind__num">0{i + 1}</span>
                <h3 className="ind__name">{it.name}</h3>
                <p>{it.text}</p>
                <ul className="ind__formats" aria-label="Formats">
                  {it.formats.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="ind__foot">
          <p>Also frozen foods, sauces, canned goods and private label. If it ships in a carton, pouch or label, ask us.</p>
          <TalkButton variant="solid">Talk through your category</TalkButton>
        </div>
      </div>
    </section>
  );
}
