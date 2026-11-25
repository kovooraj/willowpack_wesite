"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The hero film is a reel of one shot per format (scripts/make-reel.sh, SEG 3s, FADE 0.6s).
// This legend names the format on screen and links to it; the bar under it fills with the shot.
const SEG = 3;
const FADE = 0.6;
const STEP = SEG - FADE; // 2.4s of reel per shot
export const REEL = [
  { name: "Roll stock", href: "/products/roll-stock" },
  { name: "Labels", href: "/products/labels" },
  { name: "Folding cartons", href: "/products/folding-cartons" },
  { name: "Pouches", href: "/products/pouches" },
  { name: "Cut & stack labels", href: "/products/can-labels" },
];

export default function HeroReel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(".hero__bg");
    if (!video) return;
    const tick = () => {
      // shot k takes over at the middle of the crossfade into it
      const t = video.currentTime + FADE / 2;
      const k = Math.floor(t / STEP);
      setActive(k % REEL.length);
      setProgress(Math.min(1, (t - k * STEP) / STEP));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <nav className="reel" aria-label="Packaging formats in the film">
      <ol>
        {REEL.map((r, i) => (
          <li key={r.name} className={i === active ? "is-on" : ""}>
            <Link href={r.href}>
              <span className="reel__n">0{i + 1}</span>
              <span className="reel__name">{r.name}</span>
              <span className="reel__bar" aria-hidden>
                <span style={{ transform: `scaleX(${i === active ? progress : 0})` }} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
