"use client";
import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";

const KEY = "vs-digest-settings"; 

export default function DigestToggle() {
  const [freq, setFreq] = useState("off");
  const [hour, setHour] = useState(9);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const { freq: f, hour: h } = JSON.parse(raw);
        if (f) setFreq(f);
        if (typeof h === "number") setHour(h);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ freq, hour }));
    } catch {}
  }, [freq, hour]);

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        {freq === "off" ? <BellOff size={16} className="text-gray-500"/> : <Bell size={16} className="text-green-600" />}
        <h4 className="text-sm font-semibold text-gray-900">Digest emails</h4>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <select
          className="rounded-lg border border-gray-200 px-2 py-1 text-sm outline-none"
          value={freq}
          onChange={(e)=> setFreq(e.target.value)}
        >
          <option value="off">Off</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        {freq !== "off" && (
          <>
            <span className="text-gray-500 text-xs">Send at</span>
            <select
              className="rounded-lg border border-gray-200 px-2 py-1 text-sm outline-none"
              value={hour}
              onChange={(e)=> setHour(parseInt(e.target.value,10))}
            >
              {[...Array(24)].map((_,i)=>(<option key={i} value={i}>{String(i).padStart(2,"0")}:00</option>))}
            </select>
          </>
        )}
      </div>

      <p className="mt-2 text-[11px] text-gray-500">
        We’ll use this when digests are enabled on the backend. You can change it any time.
      </p>
    </section>
  );
}
