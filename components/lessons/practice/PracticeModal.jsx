"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, Check, XCircle, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useXP } from "../xpStore";

/* ——— Per-task XP values  ——— */
const XP_CORRECT = 15;
const XP_WRONG = -5;

/* ——— Modal wrapper ——— */
export default function PracticeModal({ unit, onClose }) {
  const open = !!unit;
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(null); 
  const [showKeepGoing, setShowKeepGoing] = useState(false);
  const { addXP } = useXP();

  useEffect(() => {
    if (!open) return;
    setI(0);
    setCorrect(null);
    setShowKeepGoing(false);
  }, [open]);

  const tasks = useMemo(() => unit?.tasks || [], [unit]);

  function handleResult(ok) {
    setCorrect(ok);
    addXP(ok ? XP_CORRECT : XP_WRONG);
    // mid-run encouragement
    if (ok && Math.random() < 0.2) setShowKeepGoing(true);
  }

  function next() {
    setCorrect(null);
    setShowKeepGoing(false);
    setI((x) => Math.min(x + 1, tasks.length - 1));
  }
  function prev() {
    setCorrect(null);
    setShowKeepGoing(false);
    setI((x) => Math.max(0, x - 1));
  }

  if (!open) return null;

  const pct = Math.round(((i + 1) / tasks.length) * 100);
  const t = tasks[i];

  return (
    <AnimatePresence>
      <motion.div
        key="pmask"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/50 p-4 overflow-y-auto"
      >
        <motion.div
          key="pbox"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-4 md:p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-gray-900">{unit.title}</h3>
              <p className="text-xs text-gray-500">Task {i + 1} of {tasks.length} • {pct}% complete</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-[#22C55E]" style={{ width: `${pct}%` }} />
          </div>

          {/* Active Task */}
          <div className="mt-4">
            {t?.type === "vocab" && <VocabFlip cards={t.cards} onDone={() => handleResult(true)} />}
            {t?.type === "mcq" && <MCQ question={t.question} options={t.options} correctIndex={t.correctIndex} onResult={handleResult} />}
            {t?.type === "image" && <SelectImage question={t.question} options={t.options} correctIndex={t.correctIndex} onResult={handleResult} />}
            {t?.type === "match" && <MatchPairs prompt={t.prompt} pairs={t.pairs} onResult={handleResult} />}
          </div>

          {/* Nav */}
          <div className="mt-5 flex items-center justify-between">
            <button onClick={prev} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={next} className="inline-flex items-center gap-1 rounded-lg bg-[#22C55E] px-3 py-2 text-sm font-semibold text-white hover:brightness-95">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Feedback modals */}
        <Feedback correct={correct} onClose={() => setCorrect(null)} />
        <KeepGoing open={showKeepGoing} onClose={() => setShowKeepGoing(false)} />
      </motion.div>
    </AnimatePresence>
  );
}

/* ——— Feedback: Correct / Incorrect ——— */
function Feedback({ correct, onClose }) {
  if (correct == null) return null;
  const ok = !!correct;
  return (
    <AnimatePresence>
      <motion.div
        key="fmask"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center"
      >
        <motion.div
          key="fbox"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`mx-4 w-full max-w-sm rounded-2xl border p-6 text-center shadow-2xl ${
            ok ? "border-green-200 bg-white" : "border-rose-200 bg-white"
          }`}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: ok ? "rgba(34,197,94,0.12)" : "rgba(244,63,94,0.12)" }}>
            {ok ? <Check className="text-[#22C55E]" /> : <XCircle className="text-rose-500" />}
          </div>
          <h4 className="mt-3 text-lg font-semibold">{ok ? "Great job!" : "Almost there"}</h4>
          <p className="mt-1 text-sm text-gray-600">
            {ok ? "+15 XP earned" : "−5 XP. Try the next one!"}
          </p>
          <button onClick={onClose} className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:brightness-95">
            Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ——— Keep Going encouragement ——— */
