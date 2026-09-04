/** Stand-in cover for a collection that has no photographs yet: a quiet stack of glass. */
export default function CoverPlaceholder({ label }: { label: string }) {
  const tiers = [0.34, 0.46, 0.58, 0.7];
  return (
    <div className="placeholder" aria-label={label} role="img">
      <div className="placeholder-stack">
        {tiers.map((w, i) => (
          <div key={w} className="placeholder-tier" style={{ width: `${w * 100}%`, opacity: 0.35 + i * 0.15 }} />
        ))}
      </div>
      <span className="eyebrow muted">{label}</span>
    </div>
  );
}
