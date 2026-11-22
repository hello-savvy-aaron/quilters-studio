import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
import { formatDate, getStudioPosts } from "@/lib/journal";
import RemoveButton from "../RemoveButton";
import PageHero from "@/components/PageHero";
import PostForm from "./PostForm";

export const metadata: Metadata = {
  title: "New journal entry",
  robots: { index: false, follow: false },
};

export default async function JournalAdminPage() {
  if (!(await isAdmin())) {
    return <PageHero title="Nothing to see here." />;
  }

  const posts = await getStudioPosts();

  return (
    <>
      <PageHero
        kicker={
          <>
            <Link href="/admin">Admin</Link> · Journal
          </>
        }
        title="Write a new entry"
      />
      <main className="container page-main">
        <div className="panel">
          <PostForm storageReady={blobConfigured()} />
        </div>

        {posts.length > 0 && (
          <div className="panel" style={{ marginTop: 32 }}>
            <h2 className="panel-heading">Entries written here</h2>
            <p className="muted admin-hint">Tap an entry to change its words or photos.</p>
            <ul className="admin-list">
              {posts.map((p) => (
                <li key={p.slug}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.images[0] && <img src={p.images[0]} alt="" />}
                  <Link href={`/admin/journal/${p.slug}`}>
                    {p.title}
                    <span className="muted admin-date">{formatDate(p.publishedAt)}</span>
                  </Link>
                  <span className="admin-photo-actions">
                    <Link href={`/admin/journal/${p.slug}`} className="btn btn-ghost">
                      Edit
                    </Link>
                    <RemoveButton
                      kind="post"
                      slug={p.slug}
                      label="Delete"
                      confirmText={`Delete “${p.title}”? Its photos will be deleted too.`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ marginTop: 32 }}>
          <Link href="/admin" className="btn btn-secondary">
            Quilts: add or edit
          </Link>
        </p>
      </main>
    </>
  );
}
