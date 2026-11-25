"use client";

import { useEffect, useRef, useState } from "react";
import { TalkButton } from "./Talk";

const steps = [
  {
    img: "/media/ch-prepress.jpg",
    alt: "Hands checking a carton proof beside a fan of colour swatches",
    title: "Prepress and proofing",
    text: "We check your dieline, fonts and colour, then send a digital proof. Physical samples are available before you approve.",
    tag: "Proof in your inbox",
  },
  {
    img: "/media/ch-press.jpg",
    alt: "A press operator lifting a printed sheet of carton layouts",
    title: "Printing",
    text: "HP Indigo presses print without plates, so a new SKU is a new file. Long carton runs move to our Heidelberg offset press.",
    tag: "Digital and offset",
  },
  {
    img: "/media/ch-finish.jpg",
    alt: "Glued cartons leaving the folder-gluer on a conveyor",
    title: "Finishing",
    text: "Lamination, die-cutting, folding and gluing, slitting and pouch making all run on equipment in our building.",
    tag: "Converted in-house",
  },
  {
    img: "/media/ch-ship.jpg",
    alt: "A wrapped pallet of cartons and a pallet of film rolls at the loading dock",
    title: "Packing and shipping",
    text: "Packed by version and labelled for your receiving team. Roll stock can stay with us and ship the next business day you call for it.",
    tag: "Ships in about 5 days",
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="process" id="process" aria-labelledby="process-h">
      <div className="wrap process__grid">
        <div className="process__copy">
          <header className="process__head">
            <p className="eyebrow">How an order runs</p>
            <h2 id="process-h" className="display display--md">
              Artwork in, pallets out. Every step under one roof.
            </h2>
          </header>
          <ol className="process__steps">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className={`pstep ${i === active ? "is-on" : ""}`}
              >
                <figure className="pstep__pic">
                  <img src={s.img} alt={s.alt} loading="lazy" width={1280} height={720} />
                </figure>
                <span className="pstep__num">0{i + 1}</span>
                <div>
                  <h3 className="pstep__title">{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="pstep__tag">{s.tag}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="process__end">
            <TalkButton variant="light">Start with a quote</TalkButton>
          </div>
        </div>
        <div className="process__media" aria-hidden="true">
          <div className="process__stage">
            {steps.map((s, i) => (
              <img key={s.img} src={s.img} alt="" className={i === active ? "is-on" : ""} loading="lazy" />
            ))}
            <div className="process__hud">
              <span>
                0{active + 1} <em>/ 04</em>
              </span>
              <span className="process__bar">
                <i style={{ transform: `scaleX(${(active + 1) / steps.length})` }} />
              </span>
              <span>{steps[active].title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
