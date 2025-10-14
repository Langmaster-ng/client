"use client";
import Link from "next/link";

export default function AuthFooter() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
     
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-[#267E43] rounded-md text-white font-bold">
            LM
          </div>
          <span className="font-bold text-lg text-[#363D49]">Lang Master</span>
        </Link>

     
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Lang Master. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
