"use client";
import { useState } from "react";
import {
  FiMenu,
  FiGrid,
  FiShoppingBag,
  FiBookOpen,
  FiCreditCard, 
  FiMapPin,
  FiSettings,
} from "react-icons/fi";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const { isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  // Navigation Links
  const navLinks = [
    { icon: <FiGrid size={24} />, href: "/", label: "Dashboard" },
    ...(isAdmin
      ? [
          {
            icon: <FiShoppingBag size={24} />,
            href: "/products",
            label: "Products",
          },
          { icon: <FiBookOpen size={24} />, href: "/order", label: "Orders" },
          {
            icon: <FiCreditCard size={24} />, 
            href: "/payments",
            label: "Payments", 
          },
          {
            icon: <FiMapPin size={24} />,
            href: "/shippings",
            label: "Shippings",
          },
        ]
      : []),
    { icon: <FiSettings size={24} />, href: "/settings", label: "Settings" },
  ];

  return (
    <div className="flex h-dvh overflow-hidden fixed top-10">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-black p-4 transition-all duration-500 ${
          isActive ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsActive(!isActive)}
          className="absolute top-24 left-4 text-white pb-4 text-lg cursor-pointer"
        >
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <div
          className={`flex items-center text-white mt-24 transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* User Info */}
        <div className="flex items-center pt-10 text-white">
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="border px-1 py-1 text-white  text-sm rounded-full hover:opacity-90 transition duration-300">
                Sign In
              </button>
            </SignInButton>
          )}
          {isSignedIn && (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          )}
          {isActive && isSignedIn && (
            <div className="ml-3">
              <p className="font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm">{isAdmin ? "Admin" : "User"}</p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="mt-6 space-y-4">
          {navLinks.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.href}
                className="flex items-center text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                {item.icon}
                {isActive && <span className="ml-4">{item.label}</span>}
              </Link>
              {!isActive && (
                <span className="absolute left-full ml-2 px-3 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}