function KeepGoing({ open, onClose }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="kgmask"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center"
      >
        <motion.div
          key="kgbox"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
          className="mx-4 w-full max-w-sm rounded-2xl border border-green-200 bg-white p-6 text-center shadow-2xl"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]/15">
            <Sparkles className="text-[#22C55E]" />
          </div>
          <h4 className="mt-3 text-lg font-semibold text-gray-900">You’re on fire! 🔥</h4>
          <p className="mt-1 text-sm text-gray-600">Keep going — you’re building momentum.</p>
          <button onClick={onClose} className="mt-4 rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white hover:brightness-95">
            Let’s go
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ——— Task: Vocab flip ——— */
function VocabFlip({ cards, onDone }) {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const c = cards[i];

  function next() {
    if (i < cards.length - 1) {
      setI(i + 1);
      setRevealed(false);
    } else {
      onDone?.();
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 md:p-6">
      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
        <span>Card {i + 1} of {cards.length}</span>
        <span className="inline-flex items-center gap-1"><Volume2 size={16} className="text-gray-500" /> (TTS later)</span>
      </div>
      <button
        onClick={() => setRevealed((v) => !v)}
        className="mx-auto flex h-56 w-full max-w-md items-center justify-center rounded-2xl border border-gray-200 bg-white text-center shadow-sm"
      >
        <div>
          <div className="text-2xl font-bold text-[#0B6B3A]">{c.term}</div>
          <div className="mt-2 text-sm text-gray-500">{revealed ? c.meaning : "Click to reveal meaning"}</div>
        </div>
      </button>
      <div className="mt-4 text-right">
        <button onClick={next} className="inline-flex items-center gap-1 rounded-lg bg-[#22C55E] px-3 py-2 text-sm font-semibold text-white hover:brightness-95">
          Next
        </button>
      </div>
    </div>
  );
}

/* ——— Task: MCQ ——— */
function MCQ({ question, options, correctIndex, onResult }) {
  const [picked, setPicked] = useState(null);

  function choose(idx) {
    if (picked != null) return;
    setPicked(idx);
    onResult?.(idx === correctIndex);
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 md:p-6">
      <h4 className="text-base font-semibold text-gray-900">{question}</h4>
      <div className="mt-4 space-y-2">
        {options.map((opt, idx) => {
          const sel = picked === idx;
          const state =
            picked != null
              ? idx === correctIndex
                ? "correct"
                : sel
                ? "wrong"
                : "idle"
              : "idle";
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${
                state === "idle" && "border-gray-200 bg-white hover:bg-gray-50"
              } ${state === "correct" && "border-green-200 bg-green-50"} ${
                state === "wrong" && "border-rose-200 bg-rose-50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ——— Task: Select Image ——— */
function SelectImage({ question, options, correctIndex, onResult }) {
  const [picked, setPicked] = useState(null);
  function choose(i) {
    if (picked != null) return;
    setPicked(i);
    onResult?.(i === correctIndex);
  }
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 md:p-6">
      <h4 className="text-base font-semibold text-gray-900">{question}</h4>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((o, i) => {
          const sel = picked === i;
          const state =
            picked != null
              ? i === correctIndex
                ? "correct"
                : sel
                ? "wrong"
                : "idle"
              : "idle";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`overflow-hidden rounded-2xl border text-left ${
                state === "idle" && "border-gray-200 bg-white hover:bg-gray-50"
              } ${state === "correct" && "border-green-200 bg-green-50"} ${
                state === "wrong" && "border-rose-200 bg-rose-50"
              }`}
            >
              <img src={o.img} alt={o.label} className="h-28 w-full object-cover" />
              <div className="p-2 text-xs text-gray-700">{o.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ——— Task: Match pairs (simple) ——— */
function MatchPairs({ prompt, pairs, onResult }) {
  // simple approach: user chooses correct English for the shown Yoruba phrase (random)
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);

  const current = pairs[idx];
  const shuffledRights = useMemo(() => {
    const arr = pairs.map((p) => p.right);
    return arr.sort(() => 0.5 - Math.random());
  }, [idx]); // reshuffle each item

  function pick(r) {
    if (picked != null) return;
    const ok = r === current.right;
    setPicked(r);
    onResult?.(ok);
    // advance after a short delay
    setTimeout(() => {
      if (idx < pairs.length - 1) {
        setIdx(idx + 1);
        setPicked(null);
      }
    }, 600);
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 md:p-6">
      <h4 className="text-base font-semibold text-gray-900">{prompt}</h4>
      <div className="mt-3 text-sm text-gray-700">Word: <span className="font-semibold">{current.left}</span></div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {shuffledRights.map((r, i) => {
          const sel = picked === r;
          const state =
            picked != null
              ? r === current.right
                ? "correct"
                : sel
                ? "wrong"
                : "idle"
              : "idle";
        return (
          <button
            key={i}
            onClick={() => pick(r)}
            className={`rounded-xl border px-3 py-2 text-sm ${
              state === "idle" && "border-gray-200 bg-white hover:bg-gray-50"
            } ${state === "correct" && "border-green-200 bg-green-50"} ${
              state === "wrong" && "border-rose-200 bg-rose-50"
            }`}
          >
            {r}
          </button>
        );})}
      </div>
      <div className="mt-2 text-xs text-gray-500">Item {idx + 1} of {pairs.length}</div>
    </div>
  );
}
