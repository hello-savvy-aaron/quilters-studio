import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
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
    return (
      <section className="page-head">
        <p className="muted">Nothing to see here.</p>
      </section>
    );
  }

  return (
    <section className="page-head">
      <p className="kicker">Journal</p>
      <h1 className="display-lg" style={{ marginBottom: 36 }}>
        Write a new entry
      </h1>
      <PostForm rememberBrowser={viaLink} storageReady={blobConfigured()} />
    </section>
  );
}
