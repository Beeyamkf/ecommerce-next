import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
      <aside className="h-fit rounded-2xl bg-slate-900 p-4 text-slate-200">
        <p className="mb-4 text-lg font-extrabold text-white">🛠️ Admin</p>
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 hover:bg-white/10"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="rounded-lg px-3 py-2 hover:bg-white/10"
          >
            📦 Products
          </Link>
          <Link
            href="/admin/orders"
            className="rounded-lg px-3 py-2 hover:bg-white/10"
          >
            🧾 Orders
          </Link>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
