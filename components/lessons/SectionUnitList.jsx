"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle2 } from "lucide-react";
import PracticeModal from "./practice/PracticeModal";
import { useXP } from "./xpStore";

/* --- Sample Curriculum (mock data) --- */
const CURRICULUM = [
  {
    id: "sec-1",
    title: "Section 1 • Core Basics",
    subtitle: "Numbers, greetings, polite phrases",
    units: [
      {
        id: "u-1",
        title: "Greetings 1 (Yorùbá)",
        estMin: 6,
        cover:
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
        tasks: [
          // vocab flip
          {
            type: "vocab",
            cards: [
              { term: "Ẹ kú àárọ̀", meaning: "Good morning", audio: "" },
              { term: "Báwo ni?", meaning: "How are you?", audio: "" },
              { term: "Ó dàbọ̀", meaning: "Goodbye", audio: "" },
            ],
          },
          // MCQ
          {
            type: "mcq",
            question: "How do you say ‘Good morning’ in Yorùbá?",
            options: ["Ẹ kú àárọ̀", "Báwo ni?", "Ó dàbọ̀"],
            correctIndex: 0,
          },
          // image select
          {
            type: "image",
            question: "Select the image that matches ‘Ó dàbọ̀’ (Goodbye)",
            options: [
              { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop", label: "Handshake" },
              { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop", label: "Waving goodbye" }, // correct
              { img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=600&auto=format&fit=crop", label: "Writing" },
            ],
            correctIndex: 1,
          },
          // match word (simple pairing)
          {
            type: "match",
            prompt: "Match Yorùbá to English",
            pairs: [
              { left: "Báwo ni?", right: "How are you?" },
              { left: "Ẹ kú àárọ̀", right: "Good morning" },
              { left: "Ó dàbọ̀", right: "Goodbye" },
            ],
          },
        ],
      },
      {
        id: "u-2",
        title: "Numbers 1 (Igbo)",
        estMin: 5,
        cover:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        tasks: [
          { type: "mcq", question: "‘Otu’ means…", options: ["Three", "One", "Two"], correctIndex: 1 },
          { type: "mcq", question: "‘Abụọ’ means…", options: ["Two", "Four", "Five"], correctIndex: 0 },
        ],
      },
    ],
  },
  {
    id: "sec-2",
    title: "Section 2 • Dialogues & Politeness",
    subtitle: "Everyday chat, titles, respect",
    units: [
      {
        id: "u-3",
        title: "Culture & Respect (Hausa)",
        estMin: 4,
        cover:
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
        tasks: [
          { type: "vocab", cards: [{ term: "Sannu", meaning: "Hello" }, { term: "Sannunku", meaning: "Hello (plural/politeness)" }] },
          { type: "mcq", question: "Plural/polite ‘Hello’ is…", options: ["Sannu", "Sannunku", "Na gode"], correctIndex: 1 },
        ],
      },
    ],
  },
];

/* --- Component --- */
export default function SectionUnitList() {
  const [activeUnit, setActiveUnit] = useState(null); 
  const { touchDay } = useXP();

  const sections = useMemo(() => CURRICULUM, []);

  return (
    <>
      {sections.map((sec, si) => (
        <motion.section
          key={sec.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.04 }}
          className="rounded-2xl border border-gray-100 bg-white p-4 md:p-6"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{sec.title}</h3>
            <p className="text-sm text-gray-500">{sec.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {sec.units.map((u) => (
              <motion.button
                key={u.id}
                whileHover={{ y: -3 }}
                className="group text-left overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                onClick={() => { setActiveUnit(u); touchDay(); }}
              >
                <div className="relative h-32 w-full">
                  <img src={u.cover} alt={u.title} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-700 border border-green-200">
                    ~{u.estMin} min
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{u.title}</h4>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-600">
                      <CheckCircle2 size={12} /> 0/1 mastered
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#22C55E]/10 px-2 py-1 text-[11px] font-medium text-[#22C55E] group-hover:bg-[#22C55E]/20">
                      <Play size={12} /> Start
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Practice modal */}
      <PracticeModal unit={activeUnit} onClose={() => setActiveUnit(null)} />
    </>
  );
}
