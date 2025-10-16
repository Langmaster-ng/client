"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["👏","🔥","💡","❤️"];

export default function ReactionsBar({ initial = {}, onChange }) {
  const [counts, setCounts] = useState(() => {
    const base = { "👏":0,"🔥":0,"💡":0,"❤️":0, ...initial };
    return base;
  });

  function react(e) {
    setCounts((c) => {
      const next = { ...c, [e]: (c[e] || 0) + 1 };
      onChange?.(next);
      return next;
    });
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      {EMOJIS.map((e, i) => (
        <button
          key={e}
          onClick={() => react(e)}
          className="relative rounded-full border border-gray-200 bg-white px-2 py-1 text-[11px] hover:bg-gray-50"
        >
          <span>{e}</span>
          <span className="ml-1 text-gray-600">{counts[e] || 0}</span>
          {/* pop */}
          <motion.span
            key={counts[e]}
            className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs"
            initial={{ opacity: 0, y: 0, scale: 0.7 }}
            animate={{ opacity: [0,1,0], y: [-6,-16], scale: [0.7,1] }}
            transition={{ duration: 0.8 }}
          >
            {e}
          </motion.span>
        </button>
      ))}
    </div>
  );
}
