"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publishedCollections } from "@/lib/collections";

const more = [
  { href: "/journal", label: "Journal" },
  { href: "/family-stories", label: "Family stories" },
  { href: "/on-design", label: "Talking Design" },
  // Collections appear here only while published (see lib/collections.ts).
  ...publishedCollections.map((c) => ({ href: `/${c.slug}`, label: c.title })),
];

export default function SiteFooter() {
  const path = usePathname();
  const invite = path !== "/contact" && !path.startsWith("/admin");

  return (
    <footer className="site-footer">
      {invite && (
        <div className="container footer-invite">
          <h2>Stuck on a design, or want to talk quilts? Talking ideas will probably yield inspiration.</h2>
          <Link className="cta cta-light" href="/contact">
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
      <div className="container footer-base">
        <Link href="/" className="wordmark">
          Quilters Studio
        </Link>
        <nav className="footer-links" aria-label="More from the studio">
          {more.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="footer-note">
          © {new Date().getFullYear()} Mary Anne Henderson · Site by{" "}
          <a href="https://hellosavvy.design" target="_blank" rel="noopener noreferrer">
            Hello Savvy
          </a>
        </p>
      </div>
    </footer>
  );
}
