import type { Metadata } from "next";
import DesignWall from "@/components/DesignWall";
import { journalPosts } from "@/lib/quilts";

export const metadata: Metadata = {
  title: "On design",
  description:
    "Where the ideas for a quilt come from, and how they get auditioned on the design wall. Mary Anne Henderson on the design process.",
};

export default function OnDesign() {
  const designPosts = journalPosts.filter((p) => p.title.startsWith("Dynamic Design"));

  return (
    <section className="grid-essay">
      <div>
        <p className="kicker">On design · An essay</p>
        <h1 className="display-xl" style={{ maxWidth: "12ch", marginBottom: 32 }}>
          They stick to me like lint.
        </h1>
        <p className="lead" style={{ marginBottom: 20 }}>
          In the back of my mind, I&apos;m always collecting bits and images to use in a quilt.
          Often it&apos;s a simple thing, like the perfect gold streak in a salmon sky. Or the joy of
          a small school with kids playing in the yard.
        </p>
        <p className="lead" style={{ marginBottom: 48 }}>
          Then, one day, these bits begin to join hands.
        </p>

        <p className="quote" style={{ marginBottom: 28 }}>
          When people see my quilts, the thing they ask is, &ldquo;How do you get those
          ideas?&rdquo;
        </p>
        <div className="prose">
          <p>
            Whatever you are working on, be it a dance, a song or a computer program, the design
            process is much the same. But I&apos;m about quilts, so here&apos;s what works for me.
          </p>
          <p>
            My interest in quilts is a constant preoccupation. I may brood on an idea for a long
            time. The list of people, places and things I can steal for a quilt is endless. Then one
            day these bits begin to join hands, and I go looking in my mind stash for other things I
            can use — colors, effects. I audition them on my design wall, or lay them out on the bed,
            and I&apos;m up and running.
          </p>
          <p>
            It helps to have a little time, quiet and space. Hopefully the quilt begins to talk to
            you. Genius will strike. Or not — in which case you start again, or put it aside until
            the creative wave sweeps along. I find a small glass of wine helps, and if that
            doesn&apos;t produce a genius idea, you don&apos;t mind.
          </p>
          <p className="muted">Like all design, and all projects really: a series of small decisions.</p>
        </div>
      </div>

      <div className="essay-aside">
        <DesignWall />
        <div style={{ marginTop: 48 }}>
          <h2 className="kicker" style={{ marginBottom: 8 }}>
            Related entries
          </h2>
          <div style={{ display: "grid", gap: 20 }}>
            {designPosts.map((post) => (
              <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer" className="journal-entry">
                <span className="eyebrow muted">{post.date}</span>
                <div className="entry-title" style={{ fontSize: 20 }}>{post.title}</div>
                <p className="muted" style={{ fontSize: 14, margin: 0 }}>
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
