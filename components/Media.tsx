"use client";

import { useEffect, useRef, useState } from "react";

// Image that quietly disappears if the file is missing, letting the CSS background show.
// Also checks after hydration, since a load error can fire before React attaches onError.
export function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={() => setOk(false)} />;
}

export function LoopVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  return <video className={className} src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden />;
}
