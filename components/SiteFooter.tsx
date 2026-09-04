export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Mary Anne Henderson · Marietta, Georgia</span>
      <span>
        <a href="https://mahquilts.blogspot.com/" target="_blank" rel="noopener noreferrer">
          Journal
        </a>
        {" · "}
        Site by{" "}
        <a href="https://hellosavvy.design" target="_blank" rel="noopener noreferrer">
          Hello Savvy
        </a>
        {" · "}
        <a href="https://savvy.website" target="_blank" rel="noopener noreferrer">
          savvy.website
        </a>
      </span>
    </footer>
  );
}
