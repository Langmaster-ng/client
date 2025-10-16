"use client";
import { useEffect, useState } from "react";
import { Bell, BellRing, Flame, Users } from "lucide-react";
import { motion } from "framer-motion";

const TIPS = [
  "Be specific; include examples.",
  "Thank helpers — it builds community.",
  "Use audio for tones & pronunciation.",
];

export default function RoomHeader({ room, online=0, followed, onToggleFollow }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v)=> (v+1)%TIPS.length), 3500);
    return () => clearInterval(t);
  }, []);

  if (!room) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{room.language} • {room.name}</h2>
          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-gray-600">
            <Users size={12}/> {room.members.toLocaleString()} members
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700 border border-green-200">{online} online</span>
          </div>
        </div>
        <button
          onClick={onToggleFollow}
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] ${followed ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
        >
          {followed ? <BellRing size={12}/> : <Bell size={12}/>}
          {followed ? "Following" : "Follow"}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Flame size={14} className="text-orange-500"/>
        <motion.div
          key={i}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-xs text-gray-700"
        >
          {TIPS[i]}
        </motion.div>
      </div>
    </div>
  );
}
