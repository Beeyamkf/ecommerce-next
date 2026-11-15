import { eq, inArray } from "drizzle-orm";
import { db } from "./index";
import { products } from "./schema";

export async function getProducts() {
  "use cache";
  return db.select().from(products).orderBy(products.id);
}

export async function getProductBySlug(slug: string) {
  "use cache";
  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function getProductsByIds(ids: number[]) {
  "use cache";
  if (ids.length === 0) return [];
  return db.select().from(products).where(inArray(products.id, ids));
}