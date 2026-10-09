import { list, put } from "@vercel/blob";
import { blobConfigured } from "./blob-config";
import { unstable_cache } from "next/cache";
import { journalPosts } from "./quilts";

export type StudioPost = {
  slug: string;
  title: string;
  publishedAt: string;
  body: string[];
  images: string[];
};

export type JournalEntry = {
  title: string;
  date: string;
  excerpt: string;
  href: string;
  external: boolean;
  sortKey: number;
};

const POSTS_PREFIX = "journal/posts/";
export const JOURNAL_TAG = "journal";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

function excerptOf(post: StudioPost) {
  const first = post.body[0] ?? "";
  if (first.length <= 180) return first;
  return first.slice(0, first.lastIndexOf(" ", 180)) + "…";
}

async function fetchStudioPosts(): Promise<StudioPost[]> {
  if (!blobConfigured()) return [];
  const { blobs } = await list({ prefix: POSTS_PREFIX });
  const posts = await Promise.all(
    blobs.map(async (b) => (await fetch(b.url, { cache: "no-store" })).json() as Promise<StudioPost>),
  );
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const getStudioPosts = unstable_cache(fetchStudioPosts, ["studio-posts"], {
  tags: [JOURNAL_TAG],
});

export async function getStudioPost(slug: string) {
  return (await getStudioPosts()).find((p) => p.slug === slug);
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const studio = (await getStudioPosts()).map((p) => ({
    title: p.title,
    date: formatDate(p.publishedAt),
    excerpt: excerptOf(p),
    href: `/journal/${p.slug}`,
    external: false,
    sortKey: Date.parse(p.publishedAt),
  }));
  const blog = journalPosts.map((p) => ({
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    href: p.link,
    external: true,
    sortKey: Date.parse(p.date),
  }));
  return [...studio, ...blog].sort((a, b) => b.sortKey - a.sortKey);
}

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "entry"
  );
}

export async function saveStudioPost(input: { title: string; body: string[]; images: string[] }) {
  const taken = new Set((await fetchStudioPosts()).map((p) => p.slug));
  const base = slugify(input.title);
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;

  const post: StudioPost = { slug, publishedAt: new Date().toISOString(), ...input };
  await put(`${POSTS_PREFIX}${slug}.json`, JSON.stringify(post), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
  return post;
}
