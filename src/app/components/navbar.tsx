"use client";

import { FaBell} from "react-icons/fa";
import Link from "next/link";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./theme";
import SearchBar from "./searchbar";

const Navbar = () => {
  const { isSignedIn } = useUser();
  

  return (
    <nav className="bg-black h-[64px] flex justify-between items-center relative z-20 shadow-md">
      <div className="container mx-auto px-6 flex  justify-between items-center w-full">
        <div className="flex gap-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-white">
          Bandage
        </Link>

        {/* Search Bar - Moves to Right on Small Screens */}
        <div className="hidden mr-auto lg:block">
          <SearchBar />
        </div>
        </div>
        <div className="lg:hidden ml-auto text-black dark:text-white">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-white">
          <FaBell className="text-3xl cursor-pointer lg:block hidden hover:text-gray-400" />
          <ModeToggle />
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-white text-sm rounded-full hover:opacity-90 border transition duration-300">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
