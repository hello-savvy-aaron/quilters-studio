import { unstable_cache } from "next/cache";
import type { Piece, PieceImage } from "./collections";
import { quilts } from "./quilts";
import { deleteEntry, deleteUnusedPhotos, readEntries, writeEntry } from "./blob-entries";

/**
 * A quilt saved through /admin, stored as JSON in Vercel Blob. Two kinds:
 * - a new quilt, shown on the home page after the built-in ones;
 * - an edited copy of a built-in quilt from lib/quilts.ts (same slug), shown in its place.
 *   Removing the edited copy puts the original back.
 */
export type StudioQuilt = {
  slug: string;
  addedAt: string;
  editedAt?: string;
  title: string;
  body: string[];
  /** The first photo is the main one. */
  photos: PieceImage[];
  quote?: string;
  dimensions?: string;
  year?: string;
  meta?: string;
};

export type QuiltInput = Omit<StudioQuilt, "slug" | "addedAt" | "editedAt">;

const PREFIX = "quilts/entries/";
export const QUILTS_TAG = "quilts";

const builtIn = new Map(quilts.map((q) => [q.slug, q]));

const fetchStudioQuilts = async () =>
  (await readEntries<StudioQuilt>(PREFIX)).sort((a, b) => a.addedAt.localeCompare(b.addedAt));

export const getStudioQuilts = unstable_cache(fetchStudioQuilts, ["studio-quilts"], {
  tags: [QUILTS_TAG],
});

export function toPiece(q: StudioQuilt): Piece {
  return {
    slug: q.slug,
    title: q.title,
    quote: q.quote,
    dimensions: q.dimensions,
    year: q.year,
    meta: q.meta ?? "",
    cover: q.photos[0],
    images: q.photos,
    body: q.body,
  };
}

function fromPiece(p: Piece): StudioQuilt {
  // The cover is usually also the first gallery photo; list it once, first.
  const photos = [p.cover, ...p.images.filter((img) => img.src !== p.cover.src)];
  return {
    slug: p.slug,
    addedAt: "",
    title: p.title,
    body: p.body,
    photos,
    quote: p.quote,
    dimensions: p.dimensions,
    year: p.year,
    meta: p.meta || undefined,
  };
}

export type AdminQuilt = StudioQuilt & {
  /** Written into lib/quilts.ts (can be edited, not removed). */
  builtIn: boolean;
  /** A built-in quilt that has been edited here. */
  edited: boolean;
};

/** Every quilt on the home page, in order, as the admin pages see them. */
export async function getAdminQuilts(): Promise<AdminQuilt[]> {
  const saved = (await getStudioQuilts()).filter((q) => q.photos.length > 0);
  const savedBySlug = new Map(saved.map((q) => [q.slug, q]));
  return [
    ...quilts.map((p) => {
      const override = savedBySlug.get(p.slug);
      return { ...(override ?? fromPiece(p)), builtIn: true, edited: Boolean(override) };
    }),
    ...saved.filter((q) => !builtIn.has(q.slug)).map((q) => ({ ...q, builtIn: false, edited: false })),
  ];
}

export async function getAdminQuilt(slug: string) {
  return (await getAdminQuilts()).find((q) => q.slug === slug);
}

/** Every quilt on the home page: the ones in lib/quilts.ts (with any edits), then the ones added in /admin. */
export async function getAllQuilts(): Promise<Piece[]> {
  return (await getAdminQuilts()).map(toPiece);
}

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "quilt"
  );
}

export async function saveStudioQuilt(input: QuiltInput) {
  const taken = new Set([...builtIn.keys(), ...(await fetchStudioQuilts()).map((q) => q.slug)]);
  const base = slugify(input.title);
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;

  const quilt: StudioQuilt = { slug, addedAt: new Date().toISOString(), ...input };
  await writeEntry(PREFIX, quilt);
  return quilt;
}

/** Save changes to a quilt. The address (slug) stays the same even if the name changes. */
export async function updateStudioQuilt(slug: string, input: QuiltInput) {
  const saved = (await fetchStudioQuilts()).find((q) => q.slug === slug);
  const original = builtIn.get(slug);
  const current = saved ?? (original ? fromPiece(original) : undefined);
  if (!current) return null;

  const quilt: StudioQuilt = {
    ...input,
    slug,
    addedAt: saved?.addedAt || new Date().toISOString(),
    editedAt: new Date().toISOString(),
  };
  await writeEntry(PREFIX, quilt);
  await deleteUnusedPhotos(
    current.photos.map((p) => p.src),
    quilt.photos.map((p) => p.src),
  );
  return quilt;
}

/** Remove a quilt added here, or undo the edits to a built-in one. */
export async function deleteStudioQuilt(slug: string) {
  const saved = (await fetchStudioQuilts()).find((q) => q.slug === slug);
  if (!saved) return false;
  await deleteEntry(PREFIX, slug);
  const original = builtIn.get(slug);
  await deleteUnusedPhotos(
    saved.photos.map((p) => p.src),
    original ? fromPiece(original).photos.map((p) => p.src) : [],
  );
  return true;
}
