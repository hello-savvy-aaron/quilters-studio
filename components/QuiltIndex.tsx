import type { Piece } from "@/lib/collections";
import QuiltRow from "@/components/QuiltRow";

/** "Jump to" pills, then one card per piece. Both are built from the same list, so they stay in sync. */
export default function QuiltIndex({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      <nav className="jump" aria-label="Jump to a quilt">
        <span className="jump-label">Jump to</span>
        {pieces.map((p, i) => (
          <a key={p.slug} className="pill" href={`#${p.slug}`}>
            <b>{String(i + 1).padStart(2, "0")}</b> {p.title}
          </a>
        ))}
      </nav>
      <div className="container rows">
        {pieces.map((p, i) => (
          <QuiltRow key={p.slug} piece={p} n={i + 1} />
        ))}
      </div>
    </>
  );
}
