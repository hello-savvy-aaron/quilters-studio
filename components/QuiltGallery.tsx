"use client";

import { useCallback, useEffect, useState } from "react";
import { quilts } from "@/lib/quilts";

export default function QuiltGallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((o) => (o === null ? o : (o + quilts.length - 1) % quilts.length)),
    []
  );
  const next = useCallback(
    () => setOpen((o) => (o === null ? o : (o + 1) % quilts.length)),
    []
  );

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

  const sel = open === null ? null : quilts[open];

  return (
    <>
      <div className="grid-quilts">
        {quilts.map((q, i) => (
          <button
            key={q.title}
            type="button"
            onClick={() => setOpen(i)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "block",
              font: "inherit",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                background: "var(--color-neutral-200)",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={q.cover.src}
                alt={q.cover.alt}
                loading={i > 2 ? "lazy" : undefined}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 15,
                marginTop: 10,
                fontSize: 15,
              }}
            >
              <span>{q.title}</span>
              <span className="muted-55">{q.gridTag}</span>
            </div>
            <div className="muted-55" style={{ fontSize: 12 }}>
              {q.gridNote}
            </div>
          </button>
        ))}
      </div>

      {sel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={sel.title}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            overflow: "auto",
            background: "var(--color-bg)",
          }}
        >
          <div style={{ maxWidth: 1560, margin: "0 auto", padding: "20px 40px 80px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingBottom: 15,
              }}
            >
              <span className="overline muted-60">{sel.meta}</span>
              <button className="btn btn-ghost" type="button" onClick={close}>
                Close
              </button>
            </div>
            <div style={{ height: 1, background: "var(--color-text)", marginBottom: 40 }} />
            <div className="grid-detail">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {sel.images.map((img) => (
                  <figure key={img.src} style={{ margin: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{
                        width: "100%",
                        height: "auto",
                        background: "var(--color-neutral-200)",
                        ...(img.cap ? { maxWidth: img.cap } : {}),
                      }}
                    />
                    <figcaption>{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "clamp(30px, 3.4vw, 52px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                    margin: "0 0 20px",
                  }}
                >
                  {sel.title}
                </h2>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 15, maxWidth: "46ch" }}
                >
                  {sel.body.map((text) => (
                    <p key={text.slice(0, 40)} style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>
                      {text}
                    </p>
                  ))}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 30 }}>
                  <a href={sel.link} target="_blank" rel="noopener noreferrer">
                    Read the full post on the blog →
                  </a>
                </p>
                <div style={{ display: "flex", gap: 15, marginTop: 30 }}>
                  <button className="btn btn-secondary" type="button" onClick={prev}>
                    Previous
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={next}>
                    Next quilt
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
