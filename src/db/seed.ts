import "dotenv/config";
import { db } from "./index";
import { products } from "./schema";

async function main() {
  console.log("Seed en cours...");

  await db.delete(products);

  await db.insert(products).values([
    { name: "T-shirt noir", slug: "t-shirt-noir", description: "T-shirt en coton, confortable pour tous les jours.", price: 2500, stock: 20 },
    { name: "Casquette", slug: "casquette", description: "Casquette réglable, style sport.", price: 1500, stock: 35 },
    { name: "Sneakers", slug: "sneakers", description: "Baskets légères et respirantes.", price: 9000, stock: 10 },
    { name: "Sac à dos", slug: "sac-a-dos", description: "Sac résistant de 20 litres, idéal pour le travail.", price: 4500, stock: 15 },
    { name: "Montre", slug: "montre", description: "Montre simple et élégante, bracelet cuir.", price: 7000, stock: 8 },
    { name: "Lunettes de soleil", slug: "lunettes-de-soleil", description: "Protection UV400, monture légère.", price: 3000, stock: 0 },
  ]);

  console.log("✅ Seed terminé : 6 produits ajoutés");
  await db.$client.end();
}

main();