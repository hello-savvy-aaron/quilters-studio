import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
import PageHero from "@/components/PageHero";
import PostForm from "./PostForm";

export const metadata: Metadata = {
  title: "New journal entry",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ admin?: string }>;
}) {
  const viaLink = (await searchParams).admin === "true";

  if (!viaLink && !(await isAdmin())) {
    return <PageHero title="Nothing to see here." />;
  }

  return (
    <>
      <PageHero kicker="Journal" title="Write a new entry" />
      <main className="container page-main">
        <div className="panel">
          <PostForm rememberBrowser={viaLink} storageReady={blobConfigured()} />
        </div>
      </main>
    </>
  );
}
