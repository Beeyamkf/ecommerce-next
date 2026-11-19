import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import ProductForm from "@/components/ProductForm";
import { requireAdmin } from "@/lib/auth";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold">Edit: {product.name}</h1>
      <ProductForm product={product} />
    </div>
  );
}
