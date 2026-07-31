
export type QuiltImage = { src: string; alt: string; cap?: number };

export type Quilt = {
  title: string;
  meta: string;
  link: string;
  gridNote: string;
  gridTag: string;
  cover: QuiltImage;
  images: QuiltImage[];
  body: string[];
};

export const quilts: Quilt[] = [
  {
    title: "Quilty McQuiltface",
    meta: "Guild project · St. Petersburg, Florida and Marietta, Georgia",
    link: "https://mahquilts.blogspot.com/2026/03/quilty-mcquilftace.html",
    gridNote: "A quilted car cover · guild project, St. Petersburg & Marietta",
    gridTag: "Two versions",
    cover: {
      src: "/quilts/quilty-1.jpg",
      alt: "Quilty McQuiltface, a quilted car cover",
    },
    images: [
      {
        src: "/quilts/quilty-1.jpg",
        alt: "Version 1 — the drivable car cover",
      },
      {
        src: "/quilts/quilty-2.jpg",
        alt: "Version 2 — enlarged for a van, with portraits on the black fabric windows",
        cap: 349,
      },
      {
        src: "/quilts/quilty-3.jpg",
        alt: "Quilty out on display",
        cap: 419,
      },
      {
        src: "/quilts/quilty-4.jpg",
        alt: "The makers, pieced in",
        cap: 416,
      },
    ],
    body: [
      "Quilters will make quilts to cover almost anything. Barbecues and pets are frequent victims, but this is the only quilted car cover I have ever seen. I have had so much fun with it.",
      "The first version was made by my quilt guild in St. Petersburg, Florida, and since we did not cover the windows, it was actually drivable — if somewhat billowy. Everyone waved and honked when we took Quilty on her maiden (and only) voyage. Teenagers especially seemed to get a kick out of the grandma rebels. The police did not. They said they would overlook this one lap, but no more.",
      "At my shop in Marietta, we cannibalized the first cover and enlarged it for a van. Not drivable, but more graphic. The people who made Quilty are on the black fabric windows, along with our rescue poodle, Cookie. Shannon Baker drew and colored the portraits.",
      "How we did it: divide the car into about ten sections, everybody takes a couple, use up extra blocks and scraps, cut each section to a fabric template, then sew the sections together — two people managing the quilt while one sews. If you want to get some attention for your quilt show, I guarantee this project will do it.",
    ],
  },
  {
    title: "Sock Hop",
    meta: "1994 · 92 × 82 in · 3,500 pieces",
    link: "https://mahquilts.blogspot.com/2026/02/sock-hop.html",
    gridNote: "Scraps, satin stitch · 92 × 82 in · 3,500 pieces",
    gridTag: "1994",
    cover: {
      src: "/quilts/sock-hop-1.jpg",
      alt: "Sock Hop scrap quilt",
    },
    images: [
      {
        src: "/quilts/sock-hop-1.jpg",
        alt: "Sock Hop, 92 × 82 inches",
      },
      {
        src: "/quilts/sock-hop-2.jpg",
        alt: "The poem written on the back",
        cap: 537,
      },
      {
        src: "/quilts/sock-hop-3.jpg",
        alt: "Detail",
        cap: 278,
      },
      {
        src: "/quilts/sock-hop-4.jpg",
        alt: "The graffiti backing fabric",
        cap: 278,
      },
    ],
    body: [
      "I love this quilt so much. Tom and I were living in the San Francisco Bay Area in 1994 and he had bought a Bernina for me. My simple Singer had died and I was barely conversant with those mechanics, so I was pretty intimidated by this fancy import.",
      "Tom had to go on a business trip, and I fooled with the Bernina until I could do a few simple things. Mostly I was thrilled with satin stitching.",
      "Since I love the scrap quilts best of all, I made these simple blocks for about twelve hours straight. I was obsessed enough to go on to a border made of one-inch squares and trim made of triangles. It ended up 92 by 82 inches, 3,500 pieces.",
      "The back is my all-time favorite fabric. It looks like graffiti on an old train and says “Hip Hop How Ya Doin” and “You’re Unbelievable.” There is a poem I wrote on the back as well.",
    ],
  },
  {
    title: "I Scream, You Scream",
    meta: "Bali batiks · quilted by Sandy Klop",
    link: "https://mahquilts.blogspot.com/2026/02/i-scream-you-scream.html",
    gridNote: "Antique red buttons for the cherry on top",
    gridTag: "Bali batiks",
    cover: {
      src: "/quilts/i-scream-1.jpg",
      alt: "I Scream, You Scream — ice cream cone quilt in batiks",
    },
    images: [
      {
        src: "/quilts/i-scream-1.jpg",
        alt: "The ice cream cone quilt",
        cap: 417,
      },
      {
        src: "/quilts/i-scream-2.jpg",
        alt: "Detail — an antique red button for the cherry on top",
        cap: 346,
      },
      {
        src: "/quilts/i-scream-3.jpg",
        alt: "In Patchwork Quilts magazine",
        cap: 430,
      },
      {
        src: "/quilts/i-scream-4.jpg",
        alt: "In Georgia Bonesteel’s “Quiltmaking Legacy”",
        cap: 422,
      },
    ],
    body: [
      "When I worked for Bali Fabrications, an importer of batiks in the Bay Area, I made this quilt from their batiks for their booth at a quilt show. The quilting was done by Sandy Klop. Each cone has an antique red button for the cherry on top. Anything to play with buttons and glitz.",
      "The poem around the perimeter reads: “Chocolate for breakfast, and Mocha Nut for lunch / Chocolate Chip for dinner, topped with Fudgie Ripple Crunch / Mud Pie cures the blues and then I’m such a loving wife / Eating ice cream levels out the Rocky Road of life.”",
      "I wrote the poem in fabric ink, which I would not do again — I think it will damage the fabric over time. But what a luxury to use all those beautiful batiks.",
      "After the show, Patchwork Quilts magazine featured it in a piece about ice cream quilts, and later it was included in Georgia Bonesteel’s book “Quiltmaking Legacy.”",
    ],
  },
  {
    title: "My Sunbonnet Sue",
    meta: "Early work · designed and sewn by me, quilted by my mother",
    link: "https://mahquilts.blogspot.com/2026/02/my-sunbonnet-sue.html",
    gridNote: "Embroidered linens and flea-market finds · quilted by my mother",
    gridTag: "Early work",
    cover: {
      src: "/quilts/sunbonnet-sue-1.jpg",
      alt: "My Sunbonnet Sue quilt detail",
    },
    images: [
      {
        src: "/quilts/sunbonnet-sue-1.jpg",
        alt: "Sunbonnet Sue, detail",
      },
      {
        src: "/quilts/sunbonnet-sue-2.jpg",
        alt: "Embroidered linens, worn and re-used",
      },
      {
        src: "/quilts/sunbonnet-sue-3.jpg",
        alt: "Hand quilting by my mother",
      },
      {
        src: "/quilts/sunbonnet-sue-4.jpg",
        alt: "The whole quilt",
      },
    ],
    body: [
      "My mother taught me to sew when I was about ten. She had lost her mother at five and was raised by her dad and older brothers on a small farm. Later she went to live with a beloved aunt in St. Louis who taught her all the household arts, including sewing — and then she taught me and my sister to sew clothes and make quilts from the scraps.",
      "This is an early quilt, designed and sewn by me. I used to embroider linens as gifts for her, and they were badly worn, so I added a few pieces from flea markets to make my version of the old Sunbonnet Sue.",
      "The whole thing was done by hand, including the quilting, which my mother did. I do not know why the quilts I make often get so big.",
    ],
  },
  {
    title: "Light and Twinkle",
    meta: "Wall quilt · scraps from Bali Fabrications",
    link: "https://mahquilts.blogspot.com/2026/02/dynamic-design-part-2.html",
    gridNote: "Bali Fabrications scraps · taken apart once, and better for it",
    gridTag: "Wall quilt",
    cover: {
      src: "/quilts/light-twinkle-1.jpg",
      alt: "Bali scrap wall quilt with filtered light",
    },
    images: [
      {
        src: "/quilts/light-twinkle-1.jpg",
        alt: "The finished wall quilt",
        cap: 406,
      },
      {
        src: "/quilts/light-twinkle-2.jpg",
        alt: "Chopped corners filled with bright scraps",
        cap: 284,
      },
    ],
    body: [
      "This wall quilt is a perfect example of how designs evolve. I was lucky, because so many of the parameters were already fixed: a bunch of scraps from Bali Fabrications, and the colors were as you see them.",
      "First I made all these squares with contrasting centers, meaning to place them lightest to dark. I had vague ideas about a sun in the corner. But when I began to assemble them, the effect was too static — muddy instead of the natural feeling I wanted.",
      "So I took it apart. My goal was to infuse light and twinkle. Small yellow squares were awkward; the heaviness was coming from those conventional squares. Then I chopped off a little corner of a square, filled it in with a bright scrap, and voilà — motion, filtered light, a softer magical feel.",
      "It is the perfect little quilt for a lot of small spaces. Like all design, a series of small decisions.",
    ],
  },
];

