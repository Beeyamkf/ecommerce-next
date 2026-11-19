import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "./index";
import { products, orders, orderItems, users } from "./schema";
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

export async function getUserOrders(userId: number) {
  return db
    .select({
      id: orders.id,
      total: orders.total,
      status: orders.status,
      createdAt: orders.createdAt,
      itemCount: sql<number>`coalesce(sum(${orderItems.quantity}), 0)::int`,
    })
    .from(orders)
    .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
    .where(eq(orders.userId, userId))
    .groupBy(orders.id)
    .orderBy(desc(orders.createdAt));
}

export async function getAllOrders() {
  return db
    .select({
      id: orders.id,
      total: orders.total,
      status: orders.status,
      createdAt: orders.createdAt,
      customer: users.email,
      itemCount: sql<number>`coalesce(sum(${orderItems.quantity}), 0)::int`,
    })
    .from(orders)
    .innerJoin(users, eq(users.id, orders.userId))
    .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
    .groupBy(orders.id, users.email)
    .orderBy(desc(orders.createdAt));
}