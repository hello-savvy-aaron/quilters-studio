import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
import { getStudioPost } from "@/lib/journal";
import PageHero from "@/components/PageHero";
import PostForm from "../PostForm";

export const metadata: Metadata = {
  title: "Edit a journal entry",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return <PageHero title="Nothing to see here." />;
  }

  const post = await getStudioPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        kicker={
          <>
            <Link href="/admin/journal">Journal</Link> · Edit an entry
          </>
        }
        title={post.title}
      />
      <main className="container page-main">
        <div className="panel">
          <PostForm
            storageReady={blobConfigured()}
            editing={{ slug: post.slug, title: post.title, text: post.body.join("\n\n"), images: post.images }}
          />
        </div>
      </main>
    </>
  );
}
