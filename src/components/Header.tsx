import Link from "next/link";
import { Suspense } from "react";
import UserNav from "@/components/UserNav";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          MyShop
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/products">Produits</Link>
          </li>
          <Suspense
            fallback={
              <>
                <li>
                  <Link href="/cart">Panier</Link>
                </li>
                <li>
                  <Link href="/login">Connexion</Link>
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
