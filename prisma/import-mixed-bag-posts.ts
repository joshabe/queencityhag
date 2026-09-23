import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

const PLACEHOLDER = "/uploads/placeholder-mention.png";

type Entry = {
  title: string;
  city: string;
  sourceUrl: string;
  coverImage: string;
  publishedAt: string;
  excerpt: string;
};

const posts: Entry[] = [
  // --- Charlotte, NC ---
  {
    title: "Groucho's Deli",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/2-review-rada-in-myers-park",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-14",
    excerpt:
      "The 'White Moose' combo — a microwave-melted deli sandwich that leans entirely on its Formula 45 dipping sauce, which the hag would happily be embalmed in. Not a sexy order, but an honest one.",
  },
  {
    title: "Bar à Vins",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/5-a-sandwich-epiphany",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-04",
    excerpt:
      "'Even Fancier Caviar Service,' served with Lay's and crème fraîche — the ultimate bougie bar snack. Once you go fancier, there's no going back.",
  },
  {
    title: "Milkbread",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/2-review-rada-in-myers-park",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-14",
    excerpt:
      "A new buffalo chicken wrap that arrived unheated and immediately fell apart — great flavor undermined by a genuinely harrowing eating experience. The sourdough bagel sandwiches were, of course, already sold out.",
  },
  {
    title: "Chief's",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/2-review-rada-in-myers-park",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-14",
    excerpt:
      "An 'Apple Brandy Should Be More of a Thing' cocktail that mostly tasted like apple juice despite a promising honey miso syrup — but a genuinely fun order of Tinned Oysters Rockefeller. Add hot sauce.",
  },
  {
    title: "Schreiber's on Rye",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/3-farewell-to-noche-bruta",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-21",
    excerpt:
      "'The 54th' sandwich, elevated by crispy bacon and a good baguette, paired with a matzo ball soup that delivers every single time.",
  },
  {
    title: "The Bar at Optimist Hall",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/29-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-07-22",
    excerpt:
      "Formerly Spindle Bar, now rebranded and run by Canopy Cocktails and Charlotte Beer Garden — the frozen drinks (a 'Miami Vice' on repeat) haven't missed a beat.",
  },
  {
    title: "Stable Hand",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/3-farewell-to-noche-bruta",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-21",
    excerpt:
      "A quick draft vanilla iced latte grabbed on a packed Sunday morning — the breakfast sandwiches looked tempting, but the crowd said otherwise.",
  },
  {
    title: "Room Service",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/3-farewell-to-noche-bruta",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-21",
    excerpt:
      "The 'Jeff Goldblum Drinks for Free' cocktail: tequila and mezcal with hibiscus, blood orange, and lime. A delightful order — and yes, Jeff Goldblum should always drink for free.",
  },
  {
    title: "Capishe",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/3-farewell-to-noche-bruta",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-21",
    excerpt:
      "A delivery-order margherita pizza that didn't quite land — the rigatoni is usually the better call here, though a rough week may have thrown the taste buds off.",
  },
  {
    title: "Boxcar Betty's",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/3-a-quest-for-the-best-dumplings",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-28",
    excerpt:
      "The reigning favorite chicken sandwich in Charlotte for a long stretch — the 'Plain Jane,' topped with mayo, lettuce, pickles and tomato, plus a honey mustard worth ordering on the side. Since closed, and missed.",
  },
  {
    title: "Papi Queso",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/3-a-quest-for-the-best-dumplings",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-01-28",
    excerpt:
      "Garlic tots that beat out fries entirely — tossed in garlic and parmesan and served with a truffle aioli deemed simply 'beautiful.'",
  },
  {
    title: "Brawley's",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/32-the-hag-is-back",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-11-11",
    excerpt:
      "A few pumpkin ciders enjoyed on the patio, surrounded by dozens of screaming kids. Not much, but honest work — and yes, that Michelin bathroom photo really was taken here.",
  },
  {
    title: "Culture Shop",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/5-a-sandwich-epiphany",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-04",
    excerpt:
      "Home to the No. 1 ranked sandwich in a three-way showdown: the Muenster Mash, built on herbed focaccia with a toasted garlic aioli so good it should be a permanent menu item, not a rotating special.",
  },
  {
    title: "Fin & Fino",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/6-review-albertine-in-uptown",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-11",
    excerpt:
      "A pre-dinner cocktail stop on the way to Albertine — the 'Dibs on Bunk 10,' reminiscent of a negroni with a little less bite. Really good.",
  },
  {
    title: "The Jimmy",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/6-review-albertine-in-uptown",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-11",
    excerpt:
      "The 'Salsiccia' pizza — house-made fennel sausage, ricotta, red onion and arugula. Really tasty, if a little too floppy for a structural purist.",
  },
  {
    title: "Suárez Bakery",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/6-review-albertine-in-uptown",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-11",
    excerpt:
      "A 6-inch Chocolate Diplomat cake commissioned for a birthday celebration — though the giant donut cakes remain the bigger personal favorite here.",
  },
  {
    title: "Flower Child",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/6-review-albertine-in-uptown",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-11",
    excerpt:
      "A tofu bowl anchored by yuzu brussels sprouts, red chile glazed sweet potatoes, and a black truffle hot sauce upgrade that ties the whole thing together.",
  },
  {
    title: "Reid's Fine Foods",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/6-review-albertine-in-uptown",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-11",
    excerpt:
      "The worst truffle fries encountered anywhere — undercooked, soggy, and topped with what looked suspiciously like jarred grocery-store garlic posing as parmesan. A rough week for frites all around.",
  },
  {
    title: "Ever Andalo",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A NoDa longtime favorite revisited — fluffy focaccia, a white balsamic and herb mignonette on the oysters, and a Calabrian chili pappardelle so silky it barely needs a plug. She's stunning.",
  },
  {
    title: "Harriet's Hamburgers",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/12-patio-weather-is-here-bitches",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-03-25",
    excerpt:
      "'The O.G.' edges out 'The Royale' here — lacy-edged patties, a genuinely great 'Simple Sauce,' and fries worth getting obsessed with.",
  },
  {
    title: "Superica",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/12-patio-weather-is-here-bitches",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-03-25",
    excerpt:
      "A Strawberry Hill Tex-Mex spot with free chips, salsa, and margaritas good enough to make adult coloring pages at the table feel like a completely reasonable dinner activity.",
  },
  {
    title: "Gravity Sourdough Pizza",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/13-say-hello-uncle",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-01",
    excerpt:
      "A 'Shroom City' pizza slice with a perfectly crispy crust, dipped heavily in hot honey ranch, plus a 'Honey Ricotta' sandwich that reads like an elevated stromboli. They also serve Capri Suns.",
  },
  {
    title: "Burial Beer Co.",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/13-say-hello-uncle",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-01",
    excerpt:
      "A patio beer ('One of Us Will Have to Bury the Other') enjoyed between sneezing fits during peak Charlotte pollen season — a favorite for the drinks-other-than-beer selection alone.",
  },
  {
    title: "El Malo Tacos",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/13-say-hello-uncle",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-01",
    excerpt:
      "A first visit that didn't land — an overpriced, unsalted margarita, no queso on the menu, and only two shrimp on the shrimp taco. Three strikes.",
  },
  {
    title: "Boading",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/16-youre-now-getting-de-influenced",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-22",
    excerpt:
      "Veggie lettuce wraps and chicken with mixed veggies from a Charlotte institution that's been serving Chinese food since 1993 — a low-key favorite for a birthday dinner in.",
  },
  {
    title: "Enat Ethiopian",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/16-youre-now-getting-de-influenced",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-22",
    excerpt:
      "The giant Passport Platter at this long-time-coming Optimist Hall stop — every component was flavorful, and the fosolia stole the show.",
  },
  {
    title: "Bakersfield",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/17-pop-ups-are-my-new-hobby",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-29",
    excerpt:
      "Huitlacoche and fish tacos plus a 'Skinny' Margarita, best enjoyed post-8K — the queso remains great even without the option to add pickled jalapeños anymore.",
  },
  {
    title: "Jeni's",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/17-pop-ups-are-my-new-hobby",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-29",
    excerpt:
      "A reliable stop for a half scoop of Brambleberry Crisp — the safe, correct order after one too many experimental flavor detours.",
  },
  {
    title: "Lost Worlds Brewing",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/17-pop-ups-are-my-new-hobby",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-29",
    excerpt:
      "A citrus-forward beer with none of the usual gross IPA taste, released for the Elizabeth 8K and good enough to order again despite not being much of a beer person.",
  },
  {
    title: "Substrate",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/17-pop-ups-are-my-new-hobby",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-29",
    excerpt:
      "A low-key wine bar with a genuinely great sparkling chenin blanc selection — the kind of spot worth swinging by just to see who's there.",
  },
  {
    title: "Ru San's",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/18-a-star-studded-reckoning",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-06",
    excerpt:
      "Not the best sushi in Charlotte, despite what some will fight you on, but a perfectly solid rotation of the Selfie, Kiss of Fire, and Cowboy Maki rolls.",
  },
  {
    title: "Yafo Kitchen",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/18-a-star-studded-reckoning",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-06",
    excerpt:
      "Musakhan chicken pita tacos that read more like mini gyros than advertised — decent flavor, slightly mushy texture, but the Turkish street corn with feta was fire.",
  },
  {
    title: "Idlewild",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/19-slice-slice-baby",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-13",
    excerpt:
      "A tequila-forward cocktail built around bitter Bruto Americano that threw off the original ask but led to better custom variations on repeat visits.",
  },
  {
    title: "Folia",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/19-slice-slice-baby",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-13",
    excerpt:
      "A wild, ai-generated-cocktail-bar-feeling spot next door to PIE.ZAA — the drink ordered ran overly sweet and foamy, but the space itself is worth the detour.",
  },
  {
    title: "River's Edge Grill",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/20-the-hag-answers-questions",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-20",
    excerpt:
      "A Southwest Smoked Chicken salad at the Whitewater Center, jalapeño ranch included — exactly what's needed before donning a harness for a ropes course.",
  },
  {
    title: "Marina's Tapas",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/20-the-hag-answers-questions",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-20",
    excerpt:
      "An Optimist Hall newcomer — croquetas, calamares fritos, ensaladilla rusa and albondigas, none of which were a total blow-away, though the calamari edged out the rest.",
  },
  {
    title: "Stagioni",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/20-the-hag-answers-questions",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-05-20",
    excerpt:
      "A great first visit built around focaccia, tuna crudo, and soppressata pizza — good enough to require a return trip with a camera this time.",
  },
  {
    title: "Salud Cerveceria",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/22-cocktails-and-contemplation",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-03",
    excerpt:
      "Low expectations for a Breakfast Crunch Wrap were completely shattered — order it with sausage and thank later.",
  },
  {
    title: "Pasta & Provisions",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/22-cocktails-and-contemplation",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-03",
    excerpt:
      "Frozen Italian sausage swapped into the usual meatball meal deal, paired with the vodka cream sauce and a side of devastation over being out of focaccia. Getting the sausage version again.",
  },
  {
    title: "Hello Uncle",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/32-the-hag-is-back",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-11-11",
    excerpt:
      "Khao mun gai tod — super crispy fried chicken over rice with an addictive kmg sauce — plus charred cabbage, bahn khot, and sesame balls worth ordering a dozen more of.",
  },
  {
    title: "Hex",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/27-5-things-i-consumed-last-week",
    coverImage: "/uploads/hex.jpg",
    publishedAt: "2025-07-08",
    excerpt:
      "A kimchi hot dog topped with local red kimchi, sriracha aioli and green onions — a spicy, perfect answer to a lingering JJ's Red Hots craving, inhaled without shame.",
  },
  {
    title: "Dot Dot Dot",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/27-5-things-i-consumed-last-week",
    coverImage: "/uploads/dot-dot-dot.jpg",
    publishedAt: "2025-07-08",
    excerpt:
      "A strip-mall cocktail spot with a surprisingly strict dress code and an even more surprisingly good fried chicken — crispy, hit with Old Bay, served over a sort of Alabama white sauce.",
  },
  {
    title: "Pizza Baby East",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/27-5-things-i-consumed-last-week",
    coverImage: "/uploads/pizza-baby-east.jpg",
    publishedAt: "2025-07-08",
    excerpt:
      "A NY-style pepperoni slice that came in last place in the ongoing big-ass-slice rankings — oversized pepperonis, a heavy crust, and an overall flavor that was fine but forgettable. The Roman-style pies deserve a follow-up visit.",
  },
  {
    title: "Little Mama's Italian",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/27-5-things-i-consumed-last-week",
    coverImage: "/uploads/little-mamas-italian.jpg",
    publishedAt: "2025-07-08",
    excerpt:
      "A disappointing follow-up to Mama Ricotta's — an underwhelming stracciatella and an overcooked shrimp pasta dish that tasted like a Lean Cuisine. A rare 'will not be returning.'",
  },
  {
    title: "Laurel Market",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/37-the-case-for-being-a-regular",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-09-16",
    excerpt:
      "A build-your-own sandwich (smoked turkey, fresh mozz, chipotle aioli) upstaged entirely by the macaroni salad on the side — a Charlotte deli institution open since 1991. Do not fumble this.",
  },
  {
    title: "Taipei Express",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/29-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-07-22",
    excerpt:
      "A takeout vegetable lo mein order that broke from the usual routine and turned out to be a perfect lo mein — zero regrets.",
  },
  {
    title: "Zukku Sushi",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/29-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-07-22",
    excerpt:
      "One of the better poke bowl spots in Charlotte, plus a new karaage fried chicken menu item with just the right amount of breading and a dipping sauce that takes it over the top.",
  },
  {
    title: "Dōzo",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/30-5-things-i-consumed-in-clt",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-07-29",
    excerpt:
      "A karaage bento box — crispy chicken thigh, seaweed salad, miso soup and rice — anchored by a togarashi ranch dressing worth ordering again on its own.",
  },
  {
    title: "Chef Alyssa's Kitchen",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/30-5-things-i-consumed-in-clt",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-07-29",
    excerpt:
      "A LoSo Lowcountry cooking class that ran long and paired strangers at the same cutting board — a fun idea in theory, tougher in practice, but the roasted oysters and dessert delivered.",
  },
  {
    title: "Grecco Fresh Grille",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/30-5-things-i-consumed-in-clt",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-07-29",
    excerpt:
      "A Greek salad pita loaded with tzatziki over hummus, plus lemon-oregano fries that are best eaten on-site before they go soft in transit.",
  },
  {
    title: "Bao & Broth",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/31-change-is-afoot",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-08-19",
    excerpt:
      "A tiny beef taco in bao bun form — a better version of a Taco Bell Cheesy Gordita Crunch — alongside a go-to falafel bun and togarashi fries with black sesame aioli.",
  },
  {
    title: "Grey's Diner",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A no-frills, done-right diner spot serving up a genuinely great fried flounder plate — worth a return trip once the liquor license and full breakfast menu land.",
  },
  {
    title: "Poppy's Bagels",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/37-the-case-for-being-a-regular",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-09-16",
    excerpt:
      "A toasted sesame bagel with scallion cream cheese, already applied — exactly the kind of morning service that shouldn't have to be requested.",
  },
  {
    title: "Post Script",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/37-the-case-for-being-a-regular",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-09-16",
    excerpt:
      "A birthday dinner built around cavatelli wild mushroom stroganoff, a lightly dirty martini, and an 'Aries Season' cocktail that won the night — plus a few stolen fries off a neighbor's elite caesar.",
  },
  {
    title: "Vivienne",
    city: "Charlotte, NC",
    sourceUrl: "https://queencityhag.substack.com/p/37-the-case-for-being-a-regular",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-09-16",
    excerpt:
      "A NoDa food truck at Free Range Brewing serving fish and chips with a light, curry-tinged remoulade — worth the wait after putting off a visit for way too long.",
  },

  // --- Greenville, SC ---
  {
    title: "Mercado Cantina",
    city: "Greenville, SC",
    sourceUrl: "https://queencityhag.substack.com/p/11-charlotte-disses-the-dog",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-03-18",
    excerpt:
      "A Greenville food-hall spot in Optimist-style digs — a shrimp ceviche tostada and spicy ranch water that were fine, though finding seating with picky-eater kids in tow was stressful.",
  },
  {
    title: "Jones Oyster Co.",
    city: "Greenville, SC",
    sourceUrl: "https://queencityhag.substack.com/p/11-charlotte-disses-the-dog",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-03-18",
    excerpt:
      "The reigning champ for lobster rolls (Maine-style, $29) on any Greenville trip, backed up by excellent oysters and a smoked fish dip worth ordering too.",
  },
  {
    title: "Swamp Rabbit Cafe & Grocery",
    city: "Greenville, SC",
    sourceUrl: "https://queencityhag.substack.com/p/11-charlotte-disses-the-dog",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-03-18",
    excerpt:
      "A local institution right on the Swamp Rabbit Trail, good for both breakfast and lunch — the baguette alone is worth bringing home for a bruschetta-and-burrata night.",
  },

  // --- Asheville, NC ---
  {
    title: "The Admiral",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/16-youre-now-getting-de-influenced",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-04-22",
    excerpt:
      "Black cod with a genuinely elite crispy skin and a Smoked Olive Martini at this dimly lit West Asheville steakhouse — kitschy in the best, coolest way.",
  },
  {
    title: "Chai Pani",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/24-the-ethics-of-eating",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-17",
    excerpt:
      "Chili chicken that ranks among the best dishes tried there, though the Al Jeera Tequila cocktail missed — and the move into the old Buxton Hall BBQ space still stings a little.",
  },
  {
    title: "Good Hot Fish",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/24-the-ethics-of-eating",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-17",
    excerpt:
      "A catfish plate that's tasty, though the fish sandwich remains the superior order — go for the cornmeal breading over battered.",
  },
  {
    title: "Little Chango",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/24-the-ethics-of-eating",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-17",
    excerpt:
      "A cute little Asheville lunch spot — the tofu lonchera plate with rice, beans, pickled cabbage and escabeche salad was a pleasant first-visit surprise.",
  },
  {
    title: "Anoche",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/31-change-is-afoot",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-08-19",
    excerpt:
      "A River Arts District bar specializing in tequila and mezcal — a frozen paloma hit exactly right after walking around in the Asheville heat.",
  },
  {
    title: "The Rhu",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/31-change-is-afoot",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-08-19",
    excerpt:
      "A soul-healing BEC on an everything bagel, perfectly crispy bacon and garlic aioli doing the heavy lifting — plus a chicken salad kit to go, perfect for a hike-day sandwich.",
  },
  {
    title: "Good Food on Montford",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/31-change-is-afoot",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-08-19",
    excerpt:
      "Tuna carpaccio served over crispy beef cracklin's sounded questionable on paper and turned out incredible. A long-running Asheville favorite, since closed after its final service in 2026 — the cacio e pepe will be missed.",
  },
  {
    title: "Regina's",
    city: "Asheville, NC",
    sourceUrl: "https://queencityhag.substack.com/p/37-the-case-for-being-a-regular",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-09-16",
    excerpt:
      "Stumbled into this Asheville spot on what turned out to be its very last day of service — the breakfast burrito, eaten at the bar during a 30-minute wait, explained exactly why it'll be missed.",
  },

  // --- Louisville, KY ---
  {
    title: "Feast BBQ",
    city: "Louisville, KY",
    sourceUrl: "https://queencityhag.substack.com/p/8-the-hag-goes-to-louisville",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-25",
    excerpt:
      "A brisket sandwich and a bourbon slushie that always delivers on repeat visits — more restaurants should really be serving bourbon slushies.",
  },
  {
    title: "Pretty Decent",
    city: "Louisville, KY",
    sourceUrl: "https://queencityhag.substack.com/p/8-the-hag-goes-to-louisville",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-25",
    excerpt:
      "Imagine Grow with a full cocktail bar attached — the Paloma here, built on agave spirits, is one of the best (and most colorless) in recent memory.",
  },
  {
    title: "Quills Coffee",
    city: "Louisville, KY",
    sourceUrl: "https://queencityhag.substack.com/p/8-the-hag-goes-to-louisville",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-25",
    excerpt:
      "Louisville's answer to Not Just Coffee — the honey bourbon caramel latte was good enough to order on repeat during an entire visit.",
  },
  {
    title: "Holy Grale",
    city: "Louisville, KY",
    sourceUrl: "https://queencityhag.substack.com/p/8-the-hag-goes-to-louisville",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-25",
    excerpt:
      "A sister spot to Gralehaus, serving beer inside an old Unitarian chapel house — and, unexpectedly, a genuinely great bolognese.",
  },
  {
    title: "Royal's Hot Chicken",
    city: "Louisville, KY",
    sourceUrl: "https://queencityhag.substack.com/p/8-the-hag-goes-to-louisville",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-02-25",
    excerpt:
      "A reliable first lunch stop on any Louisville trip — jumbo tenders served on white bread that sounds strange and works extremely well, alongside a solid broccoli salad.",
  },

  // --- Near Gatlinburg / Nantahala, TN & NC ---
  {
    title: "Big Wesser Pub",
    city: "Bryson City, NC",
    sourceUrl: "https://queencityhag.substack.com/p/25-hags",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-24",
    excerpt:
      "A riverside pub stop at the Nantahala Outdoor Center on the drive to Tennessee — the nachos were just okay, but eating them next to the river with a cocktail more than made up for it.",
  },
  {
    title: "The Tower Bar at Anakeesta",
    city: "Gatlinburg, TN",
    sourceUrl: "https://queencityhag.substack.com/p/25-hags",
    coverImage: PLACEHOLDER,
    publishedAt: "2025-06-24",
    excerpt:
      "A chairlift ride up to a little mountain village bar in Gatlinburg, complete with playgrounds and shops — very Disney-coded. The Pacific Frosé delivers.",
  },

  // --- Maine ---
  {
    title: "Rose Foods",
    city: "Portland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "The best bagel encountered anywhere, full stop — reason enough on its own to build a Portland itinerary around.",
  },
  {
    title: "Lil Chippy",
    city: "Portland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A cute fish and chips counter with crispy-as-can-be fish and genuinely tasty dipping sauces.",
  },
  {
    title: "The Shop by Island Creek Oysters",
    city: "Portland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A casual, fresh-oyster spot that beat out the more hyped Eventide in a head-to-head.",
  },
  {
    title: "Smalls",
    city: "Portland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "An adorable, vaguely European cafe with amazing breakfast sandwiches — the kind of spot worth building a morning around.",
  },
  {
    title: "Wayside Tavern",
    city: "Portland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "The ideal choice for a cozy, late-night dinner in Portland.",
  },
  {
    title: "Five of Clubs",
    city: "Portland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A bar inside the Longfellow Hotel with genuinely amazing cocktails — perfect for pre-dinner drinks before heading out for the night.",
  },
  {
    title: "Freeport Oyster Bar",
    city: "Freeport, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "The best lobster roll of an entire Maine trip, enjoyed alongside a bathroom sticker that read 'Titties' and, somehow, fresh flowers on the table. Charmed by the whole experience.",
  },
  {
    title: "Maine Beer Company",
    city: "Freeport, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A brewery with serious Bon Iver-listener energy and a genuinely cool aesthetic to match.",
  },
  {
    title: "Cafe Grazie",
    city: "Rockland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A five-minute walk from the hotel and good enough to justify going back for both breakfast and lunch on the same trip — a split breakfast burrito started it all.",
  },
  {
    title: "Nina June",
    city: "Rockport, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "Technically in Rockport, just outside Rockland — the kind of place that feels lifted straight out of a Nancy Meyers movie.",
  },
  {
    title: "Oyster River Growers Vineyard",
    city: "Rockland, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "A charming natural-wine vineyard just outside Rockland, complete with an onsite Corgi — do the tasting and walk the vines.",
  },
  {
    title: "Under Canvas Acadia",
    city: "Bar Harbor, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "Glamping outside Bar Harbor with pretty views, convenient on-site food, and cozy wood-stove-heated tents for the adventurous.",
  },
  {
    title: "Frenchman Bay Lobster Rolls",
    city: "Bar Harbor, ME",
    sourceUrl: "https://queencityhag.substack.com/p/34-mixed-bag-hag",
    coverImage: PLACEHOLDER,
    publishedAt: "2026-04-28",
    excerpt:
      "Bar Harbor served up the worst food of the entire Maine trip overall, but this lobster roll — decent, if wildly expensive — was the one exception.",
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
    const existing = await prisma.post.findFirst({
      where: { title: p.title },
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
        city: p.city,
        sourceUrl: p.sourceUrl,
        isReview: false,
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
