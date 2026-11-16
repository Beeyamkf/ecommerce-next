import Link from "next/link";
import Button from "@/components/Button";
import { getCart } from "@/lib/cart";
import { productEmoji } from "@/lib/product-emoji";
import { getProductsByIds } from "@/db/queries";
import { removeFromCart, clearCart, updateQuantity } from "@/app/actions/cart";

export default async function CartPage() {
  const cart = await getCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center">
        <p className="text-7xl mb-4">🛒</p>
        <h1 className="text-2xl font-extrabold mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-6">
          Browse our products and add your favorites
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-[0_5px_0_0_#1e40af] hover:bg-blue-500 transition-all active:translate-y-1.25 active:shadow-none"
        >
          View products
        </Link>
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
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-extrabold mb-6">
        🛒 My cart{" "}
        <span className="text-slate-400 text-xl font-semibold">
          ({count} item {count > 1 ? "s" : ""})
        </span>
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Liste des produits */}
        <ul className="lg:col-span-2 space-y-4">
          {lines.map((line) => (
            <li
              key={line.productId}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(37,99,235,0.35)]"
            >
              <div className="w-20 h-20 shrink-0 rounded-xl bg-linear-to-br from-blue-100 via-indigo-100 to-sky-200 flex items-center justify-center text-4xl">
                {productEmoji(line.product.slug)}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${line.product.slug}`}
                  className="font-bold hover:text-blue-600"
                >
                  {line.product.name}
                </Link>
                <p className="text-sm text-slate-500">
                  {line.product.price.toLocaleString("fr-DZ")} DA / unit
                </p>
                {line.quantity >= line.product.stock && (
                  <p className="text-xs text-amber-600 font-semibold mt-1">
                    Maximum stock reached
                  </p>
                )}
              </div>

              <div className="flex items-center rounded-xl bg-slate-100 p-1">
                <form action={updateQuantity.bind(null, line.productId, -1)}>
                  <button
                    type="submit"
                    aria-label="Decrease"
                    className="w-9 h-9 rounded-lg bg-white font-bold text-lg shadow-sm hover:bg-blue-50 active:scale-95 transition"
                  >
                    −
                  </button>
                </form>
                <span className="w-10 text-center font-bold">
                  {line.quantity}
                </span>
                <form action={updateQuantity.bind(null, line.productId, 1)}>
                  <button
                    type="submit"
                    aria-label="Increase"
                    disabled={line.quantity >= line.product.stock}
                    className="w-9 h-9 rounded-lg bg-white font-bold text-lg shadow-sm hover:bg-blue-50 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </form>
              </div>

              <p className="w-28 text-right font-extrabold text-blue-600">
                {line.subtotal.toLocaleString("fr-DZ")} DA
              </p>

              <form action={removeFromCart.bind(null, line.productId)}>
                <button
                  type="submit"
                  aria-label="Remove from cart"
                  title="Remove from cart "
                  className="w-9 h-9 rounded-lg hover:bg-red-50 text-lg transition"
                >
                  🗑️
                </button>
              </form>
            </li>
          ))}
        </ul>

        {/* Récapitulatif */}
        <aside className="h-fit lg:sticky lg:top-24 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(37,99,235,0.35)]">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-2 text-slate-600">
            <span>Subtotal</span>
            <span>{total.toLocaleString("fr-DZ")} DA</span>
          </div>
          <div className="flex justify-between mb-4 text-slate-600">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-4 mb-6 text-xl font-extrabold">
            <span>Total</span>
            <span className="text-blue-600">
              {total.toLocaleString("fr-DZ")} DA
            </span>
          </div>

          <form action={clearCart} className="mb-3">
            <Button label="Clear cart" variant="secondary" type="submit" />
          </form>
          <Link
            href="/products"
            className="block text-center text-blue-600 font-medium hover:underline"
          >
            ← Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
