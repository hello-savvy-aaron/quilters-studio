import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Figtree, Newsreader } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
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
