"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Leaderboard({ items = [], coach }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Star size={18} className="text-[#047857]" />
        <h3 className="font-semibold text-gray-900">Leaderboard</h3>
      </div>

      {/* Coach highlight */}
      {coach && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-3 bg-[#ECFDF5] mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full overflow-hidden bg-white">
              <Image src={coach.avatar} alt="coach" width={36} height={36} />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-800">{coach.name}</div>
              <div className="text-gray-700">{coach.note}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                {item.avatar ? (
                  <Image src={item.avatar} alt={item.name} width={32} height={32} />
                ) : null}
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {idx + 1}. {item.name} {item.you && "(you)"}
                </div>
                <div className="text-gray-500">XP {item.xp}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
