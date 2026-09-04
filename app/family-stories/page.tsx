import type { Metadata } from "next";
import Link from "next/link";
import { familyStories } from "@/lib/family-stories";

export const metadata: Metadata = {
  title: "Family stories",
  description: "Mary Anne Henderson's record of the family history, written down as she remembers it.",
};

export default function FamilyStories() {
  return (
    <>
      <section className="page-head">
        <p className="kicker">Family stories</p>
        <h1 className="display-xl" style={{ maxWidth: "14ch", marginBottom: 20 }}>
          Written down while I remember.
        </h1>
        <p className="muted" style={{ fontSize: 16, maxWidth: "52ch", margin: 0 }}>
          I&apos;m putting down as much of our family&apos;s history as I can, a story at a time. New
          ones are added here as they&apos;re written.
        </p>
      </section>

      <div className="rule" style={{ margin: "48px 0 0" }} />

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
    </>
  );
}
