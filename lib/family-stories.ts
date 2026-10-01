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
  /** Paragraphs, in order. A `{ heading }` entry starts a new section. */
  body: (string | { heading: string })[];
};

export const familyStories: FamilyStory[] = [
  {
    slug: "quilt-memoirs",
    title: "Quilt memoirs",
    date: "2026",
    summary:
      "The quilt shop in an old Marietta mill, the people who made it, and a few of the quilts that changed how I work.",
    body: [
      { heading: "My quilt shop and quilt guild" },
      "I don’t even know where to start about the wonderful time in my life when I owned a quilt shop. It was meant to be — the hand of fortune, or whatever you believe in, reached out. My husband and I were moving from Atlanta and choosing a place to live, and I chose Marietta because my name is Mary and I’m superstitious about names. The first time we drove into Marietta, I saw a historic mill building that was being used as a drapery workroom, and I turned to my husband and said, “Wow, that would be a great quilt shop.”",
      "Owning a quilt shop was something I had wanted to do for a really long time. My whole background is in retail, and of course my passion is quilting. Quilt shops also run on the owner being involved in everything that goes on, and I was willing to do that. And the merchandise doesn’t age out or go out of style, which in a tough market is very, very important.",
      "I was so lucky, from the very first day, to hire wonderful people, starting with the amazing Sue McBride, who was with me until the day I sold the shop. All I can say is she can do everything, and she did do everything. I planned trips and festivals and all kinds of sewing meetings and marathons, and she was always there. On top of that, she is an exquisite sewer — the person who can make the quilt with fifteen pieces meeting at one point.",
      "There were so many more than I could begin to tell you about, but I can honestly say I loved them all. Alta Miele was a former teacher, a great quilt teacher, and just a wonderful all-around craftswoman. Shannon Baker, who is very well known locally, is an exquisite quilter who can make fifty circles in a row without them being a millimeter apart or a millimeter different. She can do absolutely everything.",
      "Some of them I came to count as really close personal friends. When I go to a quilt show and see them, I tear up just for the joy of it. And of course, I was connected to a really large quilt guild — by the time I left, there were 300 people in it, and so many chances to see beautiful work and get as involved as you wanted to. That thread — no pun intended — runs through all my feelings about quilts and all my love of quilts, and I am so grateful for the people I got to know.",

      { heading: "The first pictorial quilt" },
      "I love this simple quilt. This is the first one where I really tried to make pictures out of simple shapes. I had made a number of repetitive block quilts, had just finished a Christmas one, and was bored. I had a young child at the time, and he and I decided to make a quilt with a little picture for him. I made it and we both liked it. It was the beginning of many more quilts that weren’t built on elaborate, repetitive patterns. This quilt is at least 45 years old.",
      "I feel like it freed me from working within a grid. I had started with three-and-a-half-inch squares, over and over. Soon they became squares of any size with a frame around them. Then any strip that would contribute to a blob of color. That’s the kind of quilt I like best now — in fact, I’m working on one.",

      { heading: "In praise of unknown artisans" },
      "Somebody in my family was always making something. My mother sewed quilts, sewed clothing for all of us, little crinoline dresses for Easter. My father — I would like to say he was creative in some way, but mostly he worked on the car. Keeping the old cars they had running was a part-time job in itself. He would pull the car into the garage, get his tools out, and we’d hear all this clunking. The next thing we’d hear was my younger brother, Billy, imitating his dad right down to the last syllable: “Oh, shit! Oh, shit! Oh, damn, damn.” At first it got a laugh, but then somebody had to explain that this was not the ideal language.",
      "I appreciate now — more, of course, than you do when you’re young — the hours, the history, and the labor that go into so many of the things we buy. And we buy them at a tiny fraction of their real value.",
      "This quilt is a sort of bedspread quilt. I bought it from an African man on the street in Saudi Arabia, though I’ve since been told it probably came from India, given the color palette and the type of cotton. It’s appliqué gone wild. It’s a really big quilt, and every single line, every place where things meet, every detail is turned-under appliqué. For the people who do that — more power to you. All I could think when I looked at it was, my Lord, how long must this have taken? Tiny, perfect stitches, topped off with sequins — which, first of all, is very Indian, and second, I love. Everybody loves a little bling. So hats off to whatever wonderful woman sewed this entire thing. I find it astounding, and every time I take it out it gives me great joy.",
      "When I do quilt shows or talk to quilt groups, people often tell me how talented I am. One of the joys of growing older is that you earn your humility. I always say, thank you very much, but really I’ve only got a teeny teaspoon of talent. What I do have is a lot of interest in what I do, and a way of turning that into a quilt. I don’t make quilts with precision joins of fifteen pieces. I have friends who do, and I can’t say enough how much I admire them. But I find this freehand approach freeing, and I hope you enjoy it too.",

      { heading: "Scrap quilts" },
      "I don’t know if I’m the only quilter who generates more scraps than quilts. Theoretically it should be impossible, but somehow I always end up with a big bundle of scraps in a big basket, waiting to be turned into quilts. Over time I’ve come to like scrap quilts better, because they carry so much nostalgia — my stash got started 45 or more years ago, so seeing some of those oldies but goodies is wonderful.",
      "I also love buttons. This one is a scrap quilt in a bow tie pattern, which is pretty common, made entirely of scraps, with a button in each side of each bow tie, and borders and so on. In some ways it’s kind of useless — I don’t care if it gets beat up. If you want to throw it on a bed and let your kid jump around on it, that’s fine with me. I don’t treat most of my quilts as precious. I’ve never tried to sell this one; I look at it and think, well, who would want this? Presumably somebody in my family will, eventually. But like all my quilts, I think it’s more interesting than a repetitive quilt, if only for the variety of the fabrics.",
    ],
  },
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
