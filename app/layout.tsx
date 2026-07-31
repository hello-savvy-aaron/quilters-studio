import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Mary Anne Quilts",
  description:
    "Mary Anne Henderson — quilter, Marietta, Georgia. Fifty years of scraps: the quilts, the design process, and the journal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
