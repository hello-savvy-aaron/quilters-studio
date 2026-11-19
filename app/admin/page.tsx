import type { Metadata } from "next";
import Link from "next/link";
import { adminIpsConfigured, clientIp, isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
import { getStudioQuilts } from "@/lib/studio-quilts";
import PageHero from "@/components/PageHero";
import { HELLO_SAVVY, HELLO_SAVVY_URL } from "@/lib/credits";
import QuiltForm from "./QuiltForm";
import RemoveQuiltButton from "./RemoveQuiltButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    // Until ADMIN_IPS is set, show visitors their own address so it can be copied into Vercel.
    const ip = adminIpsConfigured() ? null : await clientIp();
    return (
      <PageHero
        title="Nothing to see here."
        lede={ip ? `Admin isn’t set up yet. Add ${ip} to ADMIN_IPS in Vercel to use this page from here.` : undefined}
      />
    );
  }

  const added = await getStudioQuilts();

  return (
    <>
      <PageHero kicker="Admin" title="Add a quilt" lede="Photos and its story. It goes on the home page, after the others." />
      <main className="container page-main">
        <div className="panel">
          <QuiltForm storageReady={blobConfigured()} />
        </div>

        {added.length > 0 && (
          <div className="panel" style={{ marginTop: 32 }}>
            <h2 className="panel-heading">Quilts added here</h2>
            <ul className="admin-list">
              {added.map((q) => (
                <li key={q.slug}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {q.photos[0] && <img src={q.photos[0].src} alt="" />}
                  <Link href={`/#${q.slug}`}>{q.title}</Link>
                  <RemoveQuiltButton slug={q.slug} title={q.title} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ marginTop: 32 }}>
          <Link href="/admin/journal" className="btn btn-secondary">
            Write a journal entry instead
          </Link>
        </p>
        <p className="muted admin-help">
          Something not working, or want a change to the site? Get in touch with{" "}
          <a href={HELLO_SAVVY_URL} target="_blank" rel="noopener">
            {HELLO_SAVVY}
          </a>
          , who designed it.
        </p>
      </main>
    </>
  );
}
