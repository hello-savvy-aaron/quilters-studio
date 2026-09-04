import type { Metadata } from "next";
import { journalPosts } from "@/lib/quilts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Mary Anne Henderson's quilting journal — the stories behind the quilts, from the blog at mahquilts.blogspot.com.",
};

export default function Journal() {
  return (
    <section>
      <div className="page-head">
        <div>
          <h2 className="kicker">Journal</h2>
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 78px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
              maxWidth: "16ch",
              textWrap: "pretty",
            }}
          >
            The stories behind the quilts.
          </h1>
          <p className="muted-72" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: "52ch", margin: 0 }}>
            Each entry opens on the blog, where the full post and all the pictures live.
          </p>
        </div>
        <a
          href="https://mahquilts.blogspot.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, whiteSpace: "nowrap" }}
        >
          All posts on the blog →
        </a>
      </div>

      <div style={{ height: 1, background: "var(--color-text)", margin: "40px 0" }} />

      <div className="grid-journal">
        {journalPosts.map((post) => (
          <a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-text)" }}
          >
            <div className="overline" style={{ color: "var(--color-accent)", marginBottom: 8 }}>
              {post.date}
            </div>
            <div style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 8 }}>{post.title}</div>
            <p className="muted-72" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {post.excerpt}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
