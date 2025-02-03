"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getOrders } from "@/app/utils/order";
import Loader from "@/app/components/Loader";

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

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="pl-20 max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 rounded-lg shadow-md "
            >
              <h2 className="text-lg font-semibold">
                Order ID: {order._id.slice(-6)}
              </h2>
              <p className="text-gray-700">
                Name: {order.firstName} {order.lastName}
              </p>
              <p className="text-gray-700">
                Address: {order.address}, {order.city}, {order.zipCode}
              </p>
              <p className="text-gray-700">Phone: {order.phone}</p>
              {/* Fix for email overflow */}
              <p className="text-gray-700 break-words">
                Email: {order.email}
              </p>
              <p className="text-gray-700 font-bold">
                Total: ${order.total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Order Date: {new Date(order.orderDate).toLocaleString()}
              </p>
              {/* Cart Items */}
              <div className="mt-4 space-y-2">
                {order.cartItems.map((item) => (
                  <div key={item._key} className="flex items-center gap-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-700">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;