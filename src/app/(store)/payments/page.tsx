'use client';
import Loader from "@/app/components/Loader";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  amount: number;
  status: string;
  receipt_email: string | null;
};

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="border pl-20 max-w-6xl mx-auto p-6  rounded-lg ">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Stripe Orders
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse  text-sm text-left shadow-md rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Order ID</th>
              <th className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Amount</th>
              <th className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Status</th>
              <th className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{order.id}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  ${(order.amount / 100).toFixed(2)}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    order.status === "succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {order.receipt_email || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}