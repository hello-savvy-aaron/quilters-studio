"use client";

import { useState } from "react";
import Link from "next/link";
import { PhotoDrop, photoStatus, usePhotoUploads } from "./PhotoDrop";
import { addQuilt } from "./actions";

const EMPTY = { title: "", story: "", quote: "", dimensions: "", year: "", meta: "" };

export default function QuiltForm({ storageReady }: { storageReady: boolean }) {
  const [fields, setFields] = useState(EMPTY);
  const { photos, addFiles, update, remove, makeFirst, clear, uploading, skippedMessage } =
    usePhotoUploads("quilts/photos");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [addedSlug, setAddedSlug] = useState("");

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const result = await addQuilt({
        ...fields,
        photos: photos.flatMap((p) => (p.url ? [{ url: p.url, caption: p.caption }] : [])),
      });
      if ("error" in result && result.error) setError(result.error);
      else if ("slug" in result && result.slug) setAddedSlug(result.slug);
    } catch {
      setError("Something went wrong saving the quilt. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (addedSlug) {
    return (
      <div className="admin-form">
        <p className="lead">The quilt is on the site.</p>
        <p style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/#${addedSlug}`} className="btn btn-primary">
            See it on the site
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setFields(EMPTY);
              clear();
              setAddedSlug("");
            }}
          >
            Add another quilt
          </button>
        </p>
      </div>
    );
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      {!storageReady && (
        <p className="admin-error">
          Photo storage isn&apos;t connected yet (connect the Blob store in Vercel), so saving won&apos;t work here.
        </p>
      )}

      <div className="field">
        <label htmlFor="q-title">Name of the quilt</label>
        <input id="q-title" className="input" value={fields.title} onChange={set("title")} required />
      </div>

      <div className="field">
        <label>Photos</label>
        <p className="muted admin-hint">The first photo is the big one. The rest show in the gallery beside it.</p>
        <PhotoDrop onFiles={addFiles} />
        {photos.length > 0 && (
          <ul className="admin-photos admin-photos-captioned">
            {photos.map((p, i) => (
              <li key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt="" style={{ opacity: p.url ? 1 : 0.5 }} />
                <span className="eyebrow muted">
                  {i === 0 ? "Main photo · " : ""}
                  {photoStatus(p)}
                </span>
                <input
                  className="input"
                  aria-label={`Caption for photo ${i + 1}`}
                  placeholder="Caption (optional)"
                  value={p.caption}
                  onChange={(e) => update(p.id, { caption: e.target.value })}
                />
                <span style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {i > 0 && (
                    <button type="button" className="btn btn-ghost" onClick={() => makeFirst(p.id)}>
                      Make main
                    </button>
                  )}
                  <button type="button" className="btn btn-ghost" onClick={() => remove(p.id)}>
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="field">
        <label htmlFor="q-story">The story</label>
        <textarea
          id="q-story"
          className="input"
          rows={14}
          value={fields.story}
          onChange={set("story")}
          placeholder="Leave a blank line between paragraphs."
          required
        />
      </div>

      <details className="admin-more">
        <summary>More details (all optional)</summary>
        <div className="admin-form" style={{ marginTop: 20 }}>
          <div className="field">
            <label htmlFor="q-quote">Pull quote</label>
            <input
              id="q-quote"
              className="input"
              value={fields.quote}
              onChange={set("quote")}
              placeholder="A line from the story to show large"
            />
          </div>
          <div className="admin-pair">
            <div className="field">
              <label htmlFor="q-dimensions">Size</label>
              <input
                id="q-dimensions"
                className="input"
                value={fields.dimensions}
                onChange={set("dimensions")}
                placeholder="92 × 82 in"
              />
            </div>
            <div className="field">
              <label htmlFor="q-year">Year</label>
              <input id="q-year" className="input" value={fields.year} onChange={set("year")} placeholder="2024" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="q-meta">Other details</label>
            <input
              id="q-meta"
              className="input"
              value={fields.meta}
              onChange={set("meta")}
              placeholder="Materials, who quilted it, where it lives"
            />
          </div>
        </div>
      </details>

      {(error || skippedMessage) && <p className="admin-error">{error || skippedMessage}</p>}

      <div>
        <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
          {saving ? "Saving…" : uploading ? "Waiting for photos…" : "Add to the site"}
        </button>
      </div>
    </form>
  );
}
