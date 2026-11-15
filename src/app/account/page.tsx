import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getProducts } from "@/db/queries";
import { getSession } from "@/lib/session";
import { getCart } from "@/lib/cart";
import { logout } from "@/app/actions/auth";
import Card from "@/components/Card";
import ProductCard from "@/components/ProductCard";

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

  const [cart, products] = await Promise.all([getCart(), getProducts()]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const recommended = products.filter((p) => p.stock > 0).slice(0, 3);

  return (
    <div className="space-y-8 mt-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Mon compte">
          <p className="mb-2">
            <span className="font-semibold">Nom :</span> {user.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email :</span> {user.email}
          </p>
          <p className="mb-6">
            <span className="font-semibold">Membre depuis :</span>{" "}
            {user.createdAt.toLocaleDateString("fr-DZ")}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="w-full px-4 py-2 rounded bg-red-600 text-white"
            >
              Se déconnecter
            </button>
          </form>
        </Card>

        <Card title="Mon panier">
          <p className="mb-4">
            {cartCount === 0
              ? "Votre panier est vide."
              : `Vous avez ${cartCount} article(s) dans votre panier.`}
          </p>
          <Link href="/cart" className="text-blue-600 underline">
            Voir le panier
          </Link>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recommandés pour vous</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {recommended.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
