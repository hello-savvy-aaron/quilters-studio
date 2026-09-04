"use client";

import { useCallback, useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import type { Piece } from "@/lib/collections";

type Props = { pieces: Piece[]; noun: string };

export default function Gallery({ pieces, noun }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const count = pieces.length;

  const show = useCallback((i: number) => {
    setSlide(0);
    setOpen(i);
  }, []);
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o === null ? o : (o + count - 1) % count)),
    [count]
  );
  const next = useCallback(() => setOpen((o) => (o === null ? o : (o + 1) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const n = pieces[open].images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") setSlide((s) => (s + n - 1) % n);
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, pieces]);

  const sel = open === null ? null : pieces[open];

  return (
    <>
      <div className="grid-works">
        {pieces.map((q, i) => (
          <button key={q.title} type="button" className="work-card" onClick={() => show(i)}>
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
              <Carousel images={sel.images} index={slide} onChange={setSlide} />
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
                  <button className="btn btn-secondary" type="button" onClick={() => { setSlide(0); prev(); }}>
                    Previous
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={() => { setSlide(0); next(); }}>
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
