"use client";
import React, { useEffect, useState } from "react";
import { FaBoxOpen, } from "react-icons/fa";

import { client } from "@/sanity/lib/client";

const Inventory = () => {
  const [product, setProduct] = useState<number | null>(null);

  useEffect(() => {
    // Fetch orders from Sanity
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(`*[_type == "product"]`);
        console.log("Fetched orders:", data); 
        setProduct(data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchProduct();
  }, []);

  return (
    <div className=" border p-12 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
      <div className="bg-yellow-100 p-3 rounded-full">
        <FaBoxOpen className="text-yellow-500 text-2xl" />
      </div>
      <div >
        <p className="text-sm text-gray-500 font-medium dark:text-gray-100">Inventory</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          {product !== null ? product : "Loading..."} Items
        </p>
      </div>
    </div>
  );
};

export default Inventory;
