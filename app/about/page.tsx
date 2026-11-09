import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fifty years of scraps: the quilts Mary Anne Henderson’s family asked to see shared, including work from Patchwork Quilts magazine and Georgia Bonesteel’s Quiltmaking Legacy.",
};

/*
  This copy is the introduction that used to sit at the top of the old Quilts page,
  moved here as-is. To add a photo, put it in public/ and fill in `photo` below;
  the right-hand column only appears when there is one.
*/
const photo: { src: string; alt: string } | null = null;

export default function About() {
  return (
    <>
      <PageHero title="About the studio" />
      <main className="container page-main">
        <article className="panel panel-split">
          <div className="panel-text">
            <p className="opening">Fifty years of scraps.</p>
            <p>
              The quilts here are the ones the family asked to see shared: a quilted car cover built by a guild, a
              3,500-piece scrap quilt made in one obsessive stretch, and work that has appeared in Patchwork Quilts
              magazine and in Georgia Bonesteel’s Quiltmaking Legacy.
            </p>
          </div>
          {photo && (
            <div className="panel-aside">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="about-photo" src={photo.src} alt={photo.alt} />
            </div>
          )}
        </article>
      </main>
    </>
  );
}
