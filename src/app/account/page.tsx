import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getProducts, getUserOrders } from "@/db/queries";
import { getSession } from "@/lib/session";
import { getCart } from "@/lib/cart";
import { logout } from "@/app/actions/auth";
import Card from "@/components/Card";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user] = await db
    .select({
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  if (!user) redirect("/login");

  const [cart, products, userOrders] = await Promise.all([
    getCart(),
    getProducts(),
    getUserOrders(session.userId),
  ]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const recommended = products.filter((p) => p.stock > 0).slice(0, 3);

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Compte + panier */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="My account">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-6">
            <span className="font-semibold">Member since:</span>{" "}
            {user.createdAt.toLocaleDateString("en-US")}
          </p>
          <form action={logout}>
            <Button label="Sign out" variant="danger" type="submit" />
          </form>
        </Card>

        <Card title="My cart">
          <p className="mb-4">
            {cartCount === 0
              ? "Your cart is empty."
              : `You have ${cartCount} item(s) in your cart.`}
          </p>
          <Link href="/cart" className="text-blue-600 underline">
            View cart
          </Link>
        </Card>
      </div>

      {/* 2. Mes commandes */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📜 My orders</h2>

        {userOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-slate-500 border border-slate-100">
            You haven&apos;t placed any orders yet.{" "}
            <Link
              href="/products"
              className="text-blue-600 font-medium hover:underline"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {userOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/orders/${order.id}`}
                  className="flex items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <div>
                    <p className="font-bold">Order #{order.id}</p>
                    <p className="text-sm text-slate-500">
                      {order.createdAt.toLocaleDateString("en-US")} ·{" "}
                      {order.itemCount} item
                      {order.itemCount > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[order.status] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="font-extrabold text-blue-600 w-28 text-right">
                      {order.total.toLocaleString("en-US")} DA
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. Recommandés */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recommended.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
