import type { Piece } from "./collections";

/**
 * Glass towers — add each piece here as photographs and notes arrive.
 * Put images in /public/glass-towers/ and follow the shape used in lib/quilts.ts:
 *
 * {
 *   slug: "tower-name",
 *   title: "Tower name",
 *   quote: "A line about the piece, in Mary Anne's words.", // optional
 *   dimensions: "24 in tall", // optional
 *   year: "2025", // optional
 *   meta: "Glass · anything else worth noting",
 *   cover: { src: "/glass-towers/tower-name-1.jpg", alt: "Tower name" },
 *   images: [{ src: "/glass-towers/tower-name-1.jpg", alt: "Tower name, front" }],
 *   body: ["The full story, a paragraph per line."],
 * }
 */
export const glassTowers: Piece[] = [];
