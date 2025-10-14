"use client";
import { useState } from "react";

export default function PricingToggle({ onToggle }) {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly(!isYearly);
    onToggle(!isYearly);
  };

  return (
    <div className="flex items-center justify-center mb-10">
      <span className={`text-sm mr-2 ${!isYearly ? "text-emerald-700 font-medium" : "text-gray-500"}`}>
        Monthly
      </span>
      <button
        onClick={handleToggle}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          isYearly ? "bg-emerald-700" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            isYearly ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
      <span className={`text-sm ml-2 ${isYearly ? "text-emerald-700 font-medium" : "text-gray-500"}`}>
        Yearly
      </span>
    </div>
  );
}
