"use client";

import type { PieceImage } from "@/lib/collections";

type Props = {
  images: PieceImage[];
  index: number;
  onChange: (i: number) => void;
};

/** One large image with previous/next controls and a row of thumbnails. */
export default function Carousel({ images, index, onChange }: Props) {
  const n = images.length;
  const img = images[index];
  const prev = () => onChange((index + n - 1) % n);
  const next = () => onChange((index + 1) % n);

  return (
    <div className="carousel">
      <div className="carousel-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={img.src} src={img.src} alt={img.alt} />
      </div>
      <div className="carousel-bar">
        <span className="carousel-caption">{img.alt}</span>
        {n > 1 && (
          <span className="carousel-controls">
            <span className="eyebrow muted" style={{ fontVariantNumeric: "tabular-nums" }}>
              {index + 1} / {n}
            </span>
            <button type="button" className="carousel-btn" onClick={prev} aria-label="Previous photo">
              ←
            </button>
            <button type="button" className="carousel-btn" onClick={next} aria-label="Next photo">
              →
            </button>
          </span>
        )}
      </div>
      {n > 1 && (
        <div className="carousel-thumbs" role="tablist" aria-label="Photos">
          {images.map((t, i) => (
            <button
              key={t.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t.alt}
              className={i === index ? "thumb active" : "thumb"}
              onClick={() => onChange(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
