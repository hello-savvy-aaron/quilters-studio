import SiteNav from "@/components/SiteNav";

type Props = {
  title: React.ReactNode;
  /** One or two lines under the headline. */
  lede?: React.ReactNode;
  /** Small line above the headline, e.g. a breadcrumb. */
  kicker?: React.ReactNode;
};

/** The sage band at the top of every page: header, big serif headline, and the circles. */
export default function PageHero({ title, lede, kicker }: Props) {
  return (
    <div className="hero">
      <div aria-hidden="true" className="hero-circle hero-circle-1" />
      <div aria-hidden="true" className="hero-circle hero-circle-2" />
      <div aria-hidden="true" className="hero-circle hero-circle-3" />
      <SiteNav />
      <section className="hero-body">
        {kicker && <p className="hero-kicker">{kicker}</p>}
        <h1 className="hero-title">{title}</h1>
        {lede && <p className="hero-lede">{lede}</p>}
      </section>
    </div>
  );
}
