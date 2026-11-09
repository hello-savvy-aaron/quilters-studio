"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const path = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        Quilters Studio
      </Link>
      <nav className="nav-pill" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={path === l.href ? "here" : undefined} aria-current={path === l.href ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
