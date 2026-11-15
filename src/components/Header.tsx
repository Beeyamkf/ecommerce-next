import Link from "next/link";
import { Suspense } from "react";
import UserNav from "@/components/UserNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"
        >
          <span className="text-3xl">🛍️</span> MyShop
        </Link>

        <ul className="flex items-center gap-2 font-medium">
          <li>
            <Link
              href="/"
              className="px-3 py-2 rounded-lg hover:bg-white/15 transition"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="px-3 py-2 rounded-lg hover:bg-white/15 transition"
            >
              Produits
            </Link>
          </li>
          <Suspense
            fallback={
              <>
                <li>
                  <Link
                    href="/cart"
                    className="px-3 py-2 rounded-lg hover:bg-white/15 transition"
                  >
                    🛒 Panier
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold"
                  >
                    Connexion
                  </Link>
                </li>
              </>
            }
          >
            <UserNav />
          </Suspense>
        </ul>
      </nav>
    </header>
  );
}
