"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { uploadPresigned } from "@vercel/blob/client";
import { publishPost } from "./actions";

type Photo = {
  id: string;
  preview: string;
  url?: string;
  failed?: boolean;
};

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function PostForm({
  rememberBrowser,
  storageReady,
}: {
  rememberBrowser: boolean;
  storageReady: boolean;
}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragging, setDragging] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rememberBrowser) {
      document.cookie = "admin=true; path=/; max-age=315360000; samesite=lax; secure";
    }
  }, [rememberBrowser]);

  const uploading = photos.some((p) => !p.url && !p.failed);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const images = Array.from(files).filter((f) => ACCEPTED.includes(f.type));
    if (images.length < files.length) {
      setError("Some files were skipped — only JPEG, PNG, WebP and GIF photos can be added.");
    } else {
      setError("");
    }

    for (const file of images) {
      const id = crypto.randomUUID();
      setPhotos((prev) => [...prev, { id, preview: URL.createObjectURL(file) }]);
      const name = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
      uploadPresigned(`journal/photos/${name}`, file, {
        access: "public",
        handleUploadUrl: "/api/journal/upload",
      })
        .then((blob) => setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, url: blob.url } : p))))
        .catch(() => setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, failed: true } : p))));
    }
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

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
    setPhotos([]);
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
        <div
          className={`admin-drop${dragging ? " is-dragging" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => fileInput.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInput.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          Drag photos here, or click to choose them
          <input
            ref={fileInput}
            type="file"
            accept={ACCEPTED.join(",")}
            multiple
            hidden
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {photos.length > 0 && (
          <ul className="admin-photos">
            {photos.map((p) => (
              <li key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt="" style={{ opacity: p.url ? 1 : 0.5 }} />
                <span className="eyebrow muted">
                  {p.failed ? "Didn't upload" : p.url ? "Ready" : "Uploading…"}
                </span>
                <button type="button" className="btn btn-ghost" onClick={() => removePhoto(p.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div>
        <button type="submit" className="btn btn-primary" disabled={publishing || uploading}>
          {publishing ? "Publishing…" : uploading ? "Waiting for photos…" : "Publish"}
        </button>
      </div>
    </form>
  );
}
