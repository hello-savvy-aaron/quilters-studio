"use client";

import Image from "next/image";
import { useState } from "react";
import type { Piece } from "@/lib/collections";

type Props = { piece: Piece; n: number };

// Column widths at the 1200px container: 5 : 4 : 3 of ~1040px of content.
const LEAD_SIZES = "(min-width: 1200px) 440px, (min-width: 700px) 45vw, 100vw";
const GALLERY_SIZES = "(min-width: 1200px) 350px, (min-width: 700px) 40vw, 100vw";

/**
 * One quilt as a card: headline across the top, then three columns —
 * the main photo, a gallery of the other photos (thumbnails swap the large one
 * in place), and the story. Anything the quilt doesn't have is left out.
 */
export default function QuiltRow({ piece, n }: Props) {
  const gallery = piece.images.filter((img) => img.src !== piece.cover.src);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const SHORT = 2;
  const long = piece.body.length > SHORT + 1;
  const paras = long && !open ? piece.body.slice(0, SHORT) : piece.body;
  const shown = gallery[i];
  const number = String(n).padStart(2, "0");
  const facts = [piece.dimensions, piece.year].filter(Boolean).join(" · ");
  const eager = n === 1;

  return (
    <article id={piece.slug} className="quilt-row" aria-labelledby={`${piece.slug}-title`}>
      <h2 id={`${piece.slug}-title`} className="quilt-title">
        {piece.title}
      </h2>

      <div className="quilt-col quilt-col-lead">
        <div className="photo photo-lead">
          <Image
            src={piece.cover.src}
            alt={piece.cover.alt}
            fill
            sizes={LEAD_SIZES}
            priority={eager}
            loading={eager ? undefined : "lazy"}
          />
        </div>
        <div className="quilt-tags">
          <span className="quilt-no">No. {number}</span>
          {facts && <span className="chip">{facts}</span>}
        </div>
      </div>

      {shown && (
        <div className="quilt-col quilt-col-gallery">
          <div className="photo photo-gallery">
            <Image key={shown.src} src={shown.src} alt={shown.alt} fill sizes={GALLERY_SIZES} loading={eager ? undefined : "lazy"} />
          </div>
          {gallery.length > 1 && (
            <div className="thumbs">
              {gallery.map((img, j) => (
                <button
                  key={img.src}
                  type="button"
                  className="thumb"
                  aria-label={`Show photo ${j + 1}`}
                  aria-pressed={j === i}
                  onClick={() => setI(j)}
                >
                  <Image src={img.src} alt="" fill sizes="72px" loading="lazy" />
                </button>
              ))}
              <span className="thumbs-count" aria-live="polite">
                {i + 1} / {gallery.length}
              </span>
            </div>
          )}
          <p className="caption">{shown.alt}</p>
        </div>
      )}

      <div className="quilt-col quilt-col-story">
        {piece.quote && <p className="pull-quote">&ldquo;{piece.quote}&rdquo;</p>}
        <div className="quilt-story" id={`${piece.slug}-story`}>
          {paras.map((t) => (
            <p key={t.slice(0, 40)}>{t}</p>
          ))}
        </div>
        {long && (
          <div>
            <button
              type="button"
              className="cta"
              aria-expanded={open}
              aria-controls={`${piece.slug}-story`}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Show less" : "Read the full story"} <span aria-hidden="true">{open ? "↑" : "↓"}</span>
            </button>
          </div>
        )}
        {piece.meta && <p className="quilt-meta">{piece.meta}</p>}
      </div>
    </article>
  );
}
