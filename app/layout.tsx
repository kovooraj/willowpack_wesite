import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { TalkProvider } from "@/components/Talk";
import { Nav, Footer } from "@/components/Chrome";
import Moments from "@/components/Moments";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, images: ["/media/cartons.jpg"] },
};

export const viewport: Viewport = { themeColor: "#1c1915" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-type="product" data-motion suppressHydrationWarning>
      <head>
        {/* tasteskill: hero entrance + moment loader flags (references/motion.md, moments.md) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('m-enter','mo-js');window.__momentsManual=true;setTimeout(function(){document.documentElement.classList.add('m-enter-done')},1400);setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500)",
          }}
        />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <meta name="site-kind" content="other" />
        <meta name="page-type" content="product" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TalkProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <Moments />
          <script type="module" src="/assets/motion/motion.js" async />
        </TalkProvider>
      </body>
    </html>
  );
}
