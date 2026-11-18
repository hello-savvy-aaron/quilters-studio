import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
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
      </main>
    </>
  );
}
