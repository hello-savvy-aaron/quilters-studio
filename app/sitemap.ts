import type { MetadataRoute } from "next";
import { familyStories } from "@/lib/family-stories";
import { publishedCollections } from "@/lib/collections";

const base = "https://www.quilters.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/contact",
    "/journal",
    "/on-design",
    "/family-stories",
    ...publishedCollections.map((c) => `/${c.slug}`),
    ...familyStories.map((s) => `/family-stories/${s.slug}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
