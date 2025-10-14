"use client";
import Link from "next/link";
import { FiLinkedin, FiInstagram, FiFacebook } from "react-icons/fi";

export default function WaitlistFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
      
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 bg-[#267E43] rounded-md text-white font-bold">
              LM
            </div>
            <span className="font-bold text-lg text-[#363D49]">LangMaster</span>
          </div>
          <p className="text-gray-600 text-sm">
            Reconnecting Africa to its linguistic roots through technology.
          </p>
        </div>

     
        <div>
          <h4 className="font-semibold text-[#363D49] mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/about" className="hover:text-[#267E43]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-[#267E43] font-medium">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-[#267E43] font-medium">
                Press
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#363D49] mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/help" className="hover:text-[#267E43]">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#267E43]">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#267E43]">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

      
        <div>
          <h4 className="font-semibold text-[#363D49] mb-3">Connect</h4>
          <div className="flex space-x-4 text-gray-500">
            <Link
              href="https://www.linkedin.com/company/langmasterconect/"
              aria-label="LinkedIn"
              target="_blank"
            >
              <FiLinkedin className="hover:text-[#267E43]" size={18} />
            </Link>
            <Link
              href="https://www.instagram.com/langmaster_connect/"
              aria-label="Instagram"
              target="_blank"
            >
              <FiInstagram className="hover:text-[#267E43]" size={18} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61580283224640&mibextid=ZbWKwL"
              aria-label="Facebook"
              target="_blank"
            >
              <FiFacebook className="hover:text-[#267E43]" size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} LangMaster. Built in Rivers State, Nigeria. For Africa, for the world.
        </div>
      </div>
    </footer>
  );
}
