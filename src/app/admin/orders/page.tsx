import Link from "next/link";
import { getAllOrders } from "@/db/queries";
import { requireAdmin } from "@/lib/auth";
import { updateOrderStatus } from "@/app/actions/order";
import { ORDER_STATUSES, statusStyles } from "@/lib/order-status";

export default async function AdminOrdersPage() {
  await requireAdmin();
  const allOrders = await getAllOrders();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold">Orders</h1>

      {allOrders.length === 0 ? (
        <p className="text-slate-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Items</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold">#{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {order.createdAt.toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-right">{order.itemCount}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {order.total.toLocaleString("en-US")} DA
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={updateOrderStatus.bind(null, order.id)}
                      className="flex items-center gap-2"
                    >
                      <select
                        name="status"
                        defaultValue={order.status}
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[order.status] ?? ""}`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
