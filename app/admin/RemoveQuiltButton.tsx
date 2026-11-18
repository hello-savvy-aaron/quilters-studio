"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeQuilt } from "./actions";

export default function RemoveQuiltButton({ slug, title }: { slug: string; title: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-ghost"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Take “${title}” off the site? Its photos will be deleted too.`)) return;
        start(async () => {
          await removeQuilt(slug);
          router.refresh();
        });
      }}
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}
