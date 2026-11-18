# Quilters Studio

Studio site for Mary Anne Henderson, quilter.

Built with Next.js 16 / React 19 / Tailwind 4. The design is the "L · Index and Pull Quote" direction:
a sage page with deep-green circles in the hero, cream cards, Newsreader headlines, Figtree body,
pill buttons, and a terracotta accent. Tokens are at the top of `app/globals.css`.

## Pages

- `/` — hero, a "Jump to" row, then one card per quilt (`lib/quilts.ts`): main photo, "No. NN" and a
  dimensions/year chip, a thumbnail gallery, and the story. `/quilts` redirects here.
- `/about`, `/contact` — About copy and the contact form.
- `/on-design` — the essay, titled **Talking Design** (the URL is unchanged).
- `/journal`, `/family-stories` — written on the site.
- `/admin` — add a quilt (photos, story, optional pull quote/size/year/details) or remove one added there;
  `/admin/journal` posts journal entries. Both store in Vercel Blob. Quilts added here show on the home page
  after the ones in `lib/quilts.ts`. Built for a phone: iPhone HEIC photos are converted to JPEG in the browser
  (Safari does it natively; other browsers load the `heic-to` decoder only when needed), turned the right way up,
  and shrunk to 2400px on the long edge before uploading (`app/admin/prepare-photo.ts`).

## Admin access

An admin is anyone visiting from an address listed in the `ADMIN_IPS` environment variable (Vercel → Settings →
Environment Variables), comma-separated, e.g. `203.0.113.7` or a range like `2600:1700:abcd:1234::/64`. Everyone
else sees "Nothing to see here." Until `ADMIN_IPS` is set, `/admin` shows the visitor their own address to copy in.
Home internet addresses can change; if `/admin` stops working, update the variable and redeploy.
`pnpm dev` on your own computer always counts as admin.

## Adding to a quilt

Edit its entry in `lib/quilts.ts`. Every field except `slug`, `title`, `cover`, `images`, `body` and `meta` is
optional, and anything left out simply doesn't show: `quote` (pull quote), `dimensions`, `year`.
Photos go in `public/quilts/`. The first photo in `images` that differs from `cover` starts the gallery; a
single extra photo shows with no thumbnails, and none collapses the middle column.

## Glass Towers (hidden)

`published: false` on the collection in `lib/collections.ts` removes it from the footer, sitemap and the web
(`/glass-towers` is a 404). The code and `lib/glass-towers.ts` stay. Set it to `true` to bring it back.

## Contact form

`app/contact/actions.ts` validates and has a honeypot spam trap, but **delivery is not connected yet** (`deliver()`
returns false, so visitors see "couldn't be sent"). Nothing is stored or forwarded.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3002
```

## Deploy

Pushing to `main` auto-deploys via the git-connected Vercel project
(same setup as haka/web). `vercel --prod` also works.
