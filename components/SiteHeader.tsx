import Link from "next/link";
import { collections } from "@/lib/collections";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        Mary Anne Henderson
        <span className="wordmark-tag">Studio</span>
      </Link>
      <nav className="nav-links">
        {collections.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`}>
            {c.title}
          </Link>
        ))}
        <Link href="/on-design">On design</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="nav-cta">
          Contact
        </Link>
      </nav>
    </header>
  );
}
