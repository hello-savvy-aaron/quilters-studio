/**
 * Family stories — Mary Anne's record of the family history, written down as she remembers it.
 * Add a new story as an object below; it gets its own page at /family-stories/<slug>
 * and appears on the index and the home page. Newest first.
 */
export type FamilyStory = {
  slug: string;
  title: string;
  /** Free-form: "Spring 2026", "Undated", a year. */
  date: string;
  /** One or two sentences for the index. */
  summary: string;
  body: string[];
};

export const familyStories: FamilyStory[] = [
  {
    slug: "mike-and-his-plaid-shirts",
    title: "Mike, and his plaid shirts",
    date: "2026",
    summary:
      "My brother-in-law for something like fifty-five years, and in all that time I don’t think I’ve seen him out of a plaid shirt.",
    body: [
      "I have a wonderful brother-in-law, Mike. He’s been my brother-in-law for something like fifty-five years, and in all that time I don’t think I’ve seen him out of a plaid shirt. He’s got that New England thing going — solid, a little wry, entirely himself.",
      "One day I just had an inkling to use shirt material, and once the idea landed I couldn’t shake it. I cut the fronts off ten or twelve shirts and made him a quilt of them, with ties pieced in for the things he likes: a peace sign, a few nods to music he loves. There are suspenders in there too.",
      "My sister Patty — his wife — sent me a picture almost right away, the quilt spread out on their bed in their lovely Cape Cod house. It just fit, like it had always been there.",
    ],
  },
  {
    slug: "my-mother",
    title: "My mother",
    date: "Undated",
    summary: "She lost her mother when she was five and was raised by her dad and older brothers on a small farm.",
    body: [
      "My mother taught me to sew when I was about ten.",
      "She lost her mother when she was five and was raised by her dad and older brothers on a small farm — depression-era not-quite-poverty. I saw the farmhouse when I was little and found it shockingly plain and small; her three or four dresses had fit on a few nails in the wall.",
      "After high school she went to live with a beloved aunt in St. Louis, who was a veritable Martha Stewart and taught her all the household arts, including sewing. I think she became a whole new person in those years. Later, Mom taught me and my sister how to sew clothes and make quilts from the scraps.",
      "I used to embroider linens as gifts for her, and they were badly worn, so I added a few pieces from flea markets to make my version of the old Sunbonnet Sue. The whole thing was done by hand, including the quilting, which my mother did.",
    ],
  },
];

export function getFamilyStory(slug: string): FamilyStory | undefined {
  return familyStories.find((s) => s.slug === slug);
}
