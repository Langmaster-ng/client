"use client";
import { useEffect, useState } from "react";
import { Users, Timer, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveRoomChip({ onJoin }) {
  return (
    <button
      onClick={onJoin}
      className="inline-flex items-center gap-2 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
    >
      <Users size={14}/> Join Live (10m)
    </button>
  );
}

export function LiveRoomModal({ open, onClose, roomName="Practice Sprint" }) {
  const [seconds, setSeconds] = useState(600);
  useEffect(() => {
    if (!open) return;
    setSeconds(600);
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [open]);
  const mm = String(Math.floor(seconds/60)).padStart(2,"0");
  const ss = String(seconds%60).padStart(2,"0");

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div
            initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}}
            className="relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-5 shadow-xl"
          >
            <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              <X size={18}/>
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Timer size={16} className="text-green-600"/> {roomName}
              <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">{mm}:{ss}</span>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Quick 10-minute speaking sprint. Be kind & concise. Summaries will be posted.
            </p>

            {/* participants mock */}
            <div className="mt-3 flex -space-x-2">
              {["A","B","C","D","E","F"].map((n,i)=>(
                <div key={i} className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">{n}</div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Mute</button>
              <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Raise hand</button>
            </div>

            <div className="mt-4">
              <button onClick={onClose} className="w-full rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700">
                Leave & Post Summary
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
