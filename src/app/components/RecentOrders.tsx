import React, { useState, useEffect } from "react";
import { getOrders } from "@/app/utils/order";
import Loader from "./Loader";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  cartItems: {
    _key: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
  }[];
  total: number;
  orderDate: string;
}

function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data.slice(0, 3)); // Limit to 3 orders
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
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Recent Orders
      </h2>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 "
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
              {/* Order ID */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                  Order ID:
                </h3>
                <p className="text-gray-700 dark:text-gray-300 break-all">
                  {order._id}
                </p>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._key}
                  className="grid grid-cols-3 gap-4 border-b border-gray-200 dark:border-gray-700 py-3"
                >
                  {/* Product Name */}
                  <div className="col-span-1 text-gray-700 dark:text-gray-300">
                    <p className="line-clamp-2">{item.product.name}</p>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 text-gray-700 dark:text-gray-300 text-center">
                    ${item.product.price.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 text-gray-700 dark:text-gray-300 text-right">
                    {item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-4 flex justify-end">
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;