"use client";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <nav className="w-full flex justify-center py-4">
      <div className="flex items-center justify-between w-[95%] md:w-[80%] bg-white rounded-full shadow-md px-6 py-2">
    
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-[#267E43] rounded-md text-white font-bold">
            LM
          </div>
          <span className="font-bold text-lg text-[#363D49]">Lang Master</span>
        </Link>

    
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm text-[#363D49] hover:text-[#267E43]">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-[#267E43] text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
