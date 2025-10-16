"use client";
import { useEffect, useState } from "react";

const POSITIVE = ["please","thank you","could you","would you","kindly","appreciate"];
const NEGATIVE = ["stupid","dumb","shut up","hate","idiot"];

export default function CivilityMeter({ text }) {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = (text || "").toLowerCase();
    let s = 0;
    POSITIVE.forEach(p => { if (t.includes(p)) s += 1; });
    NEGATIVE.forEach(n => { if (t.includes(n)) s -= 2; });
    setScore(Math.max(-3, Math.min(5, s)));
  }, [text]);

  const color =
    score >= 2 ? "bg-green-100 text-green-800 border-green-200" :
    score >= 0 ? "bg-amber-100 text-amber-800 border-amber-200" :
                 "bg-rose-100 text-rose-800 border-rose-200";

  const label =
    score >= 2 ? "Kind & clear" : score >= 0 ? "Neutral" : "Rephrase kindly";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-[11px] ${color}`}>
      <span>🤝</span><span>{label}</span>
    </div>
  );
}
