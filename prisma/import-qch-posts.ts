import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

const posts = [
  {
    title: "[REVIEW] Mi Cariño 🌮",
    category: "🌮",
    coverImage: "/uploads/mi-carino.jpg",
    publishedAt: "2026-07-21",
    excerpt:
      "Summer in Charlotte is a war of attrition, and the only real strategy is margaritas and tacos. After a promising first visit back in May, I finally returned to Mi Cariño in South End for the full review treatment. The restaurant took over the old VANA space near VINYL and Wooden Robot, and if you're mapping it, search for its full legal name: The Story of Mi Cariño. Parking is a gamble (street or paid lot, mentally prepare), but the space itself is genuinely striking — vibrant, intimate, all the words I'm contractually obligated to avoid sounding like ChatGPT while using. More on the tacos below.",
  },
  {
    title: "[REVIEW] Spaghett 🤌",
    category: "🤌",
    coverImage: "/uploads/spaghett.jpg",
    publishedAt: "2026-05-19",
    excerpt:
      "Nearly a year after Spaghett opened in a charming 130-year-old Fourth Ward house, I finally snagged a second reservation — this time for a full review. My first visit left me dreaming about their burrata and a country-ham casarecce for months, so I returned hoping to find them again. Instead, Spaghett quietly overhauled its entire concept into a $70-per-person, four-course prix fixe. Still cozy, still charming (rechargeable table lamps aside — bring back candles), I went in open-minded with a Spaghett Martini in hand: Sutler's Gin and pickled vermouth. Verdict on the new format, the redfish crudo, and that chocolate rollo, below.",
  },
  {
    title: "[REVIEW] Bird Pizzeria 🍕",
    category: "🍕",
    coverImage: "/uploads/bird-pizzeria.jpg",
    publishedAt: "2026-04-21",
    excerpt:
      "Bird Pizzeria has been living rent-free in my head for months — ever since Dave Portnoy gave their pizza a controversial 7/10 and their kale caesar (equal parts salad and English sheepdog) went viral on TikTok. Reservations vanished overnight. My own hunt took months, landing me a July 4th slot for a restaurant that, it turned out, wasn't even open that day. I finally got seated in their dining room on October 3rd — Mean Girls Day, obviously — after months of to-go pies from the walk-up window. Expectations were sky-high. Here's whether the most talked-about pizza in Charlotte held up.",
  },
  {
    title: "[REVIEW] Leluia Hall 🍹",
    category: "🍹",
    coverImage: "/uploads/leluia-hall.jpg",
    publishedAt: "2025-07-15",
    excerpt:
      "Leluia Hall, the new surf-and-turf spot from the Haberdish and Ever Andalo team, has been open about two and a half months in Dilworth, tucked into a renovated church that can't quite decide if it's channeling Old South or Gone With the Wind. I went in with modest expectations (surf-and-turf, inside a former sanctuary?) and ordered the first of what would be several frozen piña coladas. The interior is genuinely beautiful — modern, whimsical, two cocktail bars and a raw bar — though our seat next to the smaller bar came with a side of chaos. Full verdict on the Hawaiian rolls and sugar steaks ahead.",
  },
  {
    title: "[REVIEW] Sora ✨",
    category: "✨",
    coverImage: "/uploads/sora.jpg",
    publishedAt: "2025-07-01",
    excerpt:
      "After a string of tasting menus left me running on fumes, I walked into Sora — the new French-Asian tasting concept in Myers Park — with unusually low expectations. Their Instagram's heavy sparkle-emoji usage wasn't inspiring confidence, and the restaurant is still hiding behind an unfortunate temporary banner instead of a real sign (please, lean into the mystery or put up the sign, there is no in-between). Sleek, modern exterior aside, I went in with an open mind and an open stomach for cold ramen and what may be the most unexpectedly massive sandwich of the tasting menu circuit. Full breakdown below.",
  },
  {
    title: "[REVIEW] Counter-",
    category: "🍽️",
    coverImage: "/uploads/counter.jpg",
    publishedAt: "2025-06-10",
    excerpt:
      "Next up in my ongoing series 'how many $200+ tasting menus can I survive,' I finally made it to Counter- in Wesley Heights — James Beard finalist Chef Sam Hart's Michelin-buzzed, regionally-themed tasting concept. This run's theme is 'Piedmont' (following Coastal, before Mountains), 13 courses for $225. The night started with a mild panic when I was seated at a shared four-top for what turned out to be merely the pre-dinner snack round — followed by tablemates who'd been 18 times and had recommendations. Whether the Piedmont menu, the chicken sandwich, and that breakfast burrito lived up to the hype, below.",
  },
  {
    title: "[REVIEW] Omakase Experience by Prime Fish",
    category: "🍶",
    coverImage: "/uploads/omakase.jpg",
    publishedAt: "2025-05-27",
    excerpt:
      "Omakase Experience by Prime Fish has been near the top of my list for a while, thanks to relentless local buzz naming it one of Charlotte's few real shots at a Michelin star. After nearly walking into the wrong Prime Fish (there are three: Sushi, Cellar, and Omakase Experience, all clustered at Sharon and Providence), I settled in for 15 courses at $300 a head — my most expensive meal yet in the name of this newsletter. Expectations were sky-high, my body was recovering from a week-long cold, and I was ready to find out if this was Charlotte's next Michelin contender.",
  },
  {
    title: "[REVIEW] Restaurant Constance",
    category: "🌱",
    coverImage: "/uploads/restaurant-constance.jpg",
    publishedAt: "2025-04-15",
    excerpt:
      "'Farm-to-table' has become more branding than movement — thank you, shiplap and Joanna Gaines — but Chef Sam Diminich of Restaurant Constance actually means it. His Wesley Heights spot pairs a cozy, unpretentious dining room (vinyl records, skateboard decks, a projected documentary of the actual farms he sources from) with a menu built on real local growers rather than a farmhouse-chic aesthetic. I went in skeptical of anywhere that leans this hard into the 'farm' story, but came away believing it. Smoked chicken lettuce wraps, a take-home dessert, and a wine tasting paired with Miller High Life — details below.",
  },
  {
    title: "[REVIEW] L'Ostrica",
    category: "🦪",
    coverImage: "/uploads/lostrica.jpg",
    publishedAt: "2025-03-11",
    excerpt:
      "After a scarring nine-course tasting menu experience two years ago (full-size communal-table courses — we do not speak of it), I was cautiously optimistic about giving tasting menus another shot at L'Ostrica, a spot I've apparently driven past almost daily without noticing. The $110-per-person tasting menu offers the rare, genuine relief of zero decisions: no menu, no choices, just five to seven courses and total trust in the kitchen. The open-concept dining room — bar, lounge, and plating station all in one airy room — made the whole thing feel less isolating. Six courses, one very good martini, and the cutest cup I've seen all year, ahead.",
  },
  {
    title: "[REVIEW] Oshen 🍣",
    category: "🍣",
    coverImage: "/uploads/oshen.jpg",
    publishedAt: "2025-03-04",
    excerpt:
      "Oshen sits in the kind of suburban strip mall that shares a parking lot with a Papa John's and a Jersey Mike's — not exactly a promising sign. But behind that unassuming brick exterior is a sleek, modern space that would fit right into any of Charlotte's trendier neighborhoods. After a quick lunch visit landed their $12 bento box in a round-up instead of a full review, I went back to actually dig into the menu: a wasabi martini, miso soup that's somehow better than the usual version every restaurant serves, and a tuna tartare that more than made up for the location.",
  },
  {
    title: "[REVIEW] Albertine 🍴",
    category: "🍴",
    coverImage: "/uploads/albertine.jpg",
    publishedAt: "2025-02-11",
    excerpt:
      "I've had a rocky history with the Kindred restaurant empire — milkbread and Kindred never quite won me over, though Hello, Sailor still reigns supreme in my book. Their biggest swing yet, Albertine, opened in Uptown three months ago with a Mediterranean-meets-Southern-flair menu inside an otherwise soulless corporate office building. The exterior gives zero indication of what's inside: sky-high ceilings, herringbone wood floors, marble I wanted to chisel off and take home. We opted for a dining room booth over the lounge, which was the correct call. A $25 martini, shockingly good dates, and a steak-and-frites situation worth discussing, ahead.",
  },
  {
    title: "[REVIEW] Rada 🍸",
    category: "🍸",
    coverImage: "/uploads/rada.jpg",
    publishedAt: "2025-01-14",
    excerpt:
      "My very first restaurant review (be gentle) takes on Rada, the new Myers Park spot that quietly opened in the old littleSpoon space with zero menu posted online — an approach that felt less mysterious and more like stalking an ex's private Instagram. Braving 29-degree weather to actually leave my house, I found a cozy, moodily-lit room with arched doorways and globe lights that felt more NYC side-street than Charlotte. One mildly infuriating catch: you have to order your entire meal upfront instead of pacing it out, which is a personal nightmare for anyone medicated for anxiety. Full rundown of the food ahead.",
  },
];

async function uniqueSlug(base: string) {
  const baseSlug = slugify(base, { lower: true, strict: true }) || "post";
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
}

async function main() {
  for (const p of posts) {
    // Check by the slug this title would generate, not the title itself —
    // clean-titles.ts renames the title after creation (stripping the
    // "[REVIEW]" prefix and emoji), so matching on title would never find
    // the existing post on subsequent runs and would create a duplicate.
    const expectedSlug = slugify(p.title, { lower: true, strict: true }) || "post";
    const existing = await prisma.post.findUnique({
      where: { slug: expectedSlug },
    });
    if (existing) {
      console.log(`Skipping existing post: ${p.title}`);
      continue;
    }
    const slug = await uniqueSlug(p.title);
    const publishedAt = new Date(p.publishedAt);
    await prisma.post.create({
      data: {
        title: p.title,
        slug,
        coverImage: p.coverImage,
        excerpt: p.excerpt,
        content: `<p>${p.excerpt}</p>`,
        published: true,
        publishedAt,
        createdAt: publishedAt,
      },
    });
    console.log(`Created: ${p.title} (${slug})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
