import PageHero from "@/components/PageHero";
import QuiltIndex from "@/components/QuiltIndex";
import { getAllQuilts } from "@/lib/studio-quilts";

export default async function Home() {
  const quilts = await getAllQuilts();
  return (
    <>
      <PageHero
        title="Every quilt has a story. Here are a few."
        lede="I’m Mary Anne Henderson. I’ve been quilting for over fifty years, and my family urged me to share some of my favorites. So here they are."
      />
      <main>
        <QuiltIndex pieces={quilts} />
      </main>
    </>
  );
}
