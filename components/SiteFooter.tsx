export default function SiteFooter() {
  return (
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
  );
}
