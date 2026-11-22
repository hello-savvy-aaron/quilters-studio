import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
import { getAdminQuilt } from "@/lib/studio-quilts";
import PageHero from "@/components/PageHero";
import QuiltForm from "../../QuiltForm";

export const metadata: Metadata = {
  title: "Edit a quilt",
  robots: { index: false, follow: false },
};

export default async function EditQuiltPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) {
    return <PageHero title="Nothing to see here." />;
  }

  const quilt = await getAdminQuilt((await params).slug);
  if (!quilt) notFound();

  return (
    <>
      <PageHero
        kicker={
          <>
            <Link href="/admin#quilts">Admin</Link> · Edit a quilt
          </>
        }
        title={quilt.title}
      />
      <main className="container page-main">
        <div className="panel">
          <QuiltForm
            storageReady={blobConfigured()}
            editing={{
              slug: quilt.slug,
              fields: {
                title: quilt.title,
                story: quilt.body.join("\n\n"),
                quote: quilt.quote ?? "",
                dimensions: quilt.dimensions ?? "",
                year: quilt.year ?? "",
                meta: quilt.meta ?? "",
              },
              photos: quilt.photos.map((p) => ({ url: p.src, caption: p.alt })),
            }}
          />
        </div>
      </main>
    </>
  );
}
