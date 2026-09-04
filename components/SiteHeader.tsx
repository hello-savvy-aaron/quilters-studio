import Link from "next/link";

const links = [
  { href: "/#quilts", label: "Quilts" },
  { href: "/on-design", label: "On design" },
  { href: "/journal", label: "Journal" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 40,
          padding: "20px 0 15px",
          background: "var(--color-bg)",
        }}
      >
        <Link href="/" style={{ fontSize: 19, letterSpacing: "-0.01em", color: "var(--color-text)" }}>
          Mary Anne Quilts
        </Link>
        <nav
          className="nav-links"
          style={{ display: "flex", gap: 30, fontSize: 13, letterSpacing: "0.02em" }}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "var(--color-text)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" style={{ color: "var(--color-accent)" }}>
            Say hello
          </Link>
        </nav>
      </header>

      {/* Masthead strip — newspaper-style, shared by every page. */}
      <div id="top">
        <div style={{ height: 4, background: "var(--color-text)" }} />
        <div
          className="overline muted-60"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            padding: "8px 0",
            flexWrap: "wrap",
          }}
        >
          <span>Mary Anne Henderson · Quilter</span>
          <span>Marietta, Georgia</span>
          <span>Fifty years of scraps</span>
        </div>
        <div style={{ height: 1, background: "var(--color-text)" }} />
      </div>
    </>
  );
}
