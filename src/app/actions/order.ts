"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { getSession } from "@/lib/session";
import { getCart, saveCart } from "@/lib/cart";

export type OrderState = { message?: string } | undefined;

export async function placeOrder(prevState: OrderState, formData: FormData): Promise<OrderState> {
 
  const session = await getSession();
  if (!session) redirect("/login");

  
  const cart = await getCart();
  if (cart.length === 0) return { message: "Your cart is empty" };

  let orderId: number;

  try {
    orderId = await db.transaction(async (tx) => {
      
      const dbProducts = await tx
        .select()
        .from(products)
        .where(inArray(products.id, cart.map((item) => item.productId)));

      const lines = cart.map((item) => {
        const product = dbProducts.find((p) => p.id === item.productId);
        if (!product) throw new Error("A product in your cart no longer exists");
        return { product, quantity: item.quantity };
      });

      const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

      const [order] = await tx
        .insert(orders)
        .values({ userId: session.userId, total })
        .returning({ id: orders.id });

    
      for (const line of lines) {
        const updated = await tx
          .update(products)
          .set({ stock: sql`${products.stock} - ${line.quantity}` })
          .where(and(eq(products.id, line.product.id), gte(products.stock, line.quantity)))
          .returning({ id: products.id });

        if (updated.length === 0) {
          throw new Error(`Not enough stock for ${line.product.name}`);
        }
      }

   
      await tx.insert(orderItems).values(
        lines.map((line) => ({
          orderId: order.id,
          productId: line.product.id,
          quantity: line.quantity,
          price: line.product.price,
        }))
      );

      return order.id;
    });
  } catch (error) {
    
    return { message: error instanceof Error ? error.message : "Order failed" };
  }

  await saveCart([]);
  updateTag("products");

  redirect(`/orders/${orderId}`);
}