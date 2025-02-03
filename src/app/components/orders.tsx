"use client";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import { client } from "@/sanity/lib/client";

const Orders = () => {
  const [orders, setOrders] = useState<number | null>(null);

  useEffect(() => {
    // Fetch orders from Sanity
    const fetchOrders = async () => {
      try {
        const data = await client.fetch(`*[_type == "order"]`);
        console.log("Fetched orders:", data); 
        setOrders(data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <div className="border p-12 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4 ">
      <div className="bg-green-100 p-3 rounded-full">
        <FaShoppingCart className="text-green-500 text-2xl" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium dark:text-gray-100 ">Total Orders</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          {orders !== null ? orders : "Loading..."} Orders
        </p>
      </div>
    </div>
  );
};

export default Orders;
