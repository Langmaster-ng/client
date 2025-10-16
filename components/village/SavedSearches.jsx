"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, X } from "lucide-react";

const KEY = "vs-saved-searches";

export default function SavedSearches({ query, setQuery }) {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setSaved(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);

  function persist(next) {
    setSaved(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }

  function addCurrent() {
    const q = (query || "").trim();
    if (!q) return;
    if (saved.includes(q)) return;
    persist([q, ...saved].slice(0, 12));
  }

  function remove(q) {
    persist(saved.filter(s => s !== q));
  }

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark size={16} className="text-green-600" />
          <h4 className="text-sm font-semibold text-gray-900">Saved searches</h4>
        </div>
        <button
          onClick={addCurrent}
          className="text-xs rounded-full border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50"
        >
          Save current
        </button>
      </div>

      {saved.length === 0 ? (
        <p className="text-xs text-gray-500">No saved searches yet. Type a search above and click “Save current”.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {saved.map((q, i) => (
            <motion.button
              key={q + i}
              whileTap={{ scale: 0.98 }}
              onClick={() => setQuery(q)}
              className="group relative inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700"
            >
              {q}
              <span
                onClick={(e) => { e.stopPropagation(); remove(q); }}
                className="ml-1 hidden rounded-full bg-white p-0.5 text-rose-600 group-hover:block"
                title="Remove"
              >
                <X size={12} />
              </span>
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
}
