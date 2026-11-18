"use client";

import { useRef, useState } from "react";
import { uploadPresigned } from "@vercel/blob/client";
import { isPhoto, preparePhoto } from "./prepare-photo";

export type Photo = {
  id: string;
  /** Shown once the photo has been converted (HEIC can't be previewed in most browsers). */
  preview?: string;
  url?: string;
  /** 0–100 while uploading. */
  progress?: number;
  failed?: boolean;
  caption: string;
};

/**
 * Photos chosen in the admin forms. Each is converted (HEIC → JPEG, shrunk) and uploaded to Vercel Blob
 * as soon as it's picked, one conversion at a time so a phone doesn't run out of memory.
 */
export function usePhotoUploads(folder: "journal/photos" | "quilts/photos") {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [skipped, setSkipped] = useState(false);
  const originals = useRef(new Map<string, File>());
  const prepared = useRef(new Map<string, File>());
  const queue = useRef<Promise<unknown>>(Promise.resolve());

  function update(id: string, patch: Partial<Photo>) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function start(id: string) {
    update(id, { failed: false, progress: undefined });
    queue.current = queue.current.then(async () => {
      try {
        let file = prepared.current.get(id);
        if (!file) {
          const original = originals.current.get(id);
          if (!original) return; // removed while waiting
          file = await preparePhoto(original);
          prepared.current.set(id, file);
          update(id, { preview: URL.createObjectURL(file) });
        }
        // Upload in the background; the next photo can be converted meanwhile.
        const name = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
        uploadPresigned(`${folder}/${name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          onUploadProgress: ({ percentage }) => update(id, { progress: Math.round(percentage) }),
        })
          .then((blob) => update(id, { url: blob.url, progress: 100 }))
          .catch(() => update(id, { failed: true }));
      } catch {
        update(id, { failed: true });
      }
    });
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    const chosen = Array.from(files).filter(isPhoto);
    setSkipped(chosen.length < files.length);
    for (const file of chosen) {
      const id = crypto.randomUUID();
      originals.current.set(id, file);
      setPhotos((prev) => [...prev, { id, caption: "" }]);
      start(id);
    }
  }

  function remove(id: string) {
    originals.current.delete(id);
    prepared.current.delete(id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function makeFirst(id: string) {
    setPhotos((prev) => [...prev.filter((p) => p.id === id), ...prev.filter((p) => p.id !== id)]);
  }

  function move(id: string, by: -1 | 1) {
    setPhotos((prev) => {
      const i = prev.findIndex((p) => p.id === id);
      const j = i + by;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function clear() {
    originals.current.clear();
    prepared.current.clear();
    setPhotos([]);
  }

  return {
    photos,
    addFiles,
    update,
    remove,
    retry: start,
    makeFirst,
    move,
    clear,
    uploading: photos.some((p) => !p.url && !p.failed),
    skippedMessage: skipped ? "Some files were skipped because they aren't photos." : "",
  };
}

/** The dashed box: tap to choose photos on a phone, or drag them in on a computer. */
export function PhotoDrop({ onFiles, more }: { onFiles: (files: FileList | null) => void; more?: boolean }) {
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`admin-drop${dragging ? " is-dragging" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => fileInput.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInput.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        onFiles(e.dataTransfer.files);
      }}
    >
      <span className="admin-drop-icon" aria-hidden="true">
        +
      </span>
      <span className="on-touch">{more ? "Add more photos" : "Tap to add photos"}</span>
      <span className="on-pointer">{more ? "Add more photos" : "Drag photos here, or click to choose them"}</span>
      <input
        ref={fileInput}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        hidden
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function photoStatus(p: Photo) {
  if (p.failed) return "Didn't upload";
  if (p.url) return "Ready";
  if (!p.preview) return "Preparing…";
  return p.progress ? `Uploading ${p.progress}%` : "Uploading…";
}

/** A photo's thumbnail, or a soft placeholder while it's being converted. */
export function PhotoThumb({ photo }: { photo: Photo }) {
  if (!photo.preview) return <span className="admin-thumb-wait" aria-hidden="true" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={photo.preview} alt="" style={{ opacity: photo.url ? 1 : 0.55 }} />;
}
