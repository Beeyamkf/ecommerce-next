import { count, sum } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, users } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  const admin = await requireAdmin();

  const [[productStats], [orderStats], [userStats]] = await Promise.all([
    db.select({ value: count() }).from(products),
    db.select({ count: count(), revenue: sum(orders.total) }).from(orders),
    db.select({ value: count() }).from(users),
  ]);

  const stats = [
    { label: "Products", value: productStats.value, emoji: "📦" },
    { label: "Orders", value: orderStats.count, emoji: "🧾" },
    { label: "Customers", value: userStats.value, emoji: "👥" },
    {
      label: "Revenue",
      value: `${Number(orderStats.revenue ?? 0).toLocaleString("en-US")} DA`,
      emoji: "💰",
    },
  ];

  return (
    <div>
      <h1 className="mb-1 text-3xl font-extrabold">Dashboard</h1>
      <p className="mb-6 text-slate-500">Welcome back, {admin.name} 👋</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <p className="text-3xl">{stat.emoji}</p>
            <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            <p className="text-2xl font-extrabold text-blue-600">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
