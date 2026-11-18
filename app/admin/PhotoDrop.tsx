"use client";

import { useRef, useState } from "react";
import { uploadPresigned } from "@vercel/blob/client";

export type Photo = {
  id: string;
  preview: string;
  url?: string;
  failed?: boolean;
  caption: string;
};

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** Photos chosen in the admin forms, each uploaded to Vercel Blob as soon as it's picked. */
export function usePhotoUploads(folder: "journal/photos" | "quilts/photos") {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [skipped, setSkipped] = useState(false);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const images = Array.from(files).filter((f) => ACCEPTED.includes(f.type));
    setSkipped(images.length < files.length);

    for (const file of images) {
      const id = crypto.randomUUID();
      setPhotos((prev) => [...prev, { id, preview: URL.createObjectURL(file), caption: "" }]);
      const name = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
      uploadPresigned(`${folder}/${name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      })
        .then((blob) => update(id, { url: blob.url }))
        .catch(() => update(id, { failed: true }));
    }
  }

  function update(id: string, patch: Partial<Photo>) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function remove(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function makeFirst(id: string) {
    setPhotos((prev) => [...prev.filter((p) => p.id === id), ...prev.filter((p) => p.id !== id)]);
  }

  return {
    photos,
    addFiles,
    update,
    remove,
    makeFirst,
    clear: () => setPhotos([]),
    uploading: photos.some((p) => !p.url && !p.failed),
    skippedMessage: skipped ? "Some files were skipped — only JPEG, PNG, WebP and GIF photos can be added." : "",
  };
}

/** The dashed "drag photos here" box. */
export function PhotoDrop({ onFiles }: { onFiles: (files: FileList | null) => void }) {
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  return (
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
        onFiles(e.dataTransfer.files);
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
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function photoStatus(p: Photo) {
  return p.failed ? "Didn't upload" : p.url ? "Ready" : "Uploading…";
}
