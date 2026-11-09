import { quilts } from "./quilts";
import { glassTowers } from "./glass-towers";

export type PieceImage = { src: string; alt: string };

/** One work in a collection: a quilt, a glass tower, whatever comes next. */
export type Piece = {
  /** URL name: /quilts/<slug>. Lowercase words joined with hyphens. */
  slug: string;
  title: string;
  /** Optional pull quote: a line from the story, in Mary Anne's words. Omitted when not supplied. */
  quote?: string;
  /** Shown in the chip under the lead photo, e.g. "92 × 82 in" and "1994". Leave out if unknown. */
  dimensions?: string;
  year?: string;
  /** Other information about the quilt: materials, who quilted it, where it lives. */
  meta: string;
  /** The old blog post this story came from (kept for reference; not shown on the site). */
  link?: string;
  cover: PieceImage;
  images: PieceImage[];
  body: string[];
};

export type Collection = {
  slug: string;
  title: string;
  /** Singular and plural nouns for counts: "quilt" / "quilts". */
  noun: [string, string];
  /** One line under the title on the collection page. */
  tagline: string;
  cover?: PieceImage;
  pieces: Piece[];
  /** Shown in place of the gallery while a collection has no pieces yet. */
  emptyNote?: string;
  /**
   * false hides the collection everywhere: no page (404), no links, no sitemap entry.
   * The code and content stay, so flipping this back to true brings it back.
   */
  published: boolean;
};

export const collections: Collection[] = [
  {
    slug: "quilts",
    title: "Quilts",
    noun: ["quilt", "quilts"],
    tagline: "Scrap quilts, some of them three thousand pieces and more.",
    cover: { src: "/quilts/sock-hop-1.jpg", alt: "Sock Hop, a scrap quilt of 3,500 pieces" },
    pieces: quilts,
    // Quilts are shown on the home page, so there is no /quilts page (it redirects to /).
    published: false,
  },
  {
    slug: "glass-towers",
    title: "Glass Towers",
    noun: ["tower", "towers"],
    tagline: "A newer series in glass.",
    pieces: glassTowers,
    emptyNote:
      "Photographs and notes for the glass towers are being gathered. The collection will appear here as soon as they are ready.",
    // Hidden until the owner is ready to take this on. Set to true to bring back /glass-towers.
    published: false,
  },
];

/** Collections that get their own page at /<slug>. */
export const publishedCollections = collections.filter((c) => c.published);

export function getCollection(slug: string): Collection | undefined {
  return publishedCollections.find((c) => c.slug === slug);
}

export function pieceCount(c: Collection): string {
  const n = c.pieces.length;
  if (n === 0) return "Coming soon";
  return `${n} ${n === 1 ? c.noun[0] : c.noun[1]}`;
}
