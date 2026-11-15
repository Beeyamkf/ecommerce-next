import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/session";
import { logout } from "@/app/actions/auth";
import Card from "@/components/Card";

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

  return (
    <div className="max-w-md mx-auto mt-8">
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
    </div>
  );
}
