import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: number;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

async function getData() {
  const res = await client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      subtext,
      price,
      "image": image.asset->url
    }`
  );
  return res;
}

async function All() {
  const data: Product[] = await getData();

  return (
    <div className="max-w-screen-xl mx-auto p-4 pl-20">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white py-10 mb-8">
        Manage Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg  hover:shadow-lg transition-shadow duration-300 ease-in"
          >
            {/* Product Image */}
            <Link href={`/add/${product._id}`} className="group">
            <div className="flex justify-center mb-4 text-center group cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  unoptimized
                  className="rounded-lg h-96 object-cover cursor-pointer"
                />
              </div>
            </Link>

            {/* Product Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                {product.subtext}
              </p>
              <p className="text-center text-gray-700 dark:text-gray-300 mt-2">
                Price: ${product.price.toFixed(2)}
              </p>

              {/* View Details Button */}
              <div className="flex justify-center mt-4">
                <Link href={`/add/${product._id}`}>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-200 ease-in">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default All;