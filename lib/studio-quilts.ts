import { del, list, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { blobConfigured } from "./blob-config";
import type { Piece, PieceImage } from "./collections";
import { quilts } from "./quilts";

/** A quilt added through /admin. Stored as JSON in Vercel Blob; shown on the home page after the built-in ones. */
export type StudioQuilt = {
  slug: string;
  addedAt: string;
  title: string;
  body: string[];
  /** The first photo is the main one. */
  photos: PieceImage[];
  quote?: string;
  dimensions?: string;
  year?: string;
  meta?: string;
};

const PREFIX = "quilts/entries/";
export const QUILTS_TAG = "quilts";

async function fetchStudioQuilts(): Promise<StudioQuilt[]> {
  if (!blobConfigured()) return [];
  const { blobs } = await list({ prefix: PREFIX });
  const entries = await Promise.all(
    blobs.map(async (b) => (await fetch(b.url, { cache: "no-store" })).json() as Promise<StudioQuilt>),
  );
  return entries.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
}

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

/** Every quilt on the home page: the ones written into lib/quilts.ts, then the ones added in /admin. */
export async function getAllQuilts(): Promise<Piece[]> {
  const added = (await getStudioQuilts()).filter((q) => q.photos.length > 0).map(toPiece);
  return [...quilts, ...added];
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

export async function saveStudioQuilt(input: Omit<StudioQuilt, "slug" | "addedAt">) {
  const taken = new Set([...quilts.map((q) => q.slug), ...(await fetchStudioQuilts()).map((q) => q.slug)]);
  const base = slugify(input.title);
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;

  const quilt: StudioQuilt = { slug, addedAt: new Date().toISOString(), ...input };
  await put(`${PREFIX}${slug}.json`, JSON.stringify(quilt), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
  return quilt;
}

export async function deleteStudioQuilt(slug: string) {
  const quilt = (await fetchStudioQuilts()).find((q) => q.slug === slug);
  if (!quilt) return false;
  await del([`${PREFIX}${slug}.json`, ...quilt.photos.map((p) => p.src)]);
  return true;
}
