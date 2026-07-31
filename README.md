# Quilters Studio

Portfolio site for Mary Anne Quilts — Mary Anne Henderson, quilter, Marietta, Georgia.
Fifty years of scraps: the quilts, the design process, and the journal.

Built with Next.js 16 / React 19 / Tailwind 4 (same stack as the hello-savvy apps).
The look follows the "Broadsheet" design spec: Source Serif 4 throughout, process-ink
accents (cyan `#0088b0`, magenta `#d6006c`), and a newspaper-style masthead.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3002
```

## Deploy

Pushing to `main` auto-deploys via the git-connected Vercel project
(same setup as haka/web). `vercel --prod` also works.
