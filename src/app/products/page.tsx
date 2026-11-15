import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/db/queries";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
