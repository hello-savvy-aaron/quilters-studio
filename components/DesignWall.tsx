"use client";

import { useEffect, useState } from "react";

const PATTERN_NAMES = ["Log Cabin", "Broken Dishes", "Nine Patch", "Flying Geese"];
const PATTERN_SPEED_MS = 3400;

function cellFill(phase: number, r: number, c: number): string {
  const K = "var(--color-text)";
  const C = "var(--color-accent)";
  const M = "var(--color-accent-2)";
  const P = "var(--color-bg)";
  const C2 = "var(--color-accent-200)";
  const M2 = "var(--color-accent-2-200)";
  const N = "var(--color-neutral-300)";

  if (phase === 0) {
    const ring = Math.min(r, c, 7 - r, 7 - c);
    return [K, C2, P, M, P, C][ring % 6];
  }
  if (phase === 1) {
    const a = (r + c) % 2 ? C : P;
    const deg = [45, 135, 315, 225][(r % 2) * 2 + (c % 2)];
    return `linear-gradient(${deg}deg, ${a} 0 50%, ${K} 50% 100%)`;
  }
  if (phase === 2) {
    if (r === 0 || r === 7 || c === 0 || c === 7) return N;
    if (r > 2 && r < 5 && c > 2 && c < 5) return M;
    return ((r >> 1) + (c >> 1)) % 2 ? M2 : P;
  }
  const band = r >> 1;
  const dir = band % 2 ? 90 : 270;
  const a = (c + band) % 3 === 0 ? M : C;
  return `linear-gradient(${dir}deg, ${a} 0 50%, ${P} 50% 100%)`;
}

export default function DesignWall() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setPhase((p) => (p + 1) % 4), PATTERN_SPEED_MS);
    return () => clearInterval(timer);
  }, []);

  const cells = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      cells.push(
        <div
          key={`${r}-${c}`}
          style={{
            background: cellFill(phase, r, c),
            transition: "background 900ms cubic-bezier(.4,0,.2,1)",
          }}
        />
      );
    }
  }

  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 0,
          border: "1px solid var(--color-text)",
          aspectRatio: "1 / 1",
          background: "var(--color-bg)",
        }}
      >
        {cells}
      </div>
      <figcaption
        className="overline"
        style={{ display: "flex", justifyContent: "space-between", gap: 20, marginTop: 10 }}
      >
        <span>On the design wall — {PATTERN_NAMES[phase]}</span>
        <span style={{ color: "var(--color-accent)" }}>auditioning</span>
      </figcaption>
    </figure>
  );
}
