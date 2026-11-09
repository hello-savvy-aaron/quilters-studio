import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { familyStories } from "@/lib/family-stories";

export const metadata: Metadata = {
  title: "Family stories",
  description: "Mary Anne Henderson's record of the family history, written down as she remembers it.",
};

export default function FamilyStories() {
  return (
    <>
      <PageHero
        kicker="Family stories"
        title="Written down while I remember."
        lede="I’m putting down as much of our family’s history as I can, a story at a time. New ones are added here as they’re written."
      />
      <main className="container page-main">
        <div className="panel">
          <ul className="list-plain">
            {familyStories.map((s) => (
              <li key={s.slug}>
                <Link href={`/family-stories/${s.slug}`} className="story-row">
                  <span className="eyebrow muted">{s.date}</span>
                  <span>
                    <span className="entry-title" style={{ display: "block", margin: "0 0 6px" }}>
                      {s.title}
                    </span>
                    <span className="muted" style={{ fontSize: 15 }}>
                      {s.summary}
                    </span>
                  </span>
                  <span className="muted" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
