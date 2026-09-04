# Quilters Studio

Portfolio site for Mary Anne Quilts — Mary Anne Henderson, quilter, Marietta, Georgia.
Fifty years of scraps: the quilts, the design process, and the journal.

Built with Next.js 16 / React 19 / Tailwind 4 (same stack as the hello-savvy apps).
The look follows the "Broadsheet" design spec: Source Serif 4 throughout, process-ink
accents (cyan `#0088b0`, magenta `#d6006c`), and a newspaper-style masthead.

## Pages

- `/` — opens with Mary Anne's biography, then the quilt gallery (each quilt opens
  in an overlay with its story), a short pointer to the essay and journal, and contact.
- `/on-design` — the design essay ("They stick to me like lint") with the animated design wall.
- `/journal` — the index of blog posts; every entry opens on mahquilts.blogspot.com.

Header, masthead, and footer live in `app/layout.tsx` so every page shares them.
Quilt and journal data is in `lib/quilts.ts`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3002
```

## Deploy

Pushing to `main` auto-deploys via the git-connected Vercel project
(same setup as haka/web). `vercel --prod` also works.
