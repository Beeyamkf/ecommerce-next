import Link from "next/link";
import { getSession } from "@/lib/session";
import { getCart } from "@/lib/cart";

export default async function UserNav() {
  const [session, cart] = await Promise.all([getSession(), getCart()]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
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
          href={session ? "/account" : "/login"}
          className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          {session ? "👤 My account " : "Sign in "}
        </Link>
      </li>
    </>
  );
}
