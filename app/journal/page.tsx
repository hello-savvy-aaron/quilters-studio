import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getJournalEntries } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Mary Anne Henderson's studio journal — the stories behind the work, with all the pictures.",
};

export default async function Journal() {
  const entries = await getJournalEntries();

  return (
    <>
      <PageHero kicker="Journal" title="Notes from the studio." lede="The stories behind the work, with all the pictures." />
      <main className="container page-main">
        <div className="panel">
          <div className="grid-journal">
            {entries.map((post) => {
              const inner = (
                <>
                  <span className="eyebrow muted">{post.date}</span>
                  <div className="entry-title">{post.title}</div>
                  <p className="muted" style={{ fontSize: 15, margin: 0 }}>
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
        </div>
      </main>
    </>
  );
}
