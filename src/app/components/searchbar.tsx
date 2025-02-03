"use client";
import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ComboboxDemo } from "./search";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && slug.current match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <div className="lg:hidden block">
          <Search className="w-5 h-8 hover:text-blue-600 hover:scale-110 transition-transform cursor-pointer text-black dark:text-white" />
        </div>
        <div className="lg:block hidden">
          <ComboboxDemo />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden  rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-white">
            Search Products
          </DialogTitle>
          <form className="relative mt-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search products by name..."
              className="flex-1 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <X
                onClick={() => setSearch("")}
                className="absolute top-3 right-16 w-4 h-4 text-gray-400 cursor-pointer hover:text-red-600 transition-colors"
              />
            )}
            <button
              type="submit"
              className={`absolute right-0 top-0 w-12 h-full flex items-center justify-center rounded-tr-md rounded-br-md ${
                search
                  ? "bg-Color text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600"
              } transition`}
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full overflow-y-auto border border-gray-200 rounded-md mt-4 ">
          {loading ? (
            <p className="flex items-center justify-center py-10 gap-2 text-Color font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching products...
            </p>
          ) : products.length ? (
            products.map((product: Product) => (
              <div
                key={product?._id}
                className="p-4 border-b border-gray-200 last:border-b-0 hover:opacity-60 transition"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={`/add/${product?._id}`}
                    onClick={() => setShowSearch(false)}
                    className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 border border-gray-300 rounded-md overflow-hidden shadow-sm"
                  >
                    {product?.image && (
                      <Image
                        width={200}
                        height={200}
                        src={urlFor(product?.image).url()}
                        alt={product?.name || "Product"}
                        className="object-cover w-full h-full hover:scale-105 transition-transform"
                      />
                    )}
                  </Link>
                  <div className="flex-grow">
                    <Link
                      href={`/add/${product?._id}`}
                      onClick={() => setShowSearch(false)}
                    >
                      <h3
                        className="text-md font-medium text-gray-800 
                      dark:text-white hover:text-blue-600 transition-colors"
                      >
                        {product?.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2 w-72">
                        {product?.description}
                      </p>
                    </Link>
                    <p className="text-sm font-semibold text-gray-800 mt-2">
                      Price: ${product?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-600">
              {search ? (
                <p>
                  No results for{" "}
                  <span className="text-red-600 underline">{search}</span>. Try
                  another search term.
                </p>
              ) : (
                <p className="flex gap-2">
                  <Search className="w-5 h-5 text-gray-500" />
                  Start searching to see products.
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
