import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <section className="page-head">
        <p className="kicker">
          <Link href="/journal" className="muted">
            Journal
          </Link>{" "}
          · {formatDate(post.publishedAt)}
        </p>
        <h1 className="display-lg" style={{ maxWidth: "16ch", marginBottom: 36 }}>
          {post.title}
        </h1>
        <div className="prose story-body">
          {post.body.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </section>

      {post.images.length > 0 && (
        <div style={{ display: "grid", gap: 32, marginTop: 56, maxWidth: 960 }}>
          {post.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${post.title}, photo ${i + 1}`} loading="lazy" />
          ))}
        </div>
      )}

      <div className="rule" style={{ margin: "56px 0 20px" }} />
      <Link href="/journal" className="muted">
        ← All entries
      </Link>
    </>
  );
}