export type JournalPost = { date: string; title: string; excerpt: string; link: string };

export const journalPosts: JournalPost[] = [
  {
    date: "March 11, 2026",
    title: "Quilty McQuiltface",
    excerpt:
      "Quilters will cover almost anything. Barbecues and pets are frequent victims, but this is the only quilted car cover I've ever seen.",
    link: "https://mahquilts.blogspot.com/2026/03/quilty-mcquilftace.html",
  },
  {
    date: "February 25, 2026",
    title: "Dynamic Design, Part 2",
    excerpt: "The effect was too static. Somehow it felt muddy instead of natural. So I took it apart.",
    link: "https://mahquilts.blogspot.com/2026/02/dynamic-design-part-2.html",
  },
  {
    date: "February 22, 2026",
    title: "Dynamic Design",
    excerpt: "A family friend asked me for design advice for a wall quilt. Of course I love to talk about design.",
    link: "https://mahquilts.blogspot.com/2026/02/dynamic-design.html",
  },
  {
    date: "February 14, 2026",
    title: "Sock Hop",
    excerpt: "I made these simple blocks for about twelve hours straight. I love this quilt so much.",
    link: "https://mahquilts.blogspot.com/2026/02/sock-hop.html",
  },
  {
    date: "February 10, 2026",
    title: "I Scream, You Scream",
    excerpt: "Each cone has an antique red button for the cherry on top. Anything to play with buttons and glitz.",
    link: "https://mahquilts.blogspot.com/2026/02/i-scream-you-scream.html",
  },
  {
    date: "February 8, 2026",
    title: "My Sunbonnet Sue",
    excerpt:
      "My mother taught me to sew when I was about ten. Later she taught me and my sister to make quilts from the scraps.",
    link: "https://mahquilts.blogspot.com/2026/02/my-sunbonnet-sue.html",
  },
];
