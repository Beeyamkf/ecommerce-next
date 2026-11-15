import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/db/queries";

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produits en vedette</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
