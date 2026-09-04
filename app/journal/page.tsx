import type { Metadata } from "next";
import { journalPosts } from "@/lib/quilts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Mary Anne Henderson's studio journal — the stories behind the work, from the blog at mahquilts.blogspot.com.",
};

export default function Journal() {
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
              The stories behind the work. Each entry opens on the journal, where the full post and
              all the pictures live.
            </p>
          </div>
          <a
            href="https://mahquilts.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, whiteSpace: "nowrap" }}
          >
            All entries →
          </a>
        </div>
      </section>

      <div style={{ height: 24 }} />

      <div className="grid-journal">
        {journalPosts.map((post) => (
          <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer" className="journal-entry">
            <span className="eyebrow muted">{post.date}</span>
            <div className="entry-title">{post.title}</div>
            <p className="muted" style={{ fontSize: 14, margin: 0 }}>
              {post.excerpt}
            </p>
          </a>
        ))}
      </div>
    </>
  );
}
