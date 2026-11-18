"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PhotoDrop, PhotoThumb, photoStatus, usePhotoUploads } from "../PhotoDrop";
import { publishPost } from "./actions";

export default function PostForm({ storageReady }: { storageReady: boolean }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { photos, addFiles, remove, retry, clear, uploading, skippedMessage } = usePhotoUploads("journal/photos");
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

  // A stray swipe back on a phone shouldn't throw away a half-written entry.
  const dirty = !publishedSlug && (photos.length > 0 || title !== "" || text !== "");
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

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
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a blank line between paragraphs."
          required
        />
      </div>

      <div className="field">
        <label>Photos</label>
        {photos.length > 0 && (
          <ul className="admin-photos">
            {photos.map((p) => (
              <li key={p.id}>
                <div className="admin-thumb">
                  <PhotoThumb photo={p} />
                </div>
                <span className={`eyebrow ${p.failed ? "admin-error" : "muted"}`}>{photoStatus(p)}</span>
                <span className="admin-photo-actions">
                  {p.failed && (
                    <button type="button" className="btn btn-ghost" onClick={() => retry(p.id)}>
                      Try again
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
        <PhotoDrop onFiles={addFiles} more={photos.length > 0} />
      </div>

      {(error || skippedMessage) && <p className="admin-error">{error || skippedMessage}</p>}

      <div className="admin-submit">
        <button type="submit" className="btn btn-primary" disabled={publishing || uploading}>
          {publishing ? "Publishing…" : uploading ? "Waiting for photos…" : "Publish"}
        </button>
      </div>
    </form>
  );
}
