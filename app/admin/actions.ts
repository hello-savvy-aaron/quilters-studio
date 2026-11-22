"use server";

import { updateTag } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { isBlobUrl } from "@/lib/blob-entries";
import { QUILTS_TAG, deleteStudioQuilt, saveStudioQuilt, updateStudioQuilt } from "@/lib/studio-quilts";

const NOT_ADMIN = "Changing quilts only works from the studio's own internet connection.";

/** Photos uploaded through /admin, or the site's own quilt photos in public/quilts. */
function isQuiltPhoto(src: string) {
  return isBlobUrl(src) || /^\/quilts\/[a-z0-9-]+\.(jpe?g|png|webp|gif)$/.test(src);
}

type QuiltFormInput = {
  title: string;
  story: string;
  photos: { url: string; caption: string }[];
  quote: string;
  dimensions: string;
  year: string;
  meta: string;
};

function clean(input: QuiltFormInput) {
  const title = input.title.trim();
  const body = input.story
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const photos = input.photos
    .filter((p) => isQuiltPhoto(p.url))
    .map((p, i) => ({ src: p.url, alt: p.caption.trim() || `${title}, photo ${i + 1}` }));

  if (!title) return { error: "Please give the quilt a name." };
  if (body.length === 0) return { error: "Please write something about the quilt." };
  if (photos.length === 0) return { error: "Please add at least one photo." };

  const optional = (s: string) => s.trim() || undefined;
  return {
    quilt: {
      title,
      body,
      photos,
      quote: optional(input.quote)?.replace(/^["“]|["”]$/g, ""),
      dimensions: optional(input.dimensions),
      year: optional(input.year),
      meta: optional(input.meta),
    },
  };
}

/** Add a new quilt, or with `slug`, save changes to that one. */
export async function saveQuilt(input: QuiltFormInput, slug?: string) {
  if (!(await isAdmin())) return { error: NOT_ADMIN };
  const result = clean(input);
  if (!result.quilt) return { error: result.error };

  const quilt = slug ? await updateStudioQuilt(slug, result.quilt) : await saveStudioQuilt(result.quilt);
  if (!quilt) return { error: "That quilt couldn't be found. It may have been removed." };
  updateTag(QUILTS_TAG);
  return { slug: quilt.slug };
}

/** Remove a quilt added here, or put a built-in quilt back the way it was. */
export async function removeQuilt(slug: string) {
  if (!(await isAdmin())) return { error: NOT_ADMIN };
  await deleteStudioQuilt(slug);
  updateTag(QUILTS_TAG);
  return {};
}
