import Link from "next/link";

export default async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-white mb-2">🛍️ MyShop</p>
          <p className="text-sm">Votre boutique en ligne simple et rapide.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Navigation</p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/products" className="hover:text-white">
                Produits
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Panier
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-white">
                Mon compte
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Contact</p>
          <p className="text-sm">contact@myshop.dz</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm">
        © {year} MyShop. Tous droits réservés.
      </div>
    </footer>
  );
}
