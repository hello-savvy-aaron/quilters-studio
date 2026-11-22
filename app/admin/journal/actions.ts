"use server";

import { updateTag } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { isBlobUrl } from "@/lib/blob-entries";
import { JOURNAL_TAG, deleteStudioPost, saveStudioPost, updateStudioPost } from "@/lib/journal";

const NOT_ADMIN = "Posting only works from the studio's own internet connection.";

type PostInput = { title: string; text: string; images: string[] };

function clean(input: PostInput) {
  const title = input.title.trim();
  const body = input.text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!title) return { error: "Please give the entry a title." };
  if (body.length === 0) return { error: "Please write something for the entry." };
  return { post: { title, body, images: input.images.filter(isBlobUrl) } };
}

/** Publish a new entry, or with `slug`, save changes to that one. */
export async function publishPost(input: PostInput, slug?: string) {
  if (!(await isAdmin())) return { error: NOT_ADMIN };
  const result = clean(input);
  if (!result.post) return { error: result.error };

  const post = slug ? await updateStudioPost(slug, result.post) : await saveStudioPost(result.post);
  if (!post) return { error: "That entry couldn't be found. It may have been deleted." };
  updateTag(JOURNAL_TAG);
  return { slug: post.slug };
}

export async function removePost(slug: string) {
  if (!(await isAdmin())) return { error: NOT_ADMIN };
  await deleteStudioPost(slug);
  updateTag(JOURNAL_TAG);
  return {};
}
