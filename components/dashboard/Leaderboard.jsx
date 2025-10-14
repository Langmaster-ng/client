"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";

const leaderboardData = [
  {
    id: 1,
    name: "Ada Lovelace",
    xp: 3120,
    rank: 1,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Tunde Balogun",
    xp: 2890,
    rank: 2,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Chika Obi",
    xp: 2600,
    rank: 3,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    xp: 2200,
    rank: 4,
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 5,
    name: "Emeka Nwosu",
    xp: 2000,
    rank: 5,
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

export default function Leaderboard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          Leaderboard
        </h2>
        <span className="text-sm text-gray-500">This Week</span>
      </div>

      <div className="flex flex-col gap-4">
        {leaderboardData.map((user, index) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`relative flex items-center justify-between rounded-xl border p-4 shadow-sm overflow-hidden ${
              user.rank === 1
                ? "bg-gradient-to-r from-yellow-100/70 to-green-50 border-yellow-300"
                : user.rank === 2
                ? "bg-gradient-to-r from-gray-100/60 to-green-50 border-gray-200"
                : user.rank === 3
                ? "bg-gradient-to-r from-amber-50 to-green-50 border-amber-200"
                : "bg-white border-gray-100"
            }`}
          >
            {/* Glow effect */}
            {user.rank <= 3 && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-green-500/10 blur-xl"
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + index * 0.3,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Left side */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full border-2 border-green-500 object-cover"
                />
                {user.rank <= 3 && (
                  <div className="absolute -top-3 -right-3">
                    <Crown
                      size={22}
                      className={`${
                        user.rank === 1
                          ? "text-yellow-400"
                          : user.rank === 2
                          ? "text-gray-400"
                          : "text-amber-600"
                      } drop-shadow-md`}
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">Rank #{user.rank}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(user.xp / 3200) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-2 rounded-full bg-green-500/20 absolute bottom-2 left-0 right-0 mx-4"
              ></motion.div>
              <p className="font-bold text-green-600">{user.xp} XP</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
