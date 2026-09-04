import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import QuiltGallery from "@/components/QuiltGallery";
import { journalPosts } from "@/lib/quilts";

const paragraph = { fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" } as const;

export default function Home() {
  const recent = journalPosts.slice(0, 3);

  return (
    <>
      {/* Who she is — the site opens with the biography. */}
      <section id="about" className="grid-bio">
        <div>
          <p className="overline" style={{ color: "var(--color-accent)", margin: "0 0 20px" }}>
            Hello, I&apos;m Mary Anne Henderson
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 78px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "0 0 30px",
              maxWidth: "17ch",
              textWrap: "pretty",
            }}
          >
            My mother taught me to sew when I was about ten.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 30px" }}>
            I&apos;ve been quilting for over fifty years, and my family urged me to share some of my
            favorites. So here they are.
          </p>
          <p style={paragraph}>
            She lost her mother when she was five and was raised by her dad and older brothers on a
            small farm — depression-era not-quite-poverty. I saw the farmhouse when I was little and
            found it shockingly plain and small; her three or four dresses had fit on a few nails in
            the wall.
          </p>
          <p style={paragraph}>
            After high school she went to live with a beloved aunt in St. Louis, who was a veritable
            Martha Stewart and taught her all the household arts, including sewing. I think she
            became a whole new person in those years. Later, Mom taught me and my sister how to sew
            clothes and make quilts from the scraps.
          </p>
          <p style={paragraph}>
            Since then: fifty years of quilting, a stretch working for Bali Fabrications in the San
            Francisco Bay Area, a shop in Marietta, Georgia, a quilt guild in St. Petersburg,
            Florida — and one rescue poodle, Cookie, who is pieced into the car cover.
          </p>
          <p className="muted-65" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "58ch" }}>
            I love the scrap quilts best of all. I don&apos;t know why the quilts I make often get so
            big.
          </p>
          <div style={{ display: "flex", gap: 15, alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href="#quilts">
              See the quilts
            </a>
            <Link className="btn btn-secondary" href="/on-design">
              How a quilt starts
            </Link>
          </div>
        </div>

        <div className="grid-portraits">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/quilts/about-dragon.jpg"
              alt="Mary Anne with her dragon quilt, fifteen years ago"
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption>Fifteen years ago, with the dragon quilt.</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/quilts/about-now.jpg"
              alt="Mary Anne today"
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption>Now, I look like Andy Warhol.</figcaption>
          </figure>
        </div>
      </section>

      {/* The work. */}
      <section id="quilts" style={{ padding: "100px 0 0" }}>
        <div style={{ height: 1, background: "var(--color-text)", marginBottom: 40 }} />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 30,
            flexWrap: "wrap",
            marginBottom: 30,
          }}
        >
          <h2 className="kicker" style={{ margin: 0 }}>
            The quilts
          </h2>
          <span className="muted-55" style={{ fontSize: 13 }}>
            Click any quilt for the whole story
          </span>
        </div>
        <QuiltGallery />
      </section>

      {/* Pointers to the rest of the site — the essays and the journal live on their own pages. */}
      <section style={{ padding: "100px 0 0" }}>
        <div style={{ height: 1, background: "var(--color-text)", marginBottom: 40 }} />
        <div className="grid-more">
          <div>
            <h2 className="kicker">On design</h2>
            <p
              style={{
                fontSize: 24,
                lineHeight: 1.32,
                maxWidth: "30ch",
                margin: "0 0 20px",
                textWrap: "pretty",
              }}
            >
              <em>When people see my quilts, the thing they ask is, &ldquo;How do you get those
              ideas?&rdquo;</em>
            </p>
            <p className="muted-72" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "48ch" }}>
              Where the ideas come from, how they get auditioned on the design wall, and why a small
              glass of wine helps.
            </p>
            <Link href="/on-design" style={{ fontSize: 14 }}>
              Read how a quilt starts →
            </Link>
          </div>
          <div>
            <h2 className="kicker">Journal</h2>
            <ul style={{ listStyle: "none", margin: "0 0 20px", padding: 0 }}>
              {recent.map((post) => (
                <li
                  key={post.link}
                  style={{
                    padding: "12px 0",
                    borderTop: "1px solid var(--color-divider)",
                  }}
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 20,
                      alignItems: "baseline",
                      color: "var(--color-text)",
                    }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1.25 }}>{post.title}</span>
                    <span className="overline" style={{ color: "var(--color-accent)", whiteSpace: "nowrap" }}>
                      {post.date}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/journal" style={{ fontSize: 14 }}>
              All journal entries →
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: "120px 0 0" }}>
        <div style={{ height: 4, background: "var(--color-text)", marginBottom: 40 }} />
        <div className="grid-contact">
          <div>
            <h2
              style={{
                fontSize: "clamp(34px, 4vw, 58px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                margin: "0 0 20px",
                maxWidth: "16ch",
              }}
            >
              Come say hello.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "48ch" }}>
              If you&apos;d like your own Quilty, want to talk about a design you&apos;re stuck on,
              or just want to tell me about a quilt you&apos;re making — write to me. Talking ideas
              will probably yield inspiration.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, marginTop: 30 }}>
              Marietta, Georgia
              <br />
              <a href="https://mahquilts.blogspot.com/" target="_blank" rel="noopener noreferrer">
                mahquilts.blogspot.com
              </a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
