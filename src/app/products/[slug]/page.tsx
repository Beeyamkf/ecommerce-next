import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/db/queries";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const inStock = product.stock > 0;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Image
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {product.price.toLocaleString("fr-DZ")} DA
        </p>
        <p className="mb-4">{product.description}</p>

        <p
          className={`mb-6 font-semibold ${inStock ? "text-green-600" : "text-red-600"}`}
        >
          {inStock ? `En stock (${product.stock})` : "Épuisé"}
        </p>

        <Link href="/products" className="text-blue-600 underline">
          ← Retour aux produits
        </Link>
      </div>
    </div>
  );
}
