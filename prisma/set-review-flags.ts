import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Titles imported by import-mixed-bag-posts.ts: quick newsletter mentions,
// not full write-ups, so their source link should read "Read the newsletter"
// instead of "Read full review".
const MENTION_TITLES = [
  "Groucho's Deli",
  "Bar à Vins",
  "Milkbread",
  "Chief's",
  "Schreiber's on Rye",
  "The Bar at Optimist Hall",
  "Stable Hand",
  "Room Service",
  "Capishe",
  "Boxcar Betty's",
  "Papi Queso",
  "Brawley's",
  "Culture Shop",
  "Fin & Fino",
  "The Jimmy",
  "Suárez Bakery",
  "Flower Child",
  "Reid's Fine Foods",
  "Ever Andalo",
  "Harriet's Hamburgers",
  "Superica",
  "Gravity Sourdough Pizza",
  "Burial Beer Co.",
  "El Malo Tacos",
  "Boading",
  "Enat Ethiopian",
  "Bakersfield",
  "Jeni's",
  "Lost Worlds Brewing",
  "Substrate",
  "Ru San's",
  "Yafo Kitchen",
  "Idlewild",
  "Folia",
  "River's Edge Grill",
  "Marina's Tapas",
  "Stagioni",
  "Salud Cerveceria",
  "Pasta & Provisions",
  "Hello Uncle",
  "Hex",
  "Dot Dot Dot",
  "Pizza Baby East",
  "Little Mama's Italian",
  "Laurel Market",
  "Taipei Express",
  "Zukku Sushi",
  "Dōzo",
  "Chef Alyssa's Kitchen",
  "Grecco Fresh Grille",
  "Bao & Broth",
  "Grey's Diner",
  "Poppy's Bagels",
  "Post Script",
  "Vivienne",
  "Mercado Cantina",
  "Jones Oyster Co.",
  "Swamp Rabbit Cafe & Grocery",
  "The Admiral",
  "Chai Pani",
  "Good Hot Fish",
  "Little Chango",
  "Anoche",
  "The Rhu",
  "Good Food on Montford",
  "Regina's",
  "Feast BBQ",
  "Pretty Decent",
  "Quills Coffee",
  "Holy Grale",
  "Royal's Hot Chicken",
  "Big Wesser Pub",
  "The Tower Bar at Anakeesta",
  "Rose Foods",
  "Lil Chippy",
  "The Shop by Island Creek Oysters",
  "Smalls",
  "Wayside Tavern",
  "Five of Clubs",
  "Freeport Oyster Bar",
  "Maine Beer Company",
  "Cafe Grazie",
  "Nina June",
  "Oyster River Growers Vineyard",
  "Under Canvas Acadia",
  "Frenchman Bay Lobster Rolls",
];

async function main() {
  const result = await prisma.post.updateMany({
    where: { title: { in: MENTION_TITLES } },
    data: { isReview: false },
  });
  console.log(`Marked ${result.count} mention posts as isReview=false`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
