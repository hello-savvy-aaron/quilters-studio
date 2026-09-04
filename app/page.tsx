import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import { collections, pieceCount } from "@/lib/collections";
import { journalPosts } from "@/lib/quilts";

export default function Home() {
  const recent = journalPosts.slice(0, 3);

  return (
    <>
      {/* The artist. */}
      <section id="about" className="grid-bio">
        <div>
          <p className="kicker">Quilts · Glass · Marietta, Georgia</p>
          <h1 className="display-xl" style={{ maxWidth: "16ch", marginBottom: 32 }}>
            Scrap quilts of three thousand pieces. A new series in glass.
          </h1>
          <p className="lead" style={{ marginBottom: 28 }}>
            Mary Anne Henderson is a quilter and glass artist working in Marietta, Georgia. Over
            fifty years she has built a body of work from scraps: quilts featured in Patchwork
            Quilts magazine and in Georgia Bonesteel&apos;s <em>Quiltmaking Legacy</em>, and, more
            recently, a series of towers in glass.
          </p>
          <div className="prose">
            <p>
              She learned to sew at ten from her mother, who had learned the household arts from an
              aunt in St. Louis and passed them on. Since then: a stretch with Bali Fabrications, a
              batik importer in the San Francisco Bay Area; a quilt shop in Marietta; and a guild in
              St. Petersburg, Florida, whose members pieced the quilted car cover known as Quilty
              McQuiltface.
            </p>
            <p className="muted">
              Scrap quilts remain the heart of the work. They tend to get big.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 36, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href="#collections">
              View the collections
            </a>
            <Link className="btn btn-secondary" href="/on-design">
              On design
            </Link>
          </div>
        </div>

        <div className="grid-portraits">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/quilts/about-dragon.jpg" alt="Mary Anne Henderson with her dragon quilt" />
            <figcaption>With the dragon quilt.</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/quilts/about-now.jpg" alt="Mary Anne Henderson" />
            <figcaption>Mary Anne Henderson.</figcaption>
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
