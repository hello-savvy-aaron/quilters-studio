import type { Metadata } from "next";
import Link from "next/link";
import { getJournalEntries } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Mary Anne Henderson's studio journal — the stories behind the work, from the blog at mahquilts.blogspot.com.",
};

export default async function Journal() {
  const entries = await getJournalEntries();

  return (
    <>
      <section className="page-head">
        <p className="kicker">Journal</p>
        <div className="section-head" style={{ alignItems: "flex-end" }}>
          <div>
            <h1 className="display-xl" style={{ maxWidth: "14ch", marginBottom: 20 }}>
              Notes from the studio.
            </h1>
            <p className="muted" style={{ fontSize: 16, maxWidth: "50ch", margin: 0 }}>
              The stories behind the work, with all the pictures.
            </p>
          </div>
          <a
            href="https://mahquilts.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, whiteSpace: "nowrap" }}
          >
            Older entries →
          </a>
        </div>
      </section>

      <div style={{ height: 24 }} />

      <div className="grid-journal">
        {entries.map((post) => {
          const inner = (
            <>
              <span className="eyebrow muted">{post.date}</span>
              <div className="entry-title">{post.title}</div>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}>
                {post.excerpt}
              </p>
            </>
          );
          return post.external ? (
            <a key={post.href} href={post.href} target="_blank" rel="noopener noreferrer" className="journal-entry">
              {inner}
            </a>
          ) : (
            <Link key={post.href} href={post.href} className="journal-entry">
              {inner}
            </Link>
          );
        })}
      </div>
    </>
  );
}
