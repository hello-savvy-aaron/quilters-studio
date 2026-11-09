import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import PageHero from "@/components/PageHero";
import QuiltIndex from "@/components/QuiltIndex";
import { getCollection, pieceCount, publishedCollections } from "@/lib/collections";

type Params = { collection: string };

// Only published collections get a page; everything else is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return publishedCollections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getCollection((await params).collection);
  if (!c) return {};
  return { title: c.title, description: `${c.title} by Mary Anne Henderson. ${c.tagline}` };
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const c = getCollection((await params).collection);
  if (!c) notFound();

  return (
    <>
      <PageHero kicker={pieceCount(c)} title={c.title} lede={c.tagline} />
      <main>
        {c.pieces.length > 0 ? (
          <QuiltIndex pieces={c.pieces} />
        ) : (
          <div className="container page-main">
            <div className="panel panel-split">
              <div className="panel-aside">
                <CoverPlaceholder label="In progress" />
              </div>
              <div className="panel-text">
                <h2 className="panel-heading">Coming soon</h2>
                <p>{c.emptyNote}</p>
                <p>
                  <Link className="cta" href="/contact">
                    Ask about this work <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
