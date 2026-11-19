import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// The font files live in app/fonts (SIL Open Font License) so builds don't depend on reaching Google Fonts.
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/newsreader-latin-300-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/newsreader-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-newsreader",
  fallback: ["Georgia", "serif"],
});

const figtree = localFont({
  src: [
    { path: "./fonts/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/figtree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/figtree-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-figtree",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quilters.studio"),
  title: {
    default: "Quilters Studio — Mary Anne Henderson",
    template: "%s — Quilters Studio",
  },
  description:
    "Mary Anne Henderson — quilter. Fifty years of scraps: the quilts, the design process, and the journal.",
  openGraph: {
    title: "Quilters Studio — Mary Anne Henderson",
    description: "Every quilt has a story. Fifty years of scrap quilts, and the stories behind them.",
    url: "https://www.quilters.studio",
    siteName: "Quilters Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${figtree.variable}`}>
      <body>
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
