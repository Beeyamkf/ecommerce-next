import "dotenv/config";
import { db } from "./index";
import { products } from "./schema";

async function main() {
  console.log("Seeding...");

  await db.delete(products);

  await db.insert(products).values([
      { name: "Black T-shirt", slug: "t-shirt-noir", description: "Cotton T-shirt, comfortable for everyday wear.", price: 2500, stock: 20 },
    { name: "Cap", slug: "casquette", description: "Adjustable cap, sporty style.", price: 1500, stock: 35 },
    { name: "Sneakers", slug: "sneakers", description: "Light and breathable sneakers.", price: 9000, stock: 10 },
    { name: "Backpack", slug: "sac-a-dos", description: "Durable 20-liter backpack, perfect for work.", price: 4500, stock: 15 },
    { name: "Watch", slug: "montre", description: "Simple and elegant watch with leather strap.", price: 7000, stock: 8 },
    { name: "Sunglasses", slug: "lunettes-de-soleil", description: "UV400 protection, lightweight frame.", price: 3000, stock: 0 },
  ]);

  console.log("✅ Seed done: 6 products added");
  await db.$client.end();
}

main();