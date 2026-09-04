import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { familyStories, getFamilyStory } from "@/lib/family-stories";

type Params = { story: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return familyStories.map((s) => ({ story: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const s = getFamilyStory((await params).story);
  if (!s) return {};
  return { title: s.title, description: s.summary };
}

export default async function FamilyStoryPage({ params }: { params: Promise<Params> }) {
  const slug = (await params).story;
  const i = familyStories.findIndex((s) => s.slug === slug);
  if (i < 0) notFound();
  const story = familyStories[i];
  const newer = familyStories[i - 1];
  const older = familyStories[i + 1];

  return (
    <>
      <section className="page-head">
        <p className="kicker">
          <Link href="/family-stories" className="muted">
            Family stories
          </Link>{" "}
          · {story.date}
        </p>
        <h1 className="display-lg" style={{ maxWidth: "16ch", marginBottom: 36 }}>
          {story.title}
        </h1>
        <div className="prose story-body">
          {story.body.map((t) => (
            <p key={t.slice(0, 40)}>{t}</p>
          ))}
        </div>
      </section>

      <div className="rule" style={{ margin: "56px 0 20px" }} />
      <div className="story-nav">
        <span>
          {older && (
            <Link href={`/family-stories/${older.slug}`}>← {older.title}</Link>
          )}
        </span>
        <Link href="/family-stories" className="muted">
          All stories
        </Link>
        <span style={{ textAlign: "right" }}>
          {newer && (
            <Link href={`/family-stories/${newer.slug}`}>{newer.title} →</Link>
          )}
        </span>
      </div>
    </>
  );
}
