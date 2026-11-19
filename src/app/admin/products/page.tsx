import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { productEmoji } from "@/lib/product-emoji";
import DeleteProductButton from "@/components/DeleteProductButton";

export default async function AdminProductsPage() {
  await requireAdmin();

  // Requête directe (sans cache) : l'admin doit voir le stock réel
  const allProducts = await db.select().from(products).orderBy(products.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-[0_5px_0_0_#1e40af] transition-all hover:bg-blue-500 active:translate-y-1.25 active:shadow-none"
        >
          + New product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {allProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">
                  <span className="mr-2">{productEmoji(product.slug)}</span>
                  {product.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {product.slug}
                </td>
                <td className="px-4 py-3 text-right">
                  {product.price.toLocaleString("en-US")} DA
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`rounded-full px-2 py-0.5 text-sm font-semibold ${
                      product.stock === 0
                        ? "bg-red-100 text-red-700"
                        : product.stock < 10
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton
                    productId={product.id}
                    productName={product.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
