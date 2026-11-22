"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeQuilt } from "./actions";
import { removePost } from "./journal/actions";

const ACTIONS = { quilt: removeQuilt, post: removePost };

/** A button that asks first, then removes a quilt or journal entry (or undoes edits to a built-in quilt). */
export default function RemoveButton({
  kind,
  slug,
  label,
  confirmText,
}: {
  kind: keyof typeof ACTIONS;
  slug: string;
  label: string;
  confirmText: string;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-ghost"
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmText)) return;
        start(async () => {
          await ACTIONS[kind](slug);
          router.refresh();
        });
      }}
    >
      {pending ? "Working…" : label}
    </button>
  );
}
