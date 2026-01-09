"use client";
import Link from "next/link";
import Image from "next/image";
import { FiTwitter, FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/LM.png" 
              alt="LangMaster"
              width={30}
              height={30}
            />
            <span className="font-bold text-lg text-[#363D49]">LangMaster</span>
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Master African languages with AI-powered learning and cultural authenticity.
          </p>
        </div>

     
        <div>
          <h4 className="font-semibold text-[#363D49] mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/languages" className="hover:text-[#267E43]">Languages</Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#267E43]">Pricing</Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#267E43]">Features</Link>
            </li>
          </ul>
        </div>

    
        <div>
          <h4 className="font-semibold text-[#363D49] mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="" className="hover:text-[#267E43]">Blog</Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#267E43]">Help Center</Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#267E43]">Contact</Link>
            </li>
          </ul>
        </div>

   
        <div>
          <h4 className="font-semibold text-[#363D49] mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/privacy" className="hover:text-[#267E43]">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#267E43]">Terms of Service</Link>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4 text-gray-500">
            <Link href="https://www.linkedin.com/company/langmasterconect/" aria-label="LinkedIn">
              <FiLinkedin className="hover:text-[#267E43]" size={18} />
            </Link>
            <Link href="https://www.instagram.com/langmaster_connect/" aria-label="Instagram">
              <FiInstagram className="hover:text-[#267E43]" size={18} />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61580283224640&mibextid=ZbWKwL" aria-label="Facebook">
              <FiFacebook className="hover:text-[#267E43]" size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} LangMaster. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with ❤️ in Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
