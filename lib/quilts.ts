const IMG = "https://blogger.googleusercontent.com/img/a/";
const IMGB = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/";

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
      src: IMG + "AVvXsEgcNA4i8akAR-bSpw0ZOwhoksFQpendpdQRVM5uXDpTHy7FQU1qQQKRKmSv0rO5Zdw0cBSxYa6MfwemAfkRe5rL9SL84rzgR0SQOVNh8vKApfiBVoNrqgw3ejDTIiZPdqxjqzj9Rf1TK_ShkFl2Rnou6xTAj6VpnSVn-3yewHTPwAicUPUsqi-vHSRkpRU",
      alt: "Quilty McQuiltface, a quilted car cover",
    },
    images: [
      {
        src: IMG + "AVvXsEgcNA4i8akAR-bSpw0ZOwhoksFQpendpdQRVM5uXDpTHy7FQU1qQQKRKmSv0rO5Zdw0cBSxYa6MfwemAfkRe5rL9SL84rzgR0SQOVNh8vKApfiBVoNrqgw3ejDTIiZPdqxjqzj9Rf1TK_ShkFl2Rnou6xTAj6VpnSVn-3yewHTPwAicUPUsqi-vHSRkpRU",
        alt: "Version 1 — the drivable car cover",
      },
      {
        src: IMG + "AVvXsEjElOI2jvdsen5CKSgmM4xYL97JQCeOaI4r-RutDF9xj5JfTjnF6HxmHKs9O8JiQhg6D-mA9JtKBJb5hBVkWerLJKtQtcG0dIii0Lal0bHjVcZ7LzSfxcA9tTq7R0-85aR5O6CpwDM4jYtMql6n8no17E3L7ZEtp-Ky0ZCdrh3AUvWZAyzS44sxnwm9Xhk",
        alt: "Version 2 — enlarged for a van, with portraits on the black fabric windows",
        cap: 349,
      },
      {
        src: IMG + "AVvXsEhjppzjWo2feP6StKo96uMNLEHjxtpsAEcKtPmU63AogL_-GWos6pUTfPGM5KktJ8z8JRZ405nzDUX3ZQLOfuGm353OjC_kh3JmT8NIB5ai-Egha4id6kvrAnUP2FT-4P-6QMLy7EW_6Wg6pKnqKaioRUkSbM1tzlzefty_yY3sQC5v9ppljXZAu1p2Vmk",
        alt: "Quilty out on display",
        cap: 419,
      },
      {
        src: IMG + "AVvXsEilBDe0YxB_g78F-IQmBilHG4C7nv9KnnujyF-Ih8If8rJoHRP15NwPYeR0HtKVESg1QGSqJNNyxbQV3wfKshkc--aj1itSCgmtxswBphXrvKidWyI5_DPTqHvifS3FEc7I0_rZcBmFP8z89MOT7x4YX726hLvyNloW_GQWRhtHSxlvS--5LFgtQ743NYA",
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
      src: IMG + "AVvXsEggN-zh7EPn-958FTSq4YEnNXgFGsYiWRaG3ru0o6_ljZ_lk9P8s0nmiOPA_-2JGj2LaJ85l1uWEAHtIpsXrBnkzfV8UY4F7VnF70UTlgzEKmHPzwSctKeLLUB_VETzdWx3_H-Q4d7DWMUo7aHlIc8RVX6vs2waQGht0Maw0Nn5z4uEp8M4ns5mudtU3vo",
      alt: "Sock Hop scrap quilt",
    },
    images: [
      {
        src: IMG + "AVvXsEggN-zh7EPn-958FTSq4YEnNXgFGsYiWRaG3ru0o6_ljZ_lk9P8s0nmiOPA_-2JGj2LaJ85l1uWEAHtIpsXrBnkzfV8UY4F7VnF70UTlgzEKmHPzwSctKeLLUB_VETzdWx3_H-Q4d7DWMUo7aHlIc8RVX6vs2waQGht0Maw0Nn5z4uEp8M4ns5mudtU3vo",
        alt: "Sock Hop, 92 × 82 inches",
      },
      {
        src: IMG + "AVvXsEg_woZ8dkdn7AatdQrx6-Iy7nR8tsPS66L02HOioKqff6OK8GHEPzXWWpW6pe-VVuXyjVfoysJJeMRk2iBmU1wldlbfCz9_1rz_uI51K-AOXaVXuGHOjn-H5n221sreLh76IM71-BsDW9-HAgWf3MyAKk-spmNIrCSws_g-YFC90NP9SZzrDVz0gFctEOI",
        alt: "The poem written on the back",
        cap: 537,
      },
      {
        src: IMG + "AVvXsEge34Q3LBmAZxZ3U8Q5V5a4n7LHvlWyy0BM-tEjoaJzwhfmehy0BrrlpNWU-EqQdlxmmiY4I7n5cMPRlrLZMXer5P2KReZS35iCB_U67BNy4sHHuML0esvmVbJ6HoHiA1o3UU5yNQoSjkU4HYF9e7b7nEKPMQ2ZlIKkxcNTVLeW1QbR7sXQ8Ilg2eq_SbI",
        alt: "Detail",
        cap: 278,
      },
      {
        src: IMG + "AVvXsEjKSHdBzAWd6bIUeZDvZxy5-zXHnW6LkdYGDsQMGmfeFoh7TZs7CnfWPYiaxwUi-utTF4h5j4Y4HRmURyYmqCXK-ccH_0NcJlqhnfB7YE7fbwSg_KIcovVYJeJl_xpmGAitaIF7mtdJWno07oXw7hul--wENR75373CYqgP7wW0sJk1KBbh03FRWS8MgjU",
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
      src: IMG + "AVvXsEjZi44LUzwEuym-vs4Vf5FZmFQwJgXtH7jE7pM3Kj4EFodC6UWjy6iBzEf7gGjmp12h8FWRUETa5BAWlxg5JkyhW8u90AMlVQLCWi_ycw-_CKi1IOh_sXqJj0v9OY72MTaFp650gUnliCx4mxrJonsscEzlrTA7npWP1fGhdIJsOHy2Lt2Y0tzjD7x6T2A",
      alt: "I Scream, You Scream — ice cream cone quilt in batiks",
    },
    images: [
      {
        src: IMG + "AVvXsEjZi44LUzwEuym-vs4Vf5FZmFQwJgXtH7jE7pM3Kj4EFodC6UWjy6iBzEf7gGjmp12h8FWRUETa5BAWlxg5JkyhW8u90AMlVQLCWi_ycw-_CKi1IOh_sXqJj0v9OY72MTaFp650gUnliCx4mxrJonsscEzlrTA7npWP1fGhdIJsOHy2Lt2Y0tzjD7x6T2A",
        alt: "The ice cream cone quilt",
        cap: 417,
      },
      {
        src: IMG + "AVvXsEjwnDM0pz69MiVHI82jGqsBGmnM-y5OA_DOeeFQkKeNsNUuzI4xPCw7bGKEax8pw4p6dCHNKoUBLHZjH2TWy4baXA6dN80d9w6MkGxs9PFEFVlCrteEzwR9OZHGo7f8SP34rp1UQK8_0Ou6ZZrjojN281dTDxlLnzjUniny4aa1iN0ybbP0svQi4n-olHA",
        alt: "Detail — an antique red button for the cherry on top",
        cap: 346,
      },
      {
        src: IMG + "AVvXsEjEQ4yw4gMAtusgXzXn28RV30iOXub9XTWB3GusWh6KVpLU8JGMXmBC0gWR6dGLBc7Yqc-1lS0uvxJAfya8alXhHafhQ6zSVZbuyOoTNCAb12pVhcynKtbVQ4Tu8DpJKPfnepes77C2RnbXJZD288MWuSvxvBUiXlWP5HsWz49T-aRMp_73rSd0T0SIBgg",
        alt: "In Patchwork Quilts magazine",
        cap: 430,
      },
      {
        src: IMG + "AVvXsEjhAfFDdENyLzQ3DvnrjYqC-YMCqNnIb9_6WsLrLDhzpIXOoQsGxKBcIjfiZC6Qq7BbLXON9Z2SVu6DKWfGxGoQzxsDzLEEtQrWx_RGyWRxFlihCVyRg77d97oVFB6oyNOw5cgl8s88T9Iv9vQisOctHRV3UfpBPJch21aEbtd1y_dozDImVlM-m8FiMdk",
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
      src: IMGB + "AVvXsEjIUQs9hWg1X8l5PkOsFxcJ9OGu5zGEmKidyQjvVDB2tFqs61Z3pOIA3encbT_PJvBUXR0XyS-WLiI_nfLYLCA-AfubBh-lH7F1Sn0Fp9zNZiTYkvBgOhywAFGByqzY2v0ofOeTV3yfjzHd_D6cMzon0QddlHkTvycss9yf2oS2nBI19BhQjYRTlPSZu5Y/s1024/IMG_0720.jpeg",
      alt: "My Sunbonnet Sue quilt detail",
    },
    images: [
      {
        src: IMGB + "AVvXsEjIUQs9hWg1X8l5PkOsFxcJ9OGu5zGEmKidyQjvVDB2tFqs61Z3pOIA3encbT_PJvBUXR0XyS-WLiI_nfLYLCA-AfubBh-lH7F1Sn0Fp9zNZiTYkvBgOhywAFGByqzY2v0ofOeTV3yfjzHd_D6cMzon0QddlHkTvycss9yf2oS2nBI19BhQjYRTlPSZu5Y/s1024/IMG_0720.jpeg",
        alt: "Sunbonnet Sue, detail",
      },
      {
        src: IMGB + "AVvXsEjW3NgOPTXjn2ev0pXMGsj8fClWsbLksBJVLVcScSO17CideH8qKjQevH0cIv1DUtPv8wuhzX4__BrSnl82pqny7Qa6RlZHAVUdl4sT3MTc4OiEe7GRu8mxmKuH_S69nPUtK79f_IDlDBiedARP_IlMkSFstQseUg-9XLspPkqwPO1zQtVFoD1yfAupmXM/s1024/IMG_0721.jpeg",
        alt: "Embroidered linens, worn and re-used",
      },
      {
        src: IMGB + "AVvXsEihgpl_Onm7q9tRhWczKxx_i-JcMLpRyDSSVhAzhPRF44G4wNGOiT4fwLp62pjzxiWgrHR0d1Om70Nm4mkEUf6TVNM1T2RceIR-DRsqjPD3rbn_21fVE9Ojk2VtR-_hc8t_NvGTsTtQFOze5iai4pmByQEx4T1VO-2PdtEcLlzuTPNCENPQpaN0z6B8jxY/s1024/IMG_0722.jpeg",
        alt: "Hand quilting by my mother",
      },
      {
        src: IMGB + "AVvXsEhquGg7782JovC402DGcRbpYYidDc2KnG4krcNwQnD4MU9yv1cFThdzKt6hci7hDiNkgGKrRLjJCV6ymo0vF-WOEnPTy5VN1US7kdZXLENjZq_enHjfUmaEcni9-hPs1fuu5LzqPQA9Xdt_hLp4jLfGqS3r2DMOHjRE-07mBTFe9pA3f-pYjDHJxQGKMmE/s1024/IMG_0719.jpeg",
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
      src: IMG + "AVvXsEjDBrgNxR9ZkCicqCkcvaWuJNSmFMXUjUET3uWdJszeTJ-0sItMUgbTQiez-fv-9sQzEf2bLv3_cMqBz0F6yAdm8GLGP-eQL2ioOYtE75eCIhAnodyEeWBjp5p3ytRE0pd0xSG_jJILNtm4DZNVVsDFLClUj57daF4HOZ9hOInAhGNMMoWDeDhzLolFbbQ",
      alt: "Bali scrap wall quilt with filtered light",
    },
    images: [
      {
        src: IMG + "AVvXsEjDBrgNxR9ZkCicqCkcvaWuJNSmFMXUjUET3uWdJszeTJ-0sItMUgbTQiez-fv-9sQzEf2bLv3_cMqBz0F6yAdm8GLGP-eQL2ioOYtE75eCIhAnodyEeWBjp5p3ytRE0pd0xSG_jJILNtm4DZNVVsDFLClUj57daF4HOZ9hOInAhGNMMoWDeDhzLolFbbQ",
        alt: "The finished wall quilt",
        cap: 406,
      },
      {
        src: IMG + "AVvXsEiRUAaNusQtiNpTmF-AGThGo9GzZtWGGHOBQDdQ3GsgoDh6d0XXxxhKAxnoz1FwRAWBpKHbXeTPdB7FFDL7NN-FiWBEzqw3wf7jg9sgAvxjdz7dqrtUgHoMvG1CiTJ-z1lcw338tT1OA2YzcmF-Z_DqaKbOsVXnOvaagwPJ3jnrhQiHS8_0OrBk6dFqGj8",
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
