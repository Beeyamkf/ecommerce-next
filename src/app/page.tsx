import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produits en vedette</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((product) => (
          <ProductCard key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
}
