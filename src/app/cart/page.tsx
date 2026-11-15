import Link from "next/link";
import Card from "@/components/Card";
import { getCart } from "@/lib/cart";
import { getProductsByIds } from "@/db/queries";
import { removeFromCart, clearCart } from "@/app/actions/cart";

export default async function CartPage() {
  const cart = await getCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Card title="Mon panier">
          <p className="mb-4">Votre panier est vide.</p>
          <Link href="/products" className="text-blue-600 underline">
            Voir les produits
          </Link>
        </Card>
      </div>
    );
  }

  const products = await getProductsByIds(cart.map((item) => item.productId));

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...item, product, subtotal: product.price * item.quantity };
    })
    .filter((line) => line !== null);

  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card title="Mon panier">
        <ul className="divide-y mb-6">
          {lines.map((line) => (
            <li
              key={line.productId}
              className="flex items-center justify-between py-3"
            >
              <div>
                <Link
                  href={`/products/${line.product.slug}`}
                  className="font-semibold underline"
                >
                  {line.product.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {line.quantity} × {line.product.price.toLocaleString("fr-DZ")}{" "}
                  DA
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">
                  {line.subtotal.toLocaleString("fr-DZ")} DA
                </span>
                <form action={removeFromCart.bind(null, line.productId)}>
                  <button
                    type="submit"
                    className="text-red-500 text-sm underline"
                  >
                    Retirer
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between text-xl font-bold mb-6">
          <span>Total</span>
          <span>{total.toLocaleString("fr-DZ")} DA</span>
        </div>

        <form action={clearCart}>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-gray-600 text-white"
          >
            Vider le panier
          </button>
        </form>
      </Card>
    </div>
  );
}
