import ContactForm from "@/components/ContactForm";
import DesignWall from "@/components/DesignWall";
import QuiltGallery from "@/components/QuiltGallery";
import { journalPosts } from "@/lib/quilts";

export default function Home() {
  return (
    <div className="shell">
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 40,
          padding: "20px 0 15px",
          background: "var(--color-bg)",
        }}
      >
        <a href="#top" style={{ fontSize: 19, letterSpacing: "-0.01em", color: "var(--color-text)" }}>
          Mary Anne Quilts
        </a>
        <nav
          className="nav-links"
          style={{ display: "flex", gap: 30, fontSize: 13, letterSpacing: "0.02em" }}
        >
          <a href="#work" style={{ color: "var(--color-text)" }}>
            Quilts
          </a>
          <a href="#design" style={{ color: "var(--color-text)" }}>
            On design
          </a>
          <a href="#journal" style={{ color: "var(--color-text)" }}>
            Journal
          </a>
          <a href="#about" style={{ color: "var(--color-text)" }}>
            About
          </a>
          <a href="#contact" style={{ color: "var(--color-accent)" }}>
            Say hello
          </a>
        </nav>
      </header>

      <section id="top">
        <div style={{ height: 4, background: "var(--color-text)" }} />
        <div
          className="overline muted-60"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            padding: "8px 0",
            flexWrap: "wrap",
          }}
        >
          <span>Mary Anne Henderson · Quilter</span>
          <span>Marietta, Georgia</span>
          <span>Fifty years of scraps</span>
        </div>
        <div style={{ height: 1, background: "var(--color-text)" }} />

        <div className="grid-hero">
          <div>
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
            <p style={{ fontSize: 20, lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 30px" }}>
              Then, one day, these bits begin to join hands.
            </p>
            <p
              className="muted-72"
              style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "52ch", margin: "0 0 30px" }}
            >
              Hello, I&apos;m Mary Anne Henderson. I&apos;ve been quilting for over fifty years, and
              my family urged me to share some of my favorites. So here they are.
            </p>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
              <a className="btn btn-primary" href="#work">
                See the quilts
              </a>
              <a className="btn btn-secondary" href="#design">
                How a quilt starts
              </a>
            </div>
          </div>

          <figure style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://blogger.googleusercontent.com/img/a/AVvXsEggN-zh7EPn-958FTSq4YEnNXgFGsYiWRaG3ru0o6_ljZ_lk9P8s0nmiOPA_-2JGj2LaJ85l1uWEAHtIpsXrBnkzfV8UY4F7VnF70UTlgzEKmHPzwSctKeLLUB_VETzdWx3_H-Q4d7DWMUo7aHlIc8RVX6vs2waQGht0Maw0Nn5z4uEp8M4ns5mudtU3vo"
              alt="Sock Hop, a scrap quilt of 3,500 pieces"
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption
              className="overline"
              style={{ display: "flex", justifyContent: "space-between", gap: 20, marginTop: 10 }}
            >
              <span>Sock Hop, 1994 · 92 × 82 in</span>
              <span style={{ color: "var(--color-accent)" }}>3,500 pieces</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="work" style={{ padding: "20px 0 0" }}>
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

      <section id="design" style={{ padding: "120px 0 0" }}>
        <h2 className="kicker">On design</h2>
        <div className="grid-design">
          <div>
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
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" }}>
              Whatever you are working on, be it a dance, a song or a computer program, the design
              process is much the same. But I&apos;m about quilts, so here&apos;s what works for me.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" }}>
              My interest in quilts is a constant preoccupation. I may brood on an idea for a long
              time. The list of people, places and things I can steal for a quilt is endless. Then
              one day these bits begin to join hands, and I go looking in my mind stash for other
              things I can use — colors, effects. I audition them on my design wall, or lay them out
              on the bed, and I&apos;m up and running.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" }}>
              It helps to have a little time, quiet and space. Hopefully the quilt begins to talk to
              you. Genius will strike. Or not — in which case you start again, or put it aside until
              the creative wave sweeps along. I find a small glass of wine helps, and if that
              doesn&apos;t produce a genius idea, you don&apos;t mind.
            </p>
            <p className="muted-65" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "58ch" }}>
              Like all design, and all projects really: a series of small decisions.
            </p>
          </div>
          <DesignWall />
        </div>
      </section>

      <section id="journal" style={{ padding: "120px 0 0" }}>
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
            Journal
          </h2>
          <a
            href="https://mahquilts.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13 }}
          >
            All posts on the blog →
          </a>
        </div>
        <div className="grid-journal">
          {journalPosts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text)" }}
            >
              <div className="overline" style={{ color: "var(--color-accent)", marginBottom: 8 }}>
                {post.date}
              </div>
              <div style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 8 }}>{post.title}</div>
              <p className="muted-72" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="about" style={{ padding: "120px 0 0" }}>
        <h2 className="kicker">About</h2>
        <div className="grid-about">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <figure style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEit2Zmx6nC5TIq8zUuoUWG1qlcaNMk0pW7P2RvOYgsPlbvCXzTkm8pHxiuTBMJyaFLSvVFkEY5X6bnxiIHyj5Hl9UmzqFSolfxI4SqEFaNqPAW5mMeyQMq2iZRXpX5BFupjdpx4SLOL8jWbt4l68gTSKe-VacBjen1Zt2yzQca7zPMzs_aFU8SgvRNPV0o"
                alt="Mary Anne with her dragon quilt, fifteen years ago"
                style={{ width: "100%", height: "auto" }}
              />
              <figcaption>Fifteen years ago, with the dragon quilt.</figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEh6HDWbNbcFamOe7ZsVHNJvCUghbGhtL4k0hlch2Pbz3teC9WjbJpSb6U-jZ-PIvyQg2dEVg1SKKHSOjCXTwW-uW8VNgbRo87hpfow72dhgx6wioATubOYjRJSm_g2YC6hlCnD1Vl29UHAi6kCh_jeIXgdFrSybhEOBI7Bmot3a9Qa3PS7v8HYIKtx0sF0"
                alt="Mary Anne today"
                style={{ width: "100%", height: "auto" }}
              />
              <figcaption>Now, I look like Andy Warhol.</figcaption>
            </figure>
          </div>
          <div>
            <p
              style={{
                fontSize: 28,
                lineHeight: 1.32,
                maxWidth: "32ch",
                margin: "0 0 30px",
                textWrap: "pretty",
              }}
            >
              My mother taught me to sew when I was about ten.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" }}>
              She lost her mother when she was five and was raised by her dad and older brothers on a
              small farm — depression-era not-quite-poverty. I saw the farmhouse when I was little
              and found it shockingly plain and small; her three or four dresses had fit on a few
              nails in the wall.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" }}>
              After high school she went to live with a beloved aunt in St. Louis, who was a
              veritable Martha Stewart and taught her all the household arts, including sewing. I
              think she became a whole new person in those years. Later, Mom taught me and my sister
              how to sew clothes and make quilts from the scraps.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, maxWidth: "58ch" }}>
              Since then: fifty years of quilting, a stretch working for Bali Fabrications in the San
              Francisco Bay Area, a shop in Marietta, Georgia, a quilt guild in St. Petersburg,
              Florida — and one rescue poodle, Cookie, who is pieced into the car cover.
            </p>
            <p className="muted-65" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "58ch" }}>
              I love the scrap quilts best of all. I don&apos;t know why the quilts I make often get
              so big.
            </p>
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

      <footer style={{ padding: "120px 0 0" }}>
        <div style={{ height: 1, background: "var(--color-text)" }} />
        <div
          className="overline muted-60"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            padding: "8px 0",
            flexWrap: "wrap",
          }}
        >
          <span>Mary Anne Quilts</span>
          <span>
            Site by{" "}
            <a href="https://hellosavvy.design" target="_blank" rel="noopener noreferrer">
              Hello Savvy
            </a>{" "}
            · more sites at{" "}
            <a href="https://savvy.website" target="_blank" rel="noopener noreferrer">
              savvy.website
            </a>
          </span>
        </div>
        <div style={{ height: 4, background: "var(--color-text)" }} />
      </footer>
    </div>
  );
}
