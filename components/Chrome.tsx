"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { TalkButton } from "./Talk";
import Cta from "./Cta";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Willowpack home">
      <svg viewBox="0 0 28 28" width="22" height="22" aria-hidden>
        <path d="M3 6l5.5 16L14 9l5.5 13L25 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      </svg>
      WILLOWPACK
    </Link>
  );
}

export function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const overHero = path === "/" || path === "/about";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setMenu(false), [path]);

  return (
    <header className={`nav ${scrolled || !overHero ? "nav--solid" : ""} ${menu ? "nav--menu" : ""}`}>
      <div className="nav__inner">
        <Logo />
        <nav className="nav__links" aria-label="Primary">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={path.startsWith(n.href) ? "is-active" : ""} aria-current={path.startsWith(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <TalkButton variant="light">Get a quote</TalkButton>
        </div>
        <button className="nav__burger" onClick={() => setMenu(!menu)} aria-label="Menu" aria-expanded={menu}>
          <span />
          <span />
        </button>
      </div>
      <div className="nav__drawer">
        {site.nav.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
        <TalkButton variant="light">Get a quote</TalkButton>
      </div>
    </header>
  );
}

export function Footer() {
  const path = usePathname();
  const withQuote = path !== "/contact";
  return (
    <footer className={`footer closing ${withQuote ? "" : "closing--links"}`} aria-labelledby={withQuote ? "quote-h" : undefined}>
      <div className="wrap closing__wrap">
      {withQuote && <Cta />}
      <div className="footer__base">
        <span>© {new Date().getFullYear()} Willowpack · {site.location}</span>
        <nav className="footer__links" aria-label="Footer">
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </nav>
      </div>
      </div>
    </footer>
  );
}

export function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" | "li" }) {
  return <Tag className={className || undefined}>{children}</Tag>;
}

