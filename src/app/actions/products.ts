"use server";

import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { orderItems, products } from "@/db/schema";
import { productSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/auth";
import type { FormState } from "@/app/actions/auth";

export async function saveProduct(prevState: FormState, formData: FormData): Promise<FormState> {

  await requireAdmin();

 
  const result = productSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }
  const data = result.data;

  const productId = Number(formData.get("id")) || null;

  const slugTaken = await db
    .select({ id: products.id })
    .from(products)
    .where(
      productId
        ? and(eq(products.slug, data.slug), ne(products.id, productId))
        : eq(products.slug, data.slug)
    )
    .limit(1);

  if (slugTaken.length > 0) {
    return { errors: { slug: ["This slug is already used"] } };
  }

 
  if (productId) {
    await db.update(products).set(data).where(eq(products.id, productId));
  } else {
    await db.insert(products).values(data);
  }


  updateTag("products");
  redirect("/admin/products");
}

export type DeleteState = { message?: string } | undefined;

export async function deleteProduct(
  productId: number,
  prevState: DeleteState,
  formData: FormData
): Promise<DeleteState> {
  await requireAdmin();

  
  const used = await db
    .select({ id: orderItems.id })
    .from(orderItems)
    .where(eq(orderItems.productId, productId))
    .limit(1);

  if (used.length > 0) {
    return { message: "Already ordered: set stock to 0 instead" };
  }

  await db.delete(products).where(eq(products.id, productId));

  updateTag("products");            // la boutique
  revalidatePath("/admin/products"); // le tableau admin
  return {};
}