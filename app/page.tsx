import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import { collections, pieceCount } from "@/lib/collections";
import { familyStories } from "@/lib/family-stories";
import { journalPosts } from "@/lib/quilts";

export default function Home() {
  const recent = journalPosts.slice(0, 3);
  const stories = familyStories.slice(0, 3);

  return (
    <>
      {/* About — the biography opens the site. */}
      <section id="about" className="grid-bio">
        <div>
          <p className="kicker">Hello, I&apos;m Mary Anne Henderson</p>
          <h1 className="display-xl" style={{ maxWidth: "17ch", marginBottom: 32 }}>
            My mother taught me to sew when I was about ten.
          </h1>
          <p className="lead" style={{ marginBottom: 28 }}>
            I&apos;ve been quilting for over fifty years, and my family urged me to share some of my
            favorites. So here they are.
          </p>
          <div className="prose">
            <p>
              She lost her mother when she was five and was raised by her dad and older brothers on a
              small farm — depression-era not-quite-poverty. I saw the farmhouse when I was little and
              found it shockingly plain and small; her three or four dresses had fit on a few nails in
              the wall.
            </p>
            <p>
              After high school she went to live with a beloved aunt in St. Louis, who was a veritable
              Martha Stewart and taught her all the household arts, including sewing. I think she
              became a whole new person in those years. Later, Mom taught me and my sister how to sew
              clothes and make quilts from the scraps.
            </p>
            <p>
              Since then: fifty years of quilting, a stretch working for Bali Fabrications in the San
              Francisco Bay Area, a shop in Marietta, Georgia, a quilt guild in St. Petersburg,
              Florida — and one rescue poodle, Cookie, who is pieced into the car cover.
            </p>
            <p className="muted">
              I love the scrap quilts best of all. I don&apos;t know why the quilts I make often get so
              big.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 36, flexWrap: "wrap" }}>
            <Link className="btn btn-primary" href="/quilts">
              See the quilts
            </Link>
            <Link className="btn btn-secondary" href="/on-design">
              How a quilt starts
            </Link>
          </div>
        </div>

        <div className="grid-portraits">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/quilts/about-dragon.jpg" alt="Mary Anne with her dragon quilt, fifteen years ago" />
            <figcaption>Fifteen years ago, with the dragon quilt.</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/quilts/about-now.jpg" alt="Mary Anne today" />
            <figcaption>Now, I look like Andy Warhol.</figcaption>
          </figure>
        </div>
      </section>

      {/* The work, by collection. */}
      <section id="collections" className="section">
        <div className="section-head">
          <h2 className="kicker">Collections</h2>
          <span className="muted small">Select a collection to see the works</span>
        </div>
        <div className="grid-collections">
          {collections.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="collection-card">
              <div className="frame">
                {c.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.cover.src} alt={c.cover.alt} />
                ) : (
                  <CoverPlaceholder label="In progress" />
                )}
              </div>
              <div className="title-row">
                <span className="display-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {c.title}
                </span>
                <span className="eyebrow muted">{pieceCount(c)}</span>
              </div>
              <p>{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Writing. */}
      <section className="section">
        <div className="rule" style={{ marginBottom: 48 }} />
        <div className="grid-more">
          <div>
            <h2 className="kicker">On design</h2>
            <p className="quote" style={{ marginBottom: 20 }}>
              When people see my quilts, the thing they ask is, &ldquo;How do you get those
              ideas?&rdquo;
            </p>
            <p className="muted" style={{ maxWidth: "46ch" }}>
              Where the ideas come from, and how they get auditioned on the design wall. An essay on
              the process.
            </p>
            <Link href="/on-design" style={{ fontSize: 14 }}>
              Read the essay →
            </Link>
          </div>
          <div>
            <h2 className="kicker">Journal</h2>
            <ul className="list-plain" style={{ marginBottom: 20 }}>
              {recent.map((post) => (
                <li key={post.link}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>{post.title}</span>
                    <span className="eyebrow muted" style={{ whiteSpace: "nowrap" }}>
                      {post.date}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/journal" style={{ fontSize: 14 }}>
              All entries →
            </Link>
          </div>
          <div>
            <h2 className="kicker">Family stories</h2>
            <ul className="list-plain" style={{ marginBottom: 20 }}>
              {stories.map((s) => (
                <li key={s.slug}>
                  <Link href={`/family-stories/${s.slug}`}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>{s.title}</span>
                    <span className="eyebrow muted" style={{ whiteSpace: "nowrap" }}>
                      {s.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 14, maxWidth: "40ch" }}>
              The family history, written down as I remember it.
            </p>
            <Link href="/family-stories" style={{ fontSize: 14 }}>
              All stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact. */}
      <section id="contact" className="section">
        <div className="rule" style={{ marginBottom: 48 }} />
        <div className="grid-contact">
          <div>
            <h2 className="display-lg" style={{ maxWidth: "14ch", marginBottom: 24 }}>
              Get in touch.
            </h2>
            <p className="prose" style={{ fontSize: 16, lineHeight: 1.7 }}>
              For commissions, exhibition and guild inquiries, or a design you&apos;re stuck on,
              write to me. Talking ideas will probably yield inspiration.
            </p>
            <p className="muted" style={{ marginTop: 28 }}>
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
