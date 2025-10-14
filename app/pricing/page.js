"use client";

import { useState } from "react";
import PricingToggle from "@/components/PricingToggle";
import PricingCard from "@/components/PricingCard";
import PlanModal from "@/components/PlanModal";
import AuthNavbar from "@/components/AuthNavbar";
import AuthFooter from "@/components/AuthFooter";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const basePlans = [
    {
      id: "roots",
      name: "Roots (Free Plan – Starter)",
      desc: "Access beginner-level lessons in one language",
      price: 0,
      features: [
        "Access to beginner-level lessons in one language",
        "Daily limited lessons (2 per day)",
        "Basic cultural insights",
        "Basic speech recognition feedback",
        "Earn XP & streak rewards",
      ],
    },
    {
      id: "heritage",
      name: "Heritage Plus (Premium – Individual)",
      desc: "Unlimited access to all lessons & languages",
      price: 5000,
      features: [
        "Unlimited access to all lessons & languages",
        "Full AI-powered pronunciation coach",
        "Offline learning mode",
        "Advanced cultural content & proverbs",
        "Certificates for completed modules",
        "No ads & unlimited hearts/lives",
      ],
    },
    {
      id: "clan",
      name: "Clan Plan (Family / Group)",
      desc: "Up to 5 family members or group accounts",
      price: 10000,
      features: [
        "Everything in Heritage Plus for each member",
        "Family leaderboard & progress tracking",
        "Exclusive family challenges",
        "Early access to Kids Mode content",
      ],
    },
    {
      id: "enterprise",
      name: "LangMaster Enterprise (Institutions & Corporates)",
      desc: "Tailored access for schools, NGOs, or companies",
      price: 50000,
      features: [
        "Admin dashboard to monitor multiple users",
        "Custom cultural packs (regional dialects)",
        "Dedicated account manager & support",
        "Branding & integration options",
        "Staff/student certification & reporting",
      ],
    },
  ];

  const plans = basePlans.map((p) => ({
    ...p,
    price:
      p.price === 0
        ? 0
        : isYearly
        ? p.price * 12 + 1500
        : p.price,
    isYearly,
  }));

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceed = (plan) => {
 
    alert(`Redirecting to Paystack for ${plan.name} at ₦${plan.price}`);
    setSelectedPlan(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#F9FAFB]">
      <AuthNavbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#363D49] mb-3">Choose Your Plan</h1>
          <p className="text-gray-600">
            Pick the perfect plan for your learning journey.
          </p>
        </div>

        <PricingToggle onToggle={setIsYearly} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      </main>

      <AuthFooter />

  
      <PlanModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onProceed={handleProceed}
      />
    </div>
  );
}
