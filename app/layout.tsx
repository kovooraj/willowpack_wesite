import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { TalkProvider } from "@/components/Talk";
import { Nav, Footer, RevealObserver } from "@/components/Chrome";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, images: ["/media/cartons.png"] },
};

export const viewport: Viewport = { themeColor: "#1c1915" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
          <RevealObserver />
        </TalkProvider>
      </body>
    </html>
  );
}
