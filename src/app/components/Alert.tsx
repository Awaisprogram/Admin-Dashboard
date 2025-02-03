'use client';
import { useState } from "react";
import Link from "next/link";

const TopBar = () => {
  const [visible, setVisible] = useState(true)
  
  return (
    visible &&(
      <div className="bg-gray-900 relative z-20 text-gray-100 lg:text-sm text-[12px] py-1 text-center relative">
       Get access of Admin Dahboard after sign-up. {" "}
        <Link href="/" className="transition ease-in hover:text-color">
          Learn More!
        </Link>
        <button
          onClick={()=> setVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  text-gray-100 transition ease-in hover:text-color"
        >
          ✕
        </button>
      </div>
    )
  );
};

export default TopBar;