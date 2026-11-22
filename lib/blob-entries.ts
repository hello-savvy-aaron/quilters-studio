import { del, list, put } from "@vercel/blob";
import { blobConfigured } from "./blob-config";

/**
 * Small JSON records (quilts, journal entries) kept in Vercel Blob, one file per record.
 *
 * Each save writes a brand-new file (a random suffix on the name) and then deletes the older ones, rather
 * than overwriting in place: Blob files are served through a CDN that can keep handing out an old copy of an
 * overwritten file for a while, which would make an edit look like it didn't take.
 */

type Stored<T> = { entry: T; pathnames: string[] };

async function readAll<T extends { slug: string }>(prefix: string): Promise<Map<string, Stored<T>>> {
  const bySlug = new Map<string, Stored<T> & { at: number }>();
  if (!blobConfigured()) return bySlug;

  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const read = await Promise.all(
    blobs.map(async (b) => ({
      blob: b,
      entry: (await (await fetch(b.url, { cache: "no-store" })).json()) as T,
    })),
  );
  for (const { blob, entry } of read) {
    const at = new Date(blob.uploadedAt).getTime();
    const seen = bySlug.get(entry.slug);
    if (!seen) bySlug.set(entry.slug, { entry, at, pathnames: [blob.pathname] });
    else {
      seen.pathnames.push(blob.pathname);
      if (at > seen.at) Object.assign(seen, { entry, at });
    }
  }
  return bySlug;
}

export async function readEntries<T extends { slug: string }>(prefix: string): Promise<T[]> {
  return [...(await readAll<T>(prefix)).values()].map((s) => s.entry);
}

export async function writeEntry<T extends { slug: string }>(prefix: string, entry: T) {
  const old = (await readAll<T>(prefix)).get(entry.slug)?.pathnames ?? [];
  await put(`${prefix}${entry.slug}.json`, JSON.stringify(entry), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: true,
  });
  if (old.length) await del(old);
}

export async function deleteEntry(prefix: string, slug: string) {
  const old = (await readAll<{ slug: string }>(prefix)).get(slug)?.pathnames ?? [];
  if (old.length) await del(old);
}

/** Delete uploaded photos that a record no longer uses. Only Blob photos; files in /public are left alone. */
export async function deleteUnusedPhotos(before: string[], after: string[]) {
  const keep = new Set(after);
  const gone = before.filter((src) => !keep.has(src) && isBlobUrl(src));
  if (gone.length) await del(gone);
}

export function isBlobUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
