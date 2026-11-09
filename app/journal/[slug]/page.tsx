import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { formatDate, getStudioPost } from "@/lib/journal";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = await getStudioPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.body[0]?.slice(0, 160) };
}

export default async function JournalPostPage({ params }: { params: Promise<Params> }) {
  const post = await getStudioPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        kicker={
          <>
            <Link href="/journal">Journal</Link> · {formatDate(post.publishedAt)}
          </>
        }
        title={post.title}
      />
      <main className="container page-main">
        <article className="panel panel-reading">
          <div className="prose story-body">
            {post.body.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          {post.images.length > 0 && (
            <div className="journal-photos">
              {post.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`${post.title}, photo ${i + 1}`} loading="lazy" />
              ))}
            </div>
          )}
        </article>
        <nav className="piece-nav" aria-label="Journal">
          <Link className="pill" href="/journal">
            <span aria-hidden="true">←</span> All entries
          </Link>
        </nav>
      </main>
    </>
  );
}
