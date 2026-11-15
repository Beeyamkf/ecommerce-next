import Link from "next/link";
import { getSession } from "@/lib/session";
import { getCart } from "@/lib/cart";

export default async function UserNav() {
  const [session, cart] = await Promise.all([getSession(), getCart()]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <li>
        <Link href="/cart">Panier ({count})</Link>
      </li>
      <li>
        {session ? (
          <Link href="/account">Mon compte</Link>
        ) : (
          <Link href="/login">Connexion</Link>
        )}
      </li>
    </>
  );
}
