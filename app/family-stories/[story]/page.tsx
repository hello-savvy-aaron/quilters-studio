import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
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
      <PageHero
        kicker={
          <>
            <Link href="/family-stories">Family stories</Link> · {story.date}
          </>
        }
        title={story.title}
      />
      <main className="container page-main">
        <article className="panel panel-reading">
          <div className="prose story-body">
            {story.body.map((t, i) =>
              typeof t === "string" ? (
                <p key={i}>{t}</p>
              ) : "heading" in t ? (
                <h2 key={i}>{t.heading}</h2>
              ) : (
                <figure key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.alt} loading="lazy" />
                  {t.caption && <figcaption>{t.caption}</figcaption>}
                </figure>
              ),
            )}
          </div>
        </article>
        <nav className="piece-nav" aria-label="More family stories">
          {older ? (
            <Link className="pill" href={`/family-stories/${older.slug}`}>
              <span aria-hidden="true">←</span> {older.title}
            </Link>
          ) : (
            <span />
          )}
          <Link className="pill" href="/family-stories">
            All stories
          </Link>
          {newer ? (
            <Link className="pill" href={`/family-stories/${newer.slug}`}>
              {newer.title} <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </>
  );
}
