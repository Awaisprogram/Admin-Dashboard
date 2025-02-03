import Link from "next/link";

export default function Shippings() {
  return (
    <div className="pl-20 min-h-screen flex flex-col items-center justify-center  text-gray-800 dark:text-white">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping Page</h1>

      {/* Work in Progress Message */}
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          This page is currently under development.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          I am working hard to bring you the best experience. Please check back soon!
        </p>
      </div>

      {/* Back to Home Button */}
      <Link href="/">
        <button className="my-8 px-6 py-3 bg-[#23A6F0] text-white rounded-full hover:bg-blue-700 transition duration-200 ease-in">
          Back to Home
        </button>
      </Link>
    </div>
  );
}