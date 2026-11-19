import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getCart } from "@/lib/cart";

export default async function UserNav() {
  const [user, cart] = await Promise.all([getCurrentUser(), getCart()]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {user?.role === "admin" && (
        <li>
          <Link
            href="/admin"
            className="px-3 py-2 rounded-lg bg-amber-400 text-blue-900 font-semibold hover:bg-amber-300 transition"
          >
            🛠️ Admin
          </Link>
        </li>
      )}
      <li>
        <Link
          href="/cart"
          className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/15 transition"
        >
          🛒 Cart
          {count > 0 && (
            <span className="ml-1 min-w-6 h-6 px-2 flex items-center justify-center rounded-full bg-amber-400 text-blue-900 text-xs font-bold">
              {count}
            </span>
          )}
        </Link>
      </li>
      <li>
        <Link
          href={user ? "/account" : "/login"}
          className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          {user ? "👤 My account" : "Sign in"}
        </Link>
      </li>
    </>
  );
}
