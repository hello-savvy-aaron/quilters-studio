import type { Metadata } from "next";
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
    "Mary Anne Henderson, quilter and glass artist in Marietta, Georgia. Scrap quilts, glass towers, and notes on design.",
  openGraph: {
    title: "Mary Anne Henderson — Studio",
    description: "Scrap quilts, glass towers, and notes on design, from Marietta, Georgia.",
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
      </body>
    </html>
  );
}
