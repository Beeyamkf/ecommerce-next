import {and , eq, inArray } from "drizzle-orm";
import { db } from "./index";
import { products, orders, orderItems } from "./schema";
import { cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheTag("products");
  return db.select().from(products).orderBy(products.id);
}

export async function getProductBySlug(slug: string) {
  "use cache";
  cacheTag("products");
  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function getProductsByIds(ids: number[]) {
  "use cache";
  cacheTag("products");
  if (ids.length === 0) return [];
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function getOrder(orderId: number, userId: number) {
  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)))
    .limit(1);

  if (!order) return null;

  const items = await db
    .select({
      quantity: orderItems.quantity,
      price: orderItems.price,
      name: products.name,
      slug: products.slug,
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, orderId));

  return { ...order, items };
}