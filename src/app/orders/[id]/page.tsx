import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrder } from "@/db/queries";
import { productEmoji } from "@/lib/product-emoji";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isInteger(orderId)) notFound();

  const order = await getOrder(orderId, session.userId);
  if (!order) notFound();

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="text-center mb-8">
        <p className="text-6xl mb-3">🎉</p>
        <h1 className="text-3xl font-extrabold mb-2">
          Thank you for your order!
        </h1>
        <p className="text-slate-500">
          Order <span className="font-bold text-blue-600">#{order.id}</span> ·{" "}
          {order.createdAt.toLocaleDateString("en-US")} ·{" "}
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-700">
            {order.status}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(37,99,235,0.35)]">
        <ul className="divide-y divide-slate-100 mb-4">
          {order.items.map((item) => (
            <li key={item.slug} className="flex items-center gap-4 py-3">
              <span className="text-3xl">{productEmoji(item.slug)}</span>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-slate-500">
                  {item.quantity} × {item.price.toLocaleString("en-US")} DA
                </p>
              </div>
              <p className="font-bold">
                {(item.quantity * item.price).toLocaleString("en-US")} DA
              </p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between border-t border-slate-100 pt-4 text-xl font-extrabold">
          <span>Total</span>
          <span className="text-blue-600">
            {order.total.toLocaleString("en-US")} DA
          </span>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          href="/products"
          className="text-blue-600 font-medium hover:underline"
        >
          ← Continue shopping
        </Link>
      </div>
    </div>
  );
}
