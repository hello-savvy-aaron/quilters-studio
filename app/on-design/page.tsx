import type { Metadata } from "next";
import DesignWall from "@/components/DesignWall";
import { journalPosts } from "@/lib/quilts";

export const metadata: Metadata = {
  title: "On design",
  description:
    "Where the ideas for a quilt come from, and how they get auditioned on the design wall. Mary Anne Henderson on the design process.",
};

const paragraph = { fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" } as const;

export default function OnDesign() {
  const designPosts = journalPosts.filter((p) => p.title.startsWith("Dynamic Design"));

  return (
    <>
      <section className="grid-essay">
        <div>
          <h2 className="kicker">On design</h2>
          <h1
            style={{
              fontSize: "clamp(46px, 6vw, 98px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: "0 0 30px",
              maxWidth: "13ch",
              textWrap: "pretty",
            }}
          >
            They stick to me like lint.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 20px" }}>
            In the back of my mind, I&apos;m always collecting bits and images to use in a quilt.
            Often it&apos;s a simple thing, like the perfect gold streak in a salmon sky. Or the joy
            of a small school with kids playing in the yard.
          </p>
          <p style={{ fontSize: 20, lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 40px" }}>
            Then, one day, these bits begin to join hands.
          </p>

          <p
            style={{
              fontSize: 28,
              lineHeight: 1.32,
              maxWidth: "34ch",
              margin: "0 0 30px",
              textWrap: "pretty",
            }}
          >
            <em>When people see my quilts, the thing they ask is, &ldquo;How do you get those
            ideas?&rdquo;</em>
          </p>
          <p style={paragraph}>
            Whatever you are working on, be it a dance, a song or a computer program, the design
            process is much the same. But I&apos;m about quilts, so here&apos;s what works for me.
          </p>
          <p style={paragraph}>
            My interest in quilts is a constant preoccupation. I may brood on an idea for a long
            time. The list of people, places and things I can steal for a quilt is endless. Then one
            day these bits begin to join hands, and I go looking in my mind stash for other things I
            can use — colors, effects. I audition them on my design wall, or lay them out on the
            bed, and I&apos;m up and running.
          </p>
          <p style={paragraph}>
            It helps to have a little time, quiet and space. Hopefully the quilt begins to talk to
            you. Genius will strike. Or not — in which case you start again, or put it aside until
            the creative wave sweeps along. I find a small glass of wine helps, and if that
            doesn&apos;t produce a genius idea, you don&apos;t mind.
          </p>
          <p className="muted-65" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "58ch" }}>
            Like all design, and all projects really: a series of small decisions.
          </p>
        </div>

        <div className="essay-aside">
          <DesignWall />
          <div style={{ marginTop: 40 }}>
            <h2 className="kicker" style={{ marginBottom: 15 }}>
              More on the blog
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {designPosts.map((post) => (
                <li
                  key={post.link}
                  style={{ padding: "12px 0", borderTop: "1px solid var(--color-divider)" }}
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-text)" }}
                  >
                    <div className="overline" style={{ color: "var(--color-accent)", marginBottom: 4 }}>
                      {post.date}
                    </div>
                    <div style={{ fontSize: 18, lineHeight: 1.25, marginBottom: 4 }}>{post.title}</div>
                    <p className="muted-72" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
