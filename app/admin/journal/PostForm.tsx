"use client";

import { useState } from "react";
import Link from "next/link";
import { PhotoDrop, photoStatus, usePhotoUploads } from "../PhotoDrop";
import { publishPost } from "./actions";

export default function PostForm({ storageReady }: { storageReady: boolean }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { photos, addFiles, remove, clear, uploading, skippedMessage } = usePhotoUploads("journal/photos");
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPublishing(true);
    setError("");
    try {
      const result = await publishPost({
        title,
        text,
        images: photos.flatMap((p) => (p.url ? [p.url] : [])),
      });
      if ("error" in result && result.error) {
        setError(result.error);
      } else if ("slug" in result && result.slug) {
        setPublishedSlug(result.slug);
      }
    } catch {
      setError("Something went wrong publishing. Please try again.");
    } finally {
      setPublishing(false);
    }
  }

  function startOver() {
    setTitle("");
    setText("");
    clear();
    setPublishedSlug("");
  }

  if (publishedSlug) {
    return (
      <div className="admin-form">
        <p className="lead">Your entry is live.</p>
        <p style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/journal/${publishedSlug}`} className="btn btn-primary">
            See it on the site
          </Link>
          <button type="button" className="btn btn-secondary" onClick={startOver}>
            Write another
          </button>
        </p>
      </div>
    );
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      {!storageReady && (
        <p className="admin-error">
          Photo and post storage isn&apos;t connected yet (connect the Blob store in Vercel), so
          publishing won&apos;t work here.
        </p>
      )}

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="text">Entry</label>
        <textarea
          id="text"
          className="input"
          rows={14}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a blank line between paragraphs."
          required
        />
      </div>

      <div className="field">
        <label>Photos</label>
        <PhotoDrop onFiles={addFiles} />

        {photos.length > 0 && (
          <ul className="admin-photos">
            {photos.map((p) => (
              <li key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt="" style={{ opacity: p.url ? 1 : 0.5 }} />
                <span className="eyebrow muted">
                  {photoStatus(p)}
                </span>
                <button type="button" className="btn btn-ghost" onClick={() => remove(p.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(error || skippedMessage) && <p className="admin-error">{error || skippedMessage}</p>}

      <div>
        <button type="submit" className="btn btn-primary" disabled={publishing || uploading}>
          {publishing ? "Publishing…" : uploading ? "Waiting for photos…" : "Publish"}
        </button>
      </div>
    </form>
  );
}
