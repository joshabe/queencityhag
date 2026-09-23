import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WEBSITES: Record<string, string | null> = {
  Albertine: "https://www.albertinerestaurant.com/",
  Anoche: "https://www.anocheavl.com/",
  Bakersfield: null,
  "Bao & Broth": "https://www.baoandbroth.com/",
  "Bar à Vins": "https://www.instagram.com/baravinsclt/",
  "Big Wesser Pub": "https://noc.com/restaurants/big-wesser-riverside-pub/",
  "Bird Pizzeria": "https://www.birdpizzeria.com/",
  Boading: "https://baodingsouthpark.com/",
  "Boxcar Betty's": null,
  "Brawley's": "http://www.brawleysbeverage.com/",
  "Burial Beer Co.": "https://burialbeer.com/",
  "Cafe Grazie": "https://www.doublegrazie.world/",
  Capishe: "https://www.capishekitchen.net/",
  "Chai Pani": "https://chaipani.com/asheville",
  "Chef Alyssa's Kitchen": "https://chefalyssaskitchen.com/",
  "Chief's": null,
  "Counter-": "https://www.counterclt.com/",
  "Culture Shop": "https://www.thecultureshopclt.com/",
  "Dot Dot Dot": "https://dotdotdotcharlotte.com/",
  "Dōzo": "https://dozoclt.com/",

  "El Malo Tacos": "https://www.elmalotacos.com/",
  "Enat Ethiopian": "https://enatethiopianrestaurant.com/",
  "Ever Andalo": "https://www.everandalo.com/",
  "Feast BBQ": "https://www.feastbbq.com/",
  "Fin & Fino": "https://www.finandfino.com/",
  "Five of Clubs": "https://www.longfellowhotel.com/cafe-and-bar/five-of-clubs/",
  "Flower Child": "https://www.iamaflowerchild.com/locations/charlotte-nc/",
  Folia: "https://www.foliaclt.com/",
  "Freeport Oyster Bar": "https://www.freeportoysterbar.com/",
  "Frenchman Bay Lobster Rolls": "https://www.frenchmanbaylobsterrolls.com/",
  "Good Food on Montford": null,
  "Good Hot Fish": "https://www.goodhotfish.com/",
  "Gravity Sourdough Pizza": "https://gravitypizza.com/",
  "Grecco Fresh Grille": "https://www.grecofreshgrille.com/",
  "Grey's Diner": "https://www.greysdinerclt.com/",
  "Groucho's Deli": "https://www.grouchos.com/parkroad/",
  "Harriet's Hamburgers": "https://www.harrietshamburgers.com/",
  "Hello Uncle": "https://www.instagram.com/hello_uncle_clt/",
  Hex: "https://www.hexclt.com/",
  "Holy Grale": "https://www.thegrales.com/",

  Idlewild: "https://www.idlewildbar.com/",
  "Jeni's": "https://jenis.com/",
  "Jones Oyster Co.": "https://www.thejonesoysterco.com/",
  "L'Ostrica": "https://www.lostricaclt.com/",
  "Laurel Market": "https://www.laurelmarketdeli.com/",
  "Leluia Hall": "https://www.leluiahall.com/",
  "Lil Chippy": "https://www.lilchippymaine.com/",
  "Little Chango": "https://www.littlechango.com/",
  "Little Mama's Italian": "https://littlemamasitalian.com/",
  "Lost Worlds Brewing": "https://www.lostworldsbeer.com/",
  "Maine Beer Company": "https://mainebeercompany.com/",
  "Marina's Tapas": null,
  "Mercado Cantina": "https://www.instagram.com/eatmercadocantina/",
  "Mi Cariño": "https://www.micarinoclt.com/",
  Milkbread: "https://www.milkbread.com/",
  "Nina June": "https://www.ninajunerestaurant.com/",
  "Omakase Experience by Prime Fish": "https://omakaseclt.com/",
  Oshen: "https://oshensushi.com/",
  "Oyster River Growers Vineyard": "https://www.oysterriverwine.com/",
  "Papi Queso": "https://papiquesoclt.com/",

  "Pasta & Provisions": "https://pastaprovisions.com/",
  "Pizza Baby East": "https://www.eatpizzababy.com/",
  "Poppy's Bagels": "http://www.poppysbagelsandmore.com/",
  "Post Script": "https://www.postscriptrestaurant.com/",
  "Pretty Decent": "https://www.prettydecentbar.com/",
  "Quills Coffee": "https://quillscoffee.com/",
  Rada: "https://radaclt.com/",
  "Regina's": null,
  "Reid's Fine Foods": "https://www.reids.com/",
  "Restaurant Constance": "https://restaurantconstance.com/",
  "River's Edge Grill":
    "https://whitewater.org/things-to-do/eat-drink-shop/food-and-beverage",
  "Room Service": "https://roomserviceclt.com/",
  "Rose Foods": "https://www.rosefoods.me/",
  "Royal's Hot Chicken": "https://royalshotchicken.com/",
  "Ru San's": "https://rusans.com/",
  "Salud Cerveceria": "https://saludcerveceria.com/",
  "Schreiber's on Rye": "https://schreibersonrye.com/",
  Smalls: "https://www.smallsisgood.com/",
  Sora: "https://www.soranc.com/",
  Spaghett: "https://www.restaurantspaghett.com/",

  "Stable Hand": "https://www.stablehandclt.com/",
  Stagioni: "https://www.stagioniclt.com/",
  Substrate: "https://substrateclt.square.site",
  Superica: "https://superica.com/strawberry-hill/",
  "Suárez Bakery": "https://www.suarezbakery.com/",
  "Swamp Rabbit Cafe & Grocery": "https://www.swamprabbitcafe.com/",
  "Taipei Express": "https://taipeiexpress.com/",
  "The Admiral": "https://www.theadmiralnc.com/",
  "The Bar at Optimist Hall": "https://www.instagram.com/thebaratoptimisthall/",
  "The Jimmy": "https://www.thejimmyclt.com/",
  "The Rhu": "https://the-rhu.com/",
  "The Shop by Island Creek Oysters": "https://portland.islandcreekoysters.com/",
  "The Tower Bar at Anakeesta": "https://anakeesta.com/",
  "Under Canvas Acadia": "https://www.undercanvas.com/camps/acadia/",
  Vivienne: null,
  "Wayside Tavern": "https://www.waysidetavernmaine.com/",
  "Yafo Kitchen": "https://yafokitchen.com/",
  "Zukku Sushi": "https://www.zukkusushi.com/",
};

async function main() {
  let updated = 0;
  for (const [title, websiteUrl] of Object.entries(WEBSITES)) {
    if (!websiteUrl) continue;
    const result = await prisma.post.updateMany({
      where: { title },
      data: { websiteUrl },
    });
    updated += result.count;
  }
  console.log(`Set websiteUrl on ${updated} posts`);

  // Good Food on Montford was mis-tagged as Asheville, NC during the
  // original mixed-bag import — it's actually a Charlotte restaurant
  // (1701 Montford Dr, Plaza Midwood), same-street-name coincidence with
  // Asheville's Montford Ave.
  const fixed = await prisma.post.updateMany({
    where: { title: "Good Food on Montford" },
    data: { city: "Charlotte, NC" },
  });
  console.log(`Fixed city on ${fixed.count} post(s): Good Food on Montford`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
