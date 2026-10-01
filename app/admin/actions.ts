"use server";

import { updateTag } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { JOURNAL_TAG, saveStudioPost } from "@/lib/journal";

export async function publishPost(input: { title: string; text: string; images: string[] }) {
  if (!(await isAdmin())) return { error: "This browser isn't set up to post. Open /admin?admin=true first." };

  const title = input.title.trim();
  const body = input.text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!title) return { error: "Please give the entry a title." };
  if (body.length === 0) return { error: "Please write something for the entry." };

  const images = input.images.filter((url) => {
    try {
      return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
    } catch {
      return false;
    }
  });

  const post = await saveStudioPost({ title, body, images });
  updateTag(JOURNAL_TAG);
  return { slug: post.slug };
}
