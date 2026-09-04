"use client";

import { useCallback, useEffect, useState } from "react";
import type { Piece } from "@/lib/collections";

type Props = { pieces: Piece[]; noun: string };

export default function Gallery({ pieces, noun }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const count = pieces.length;

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o === null ? o : (o + count - 1) % count)),
    [count]
  );
  const next = useCallback(() => setOpen((o) => (o === null ? o : (o + 1) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const sel = open === null ? null : pieces[open];

  return (
    <>
      <div className="grid-works">
        {pieces.map((q, i) => (
          <button key={q.title} type="button" className="work-card" onClick={() => setOpen(i)}>
            <div className="work-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.cover.src} alt={q.cover.alt} loading={i > 2 ? "lazy" : undefined} />
            </div>
            <div className="work-caption">
              <span className="work-title">{q.title}</span>
              <span className="muted">{q.gridTag}</span>
            </div>
            <div className="muted small">{q.gridNote}</div>
          </button>
        ))}
      </div>

      {sel && (
        <div role="dialog" aria-modal="true" aria-label={sel.title} className="lightbox">
          <div className="lightbox-inner">
            <div className="lightbox-bar">
              <span className="eyebrow muted">
                {open! + 1} / {count} · {sel.meta}
              </span>
              <button className="btn btn-ghost" type="button" onClick={close}>
                Close
              </button>
            </div>
            <div className="grid-detail">
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {sel.images.map((img) => (
                  <figure key={img.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{
                        width: "100%",
                        height: "auto",
                        background: "var(--color-surface)",
                        ...(img.cap ? { maxWidth: img.cap } : {}),
                      }}
                    />
                    <figcaption>{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="lightbox-text">
                <h2 className="display-md">{sel.title}</h2>
                <p className="eyebrow muted" style={{ margin: "0 0 28px" }}>
                  {sel.meta}
                </p>
                <div className="prose">
                  {sel.body.map((text) => (
                    <p key={text.slice(0, 40)}>{text}</p>
                  ))}
                </div>
                {sel.link && (
                  <p style={{ marginTop: 28 }}>
                    <a href={sel.link} target="_blank" rel="noopener noreferrer">
                      Read the full story on the journal →
                    </a>
                  </p>
                )}
                <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
                  <button className="btn btn-secondary" type="button" onClick={prev}>
                    Previous
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={next}>
                    Next {noun}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
