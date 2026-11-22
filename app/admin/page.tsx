import type { Metadata } from "next";
import Link from "next/link";
import { adminIpsConfigured, clientIp, isAdmin } from "@/lib/admin";
import { blobConfigured } from "@/lib/blob-config";
import { getAdminQuilts } from "@/lib/studio-quilts";
import PageHero from "@/components/PageHero";
import { HELLO_SAVVY, HELLO_SAVVY_URL } from "@/lib/credits";
import QuiltForm from "./QuiltForm";
import RemoveButton from "./RemoveButton";

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

  const all = await getAdminQuilts();

  return (
    <>
      <PageHero kicker="Admin" title="Add a quilt" lede="Photos and its story. It goes on the home page, after the others." />
      <main className="container page-main">
        <div className="panel">
          <QuiltForm storageReady={blobConfigured()} />
        </div>

        <div className="panel" style={{ marginTop: 32 }} id="quilts">
          <h2 className="panel-heading">Quilts on the site</h2>
          <p className="muted admin-hint">Tap a quilt to change its photos, story or details.</p>
          <ul className="admin-list">
            {all.map((q) => (
              <li key={q.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {q.photos[0] && <img src={q.photos[0].src} alt="" />}
                <Link href={`/admin/quilts/${q.slug}`}>
                  {q.title}
                  {q.edited && <span className="chip admin-chip">Edited</span>}
                </Link>
                <span className="admin-photo-actions">
                  <Link href={`/admin/quilts/${q.slug}`} className="btn btn-ghost">
                    Edit
                  </Link>
                  {!q.builtIn && (
                    <RemoveButton
                      kind="quilt"
                      slug={q.slug}
                      label="Remove"
                      confirmText={`Take “${q.title}” off the site? Its photos will be deleted too.`}
                    />
                  )}
                  {q.edited && (
                    <RemoveButton
                      kind="quilt"
                      slug={q.slug}
                      label="Undo my edits"
                      confirmText={`Put “${q.title}” back the way it was originally? Your changes to it will be lost.`}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: 32 }}>
          <Link href="/admin/journal" className="btn btn-secondary">
            Journal entries: write or edit
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
