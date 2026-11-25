"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Mounts tasteskill moments (public/assets/moments) on every page, and again after client-side navigation.
type Loader = { mountAll: (root?: Document) => Promise<unknown>; unmountAll: (root?: Document) => void };
const LOADER = "/assets/moments/moments.js";

export default function Moments() {
  const path = usePathname();
  useEffect(() => {
    let mod: Loader | null = null;
    let gone = false;
    (window as unknown as { __momentsManual: boolean }).__momentsManual = true;
    import(/* webpackIgnore: true */ LOADER as string)
      .then((m: Loader) => {
        if (gone) return;
        mod = m;
        m.unmountAll(document);
        return m.mountAll(document);
      })
      .catch(() => document.documentElement.classList.add("mo-safe"));
    return () => {
      gone = true;
      mod?.unmountAll(document);
    };
  }, [path]);
  return null;
}
