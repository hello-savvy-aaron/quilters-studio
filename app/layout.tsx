import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quilters.studio"),
  title: {
    default: "Mary Anne Quilts",
    template: "%s — Mary Anne Quilts",
  },
  description:
    "Mary Anne Henderson — quilter, Marietta, Georgia. Fifty years of scraps: the quilts, the design process, and the journal.",
  openGraph: {
    title: "Mary Anne Quilts",
    description: "They stick to me like lint. Fifty years of scrap quilts, and the stories behind them.",
    url: "https://www.quilters.studio",
    siteName: "Mary Anne Quilts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSerif.variable}>
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
