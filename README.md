# Quilters Studio

Studio site for Mary Anne Henderson — quilter, Marietta, Georgia.
Collections of work (quilts now, glass towers to come), an essay on design, and the journal.

Built with Next.js 16 / React 19 / Tailwind 4 (same stack as the hello-savvy apps).
The look is a gallery-style system: Source Serif 4 for display headlines, Inter for
body and labels, one accent (`#0f6f8f`), hairlines, and large images with
gallery-style captions. Tokens live at the top of `app/globals.css`.

## Pages

- `/` — Mary Anne's biography and portraits, then the collections, a pointer to
  the essay and the latest journal entries, and contact.
- `/quilts`, `/glass-towers` — one page per collection, generated from `lib/collections.ts`.
  Each work opens in an overlay with more views and its story.
- `/on-design` — the design essay ("They stick to me like lint") with the animated design wall.
- `/journal` — the index of blog posts; every entry opens on mahquilts.blogspot.com.
- `/family-stories` and `/family-stories/<slug>` — Mary Anne's family history, written on the site
  itself. Stories live in `lib/family-stories.ts`; add an object and it gets a page.

## Adding a collection or a work

- Works for each collection live in their own file (`lib/quilts.ts`, `lib/glass-towers.ts`);
  `lib/collections.ts` lists the collections and their intro copy.
- To add a glass tower: put the photos in `public/glass-towers/` and add an entry to
  `lib/glass-towers.ts` (there is a template in the file). The page fills in on the next deploy.
- To add a whole new collection: create `lib/<name>.ts`, add it to the `collections` array,
  and it gets a page, a card on the home page, and a nav link automatically.

Header and footer live in `components/` and are rendered from `app/layout.tsx`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3002
```

## Deploy

Pushing to `main` auto-deploys via the git-connected Vercel project
(same setup as haka/web). `vercel --prod` also works.
