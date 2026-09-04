import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Source_Serif_4 } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quilters.studio"),
  title: {
    default: "Mary Anne Henderson — Studio",
    template: "%s — Mary Anne Henderson",
  },
  description:
    "Mary Anne Henderson — quilter, Marietta, Georgia. Fifty years of scraps: the quilts, the design process, and the journal.",
  openGraph: {
    title: "Mary Anne Henderson — Studio",
    description: "Fifty years of scrap quilts, and the stories behind them.",
    url: "https://www.quilters.studio",
    siteName: "Mary Anne Henderson Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable}`}>
      <body>
        <div className="shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
