"use server";

import { updateTag } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { QUILTS_TAG, deleteStudioQuilt, saveStudioQuilt } from "@/lib/studio-quilts";

const NOT_ADMIN = "Adding quilts only works from the studio's own internet connection.";

function isBlobUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function addQuilt(input: {
  title: string;
  story: string;
  photos: { url: string; caption: string }[];
  quote: string;
  dimensions: string;
  year: string;
  meta: string;
}) {
  if (!(await isAdmin())) return { error: NOT_ADMIN };

  const title = input.title.trim();
  const body = input.story
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const photos = input.photos
    .filter((p) => isBlobUrl(p.url))
    .map((p, i) => ({ src: p.url, alt: p.caption.trim() || `${title}, photo ${i + 1}` }));

  if (!title) return { error: "Please give the quilt a name." };
  if (body.length === 0) return { error: "Please write something about the quilt." };
  if (photos.length === 0) return { error: "Please add at least one photo." };

  const optional = (s: string) => s.trim() || undefined;
  const quilt = await saveStudioQuilt({
    title,
    body,
    photos,
    quote: optional(input.quote)?.replace(/^["“]|["”]$/g, ""),
    dimensions: optional(input.dimensions),
    year: optional(input.year),
    meta: optional(input.meta),
  });
  updateTag(QUILTS_TAG);
  return { slug: quilt.slug };
}

export async function removeQuilt(slug: string) {
  if (!(await isAdmin())) return { error: NOT_ADMIN };
  await deleteStudioQuilt(slug);
  updateTag(QUILTS_TAG);
  return {};
}
