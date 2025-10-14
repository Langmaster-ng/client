"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Roots (Free Plan – Starter)",
      monthly: 0,
      features: [
        "Access to beginner-level lessons in one language",
        "Daily limited lessons (2 per day)",
        "Basic cultural insights",
        "Basic speech recognition feedback",
        "Earn XP & streak rewards",
      ],
      button: "Get Started Free",
      highlight: false,
    },
    {
      name: "Heritage Plus (Premium – Individual)",
      monthly: 5000,
      features: [
        "Unlimited access to all lessons & languages",
        "Full AI-powered pronunciation coach",
        "Offline learning mode",
        "Advanced cultural content & proverbs",
        "Certificates for completed modules",
        "No ads & unlimited hearts/lives",
      ],
      button: "Select Heritage Plus",
      highlight: true,
    },
    {
      name: "Clan Plan (Family / Group)",
      monthly: 10000,
      features: [
        "Up to 5 family members or group accounts",
        "Everything in Heritage Plus for each member",
        "Family leaderboard & progress tracking",
        "Exclusive family challenges",
        "Early access to Kids Mode content",
      ],
      button: "Select Clan Plan",
      highlight: false,
    },
    {
      name: "LangMaster Enterprise (Institutions & Corporates)",
      monthly: 50000,
      features: [
        "Tailored access for schools, NGOs, or companies",
        "Admin dashboard to monitor multiple users",
        "Custom cultural packs (regional dialects)",
        "Dedicated account manager & support",
        "Branding & integration options",
        "Staff/student certification & reporting",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ];

  const yearlyPrice = (monthly) =>
    monthly === 0 ? 0 : monthly * 12 + 1500;

  return (
    <section className="bg-[#F5F4EF] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#363D49] mb-3">
          Start free. Upgrade anytime.
        </h2>
        <p className="text-center text-gray-700 mb-8">
          Choose the plan that works for you
        </p>

        {/* Toggle */}
        <div className="flex justify-center items-center mb-12 space-x-3">
          <span
            className={`text-sm ${
              billingCycle === "monthly" ? "text-[#267E43]" : "text-gray-600"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
            }
            className={`w-12 h-6 flex items-center rounded-full transition ${
              billingCycle === "yearly" ? "bg-[#267E43]" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm ${
              billingCycle === "yearly" ? "text-[#267E43]" : "text-gray-600"
            }`}
          >
            Yearly
          </span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl shadow-sm hover:shadow-lg transition bg-white p-6 flex flex-col ${
                plan.highlight ? "border-2 border-[#267E43]" : "border border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold text-[#363D49] mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-[#267E43] mb-1">
                ₦
                {billingCycle === "monthly"
                  ? plan.monthly.toLocaleString()
                  : yearlyPrice(plan.monthly).toLocaleString()}
                <span className="text-sm font-normal text-gray-600">
                  {billingCycle === "monthly" ? " /month" : " /year"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {plan.monthly === 0
                  ? "Perfect for starters"
                  : billingCycle === "monthly"
                  ? "Billed monthly"
                  : "Billed yearly"}
              </p>
              <button className="mt-auto mb-4 px-4 py-2 bg-[#267E43] text-white rounded-lg hover:bg-green-700 transition">
                {plan.button}
              </button>
              <ul className="space-y-2">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                    <FiCheck className="text-[#267E43] mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Payments powered by Paystack • Flutterwave • USSD
        </p>
      </div>
    </section>
  );
}
