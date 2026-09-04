import { quilts } from "./quilts";
import { glassTowers } from "./glass-towers";

export type PieceImage = { src: string; alt: string; cap?: number };

/** One work in a collection: a quilt, a glass tower, whatever comes next. */
export type Piece = {
  title: string;
  /** Gallery-style caption line: year, materials, dimensions. */
  meta: string;
  /** Optional blog post with the full story. */
  link?: string;
  gridNote: string;
  gridTag: string;
  cover: PieceImage;
  images: PieceImage[];
  body: string[];
};

export type Collection = {
  slug: string;
  title: string;
  /** Singular and plural nouns for counts: "quilt" / "quilts". */
  noun: [string, string];
  /** One line under the title on the home page and the collection page. */
  tagline: string;
  intro: string[];
  cover?: PieceImage;
  pieces: Piece[];
  /** Shown in place of the gallery while a collection has no pieces yet. */
  emptyNote?: string;
};

export const collections: Collection[] = [
  {
    slug: "quilts",
    title: "Quilts",
    noun: ["quilt", "quilts"],
    tagline: "Scrap quilts, some of them three thousand pieces and more.",
    intro: [
      "Fifty years of scraps. The quilts here are the ones the family asked to see shared: a quilted car cover built by a guild, a 3,500-piece scrap quilt made in one obsessive stretch, and work that has appeared in Patchwork Quilts magazine and in Georgia Bonesteel’s Quiltmaking Legacy.",
      "Select a work to see more views and read its story.",
    ],
    cover: { src: "/quilts/sock-hop-1.jpg", alt: "Sock Hop, a scrap quilt of 3,500 pieces" },
    pieces: quilts,
  },
  {
    slug: "glass-towers",
    title: "Glass Towers",
    noun: ["tower", "towers"],
    tagline: "A newer series in glass.",
    intro: [
      "Alongside the quilts, a series of towers built in glass. This collection is being photographed and written up now.",
    ],
    pieces: glassTowers,
    emptyNote:
      "Photographs and notes for the glass towers are being gathered. The collection will appear here as soon as they are ready.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function pieceCount(c: Collection): string {
  const n = c.pieces.length;
  if (n === 0) return "Coming soon";
  return `${n} ${n === 1 ? c.noun[0] : c.noun[1]}`;
}
