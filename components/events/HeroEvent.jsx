"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function fmt(ms) {
  if (ms <= 0) return "Starts soon";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${h}h ${m}m ${ss}s`;
}

export default function HeroEvent({ title, subtitle, badges = [], startAt, cta, secondary, character }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const remaining = useMemo(() => Math.max(0, startAt - now), [startAt, now]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 md:p-6 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {badges.map((b) => (
              <span
                key={b.label}
                className="text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#bbf7d0]"
              >
                {b.label}
              </span>
            ))}
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mt-2 text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#F0F2F5] dark:bg-[#374151] text-gray-700 dark:text-gray-200">
              Starts in {fmt(remaining)}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={cta?.onClick}
              className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white rounded-xl px-5 py-2 shadow-sm"
            >
              {cta?.label || "Join"}
              <ArrowRight size={18} />
            </motion.button>
            {secondary && (
              <button
                onClick={secondary.onClick}
                className="inline-flex items-center gap-2 bg-[#F0F2F5] dark:bg-[#374151] text-gray-900 dark:text-gray-100 rounded-xl px-5 py-2"
              >
                {secondary.label}
              </button>
            )}
          </div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative w-full md:w-80 rounded-2xl bg-[#F0F2F5] dark:bg-[#111827] flex items-center justify-center p-6"
        >
          {character?.img && (
            <Image
              src={character.img}
              alt={character.alt || "character"}
              width={144}
              height={144}
              className="object-contain"
            />
          )}
        
          <span className="absolute inset-0 rounded-2xl pointer-events-none shadow-[0_0_40px_rgba(34,197,94,0.12)]" />
        </motion.div>
      </div>
    </motion.section>
  );
}
