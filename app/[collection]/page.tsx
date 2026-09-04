import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import Gallery from "@/components/Gallery";
import { collections, getCollection, pieceCount } from "@/lib/collections";

type Params = { collection: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return collections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getCollection((await params).collection);
  if (!c) return {};
  return { title: c.title, description: `${c.title} by Mary Anne Henderson. ${c.tagline}` };
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const c = getCollection((await params).collection);
  if (!c) notFound();

  const others = collections.filter((o) => o.slug !== c.slug);

  return (
    <>
      <section className="page-head">
        <p className="kicker">Collection</p>
        <div className="section-head" style={{ marginBottom: 24 }}>
          <h1 className="display-xl" style={{ maxWidth: "14ch" }}>
            {c.title}
          </h1>
          <span className="eyebrow muted">{pieceCount(c)}</span>
        </div>
        <div className="prose" style={{ maxWidth: "62ch" }}>
          {c.intro.map((t) => (
            <p key={t.slice(0, 40)}>{t}</p>
          ))}
        </div>
      </section>

      <div className="rule" style={{ margin: "48px 0" }} />

      {c.pieces.length > 0 ? (
        <Gallery pieces={c.pieces} noun={c.noun[0]} />
      ) : (
        <div className="empty-state">
          <CoverPlaceholder label="In progress" />
          <div>
            <h2 className="display-md">Coming soon</h2>
            <p className="prose" style={{ fontSize: 16, lineHeight: 1.7 }}>
              {c.emptyNote}
            </p>
            <p style={{ marginTop: 20 }}>
              <Link href="/#contact" style={{ fontSize: 14 }}>
                Ask about this work →
              </Link>
            </p>
          </div>
        </div>
      )}

      {others.length > 0 && (
        <section className="section">
          <div className="rule" style={{ marginBottom: 32 }} />
          <div className="section-head">
            <h2 className="kicker">Also</h2>
          </div>
          <ul className="list-plain">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/${o.slug}`}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>{o.title}</span>
                  <span className="eyebrow muted">{pieceCount(o)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
