"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const XPContext = createContext(null);
const XP_KEY = "lm-xp";
const STREAK_KEY = "lm-streak";
const LAST_ACTIVE_KEY = "lm-last-active";
const SEC_TODAY_KEY = "lm-seconds-today"; 

export function XPProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [secondsToday, setSecondsToday] = useState(0);

  useEffect(() => {
    try {
      const x = parseInt(localStorage.getItem(XP_KEY) || "0", 10);
      const s = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
      const last = localStorage.getItem(LAST_ACTIVE_KEY);
      const sec = parseInt(localStorage.getItem(SEC_TODAY_KEY) || "0", 10);
      const today = new Date().toDateString();

      setXp(x);
      // bump streak if last active was not today
      if (last !== today) {
        setStreak(s + 1);
        localStorage.setItem(STREAK_KEY, String(s + 1));
        localStorage.setItem(LAST_ACTIVE_KEY, today);
        // reset today seconds when day changes
        setSecondsToday(0);
        localStorage.setItem(SEC_TODAY_KEY, "0");
      } else {
        setStreak(s);
        setSecondsToday(sec);
      }
    } catch {}
  }, []);

  // passive “time on task” counter (ticks while user is on Lessons hub)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsToday((v) => {
        const next = v + 1;
        try { localStorage.setItem(SEC_TODAY_KEY, String(next)); } catch {}
        return next;
      });
      try { localStorage.setItem(LAST_ACTIVE_KEY, new Date().toDateString()); } catch {}
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const api = useMemo(() => ({
    xp,
    streak,
    secondsToday,
    addXP: (delta) => {
      setXp((v) => {
        const next = Math.max(0, v + delta);
        try { localStorage.setItem(XP_KEY, String(next)); } catch {}
        return next;
      });
    },
    // Call when user completes a practice block
    touchDay: () => {
      try { localStorage.setItem(LAST_ACTIVE_KEY, new Date().toDateString()); } catch {}
    }
  }), [xp, streak, secondsToday]);

  return <XPContext.Provider value={api}>{children}</XPContext.Provider>;
}

export function useXP() {
  const ctx = useContext(XPContext);
  if (!ctx) throw new Error("useXP must be used within XPProvider");
  return ctx;
}

export function formatHMS(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s}s`;
}
