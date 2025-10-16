"use client";
import { useEffect, useMemo, useState } from "react";
import { UserPlus, UserMinus, Sparkles } from "lucide-react";

const KEY = "vs-followed-people"; 

export default function FollowingPeople({ threads, onChange }) {
  const [followed, setFollowed] = useState([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setFollowed(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);

  // Persist + bubble up to parent
  function persist(next) {
    setFollowed(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    onChange?.(next);
  }

  // Suggest people from recent/popular threads (unique authors)
  const suggestions = useMemo(() => {
    const seen = new Set();
    // rank authors by votes/answers in last render
    const scored = threads.map(t => ({
      author: t.author?.name || "Anon",
      score: (t.votes * 2) + (t.answers * 3) + (t.solved ? 2 : 0)
    }));
    // aggregate by author
    const byAuthor = {};
    for (const s of scored) {
      if (!byAuthor[s.author]) byAuthor[s.author] = 0;
      byAuthor[s.author] += s.score;
    }
    // to list, sort desc, remove already-followed & "You"
    return Object.entries(byAuthor)
      .map(([author, score]) => ({ author, score }))
      .filter(x => x.author !== "You" && !followed.includes(x.author))
      .sort((a,b) => b.score - a.score)
      .slice(0, 6);
  }, [threads, followed]);

  function toggle(name) {
    if (followed.includes(name)) {
      persist(followed.filter(n => n !== name));
    } else {
      persist([name, ...followed].slice(0, 30));
    }
  }

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={16} className="text-green-600"/>
        <h4 className="text-sm font-semibold text-gray-900">People you follow</h4>
      </div>

      {/* followed list */}
      {followed.length === 0 ? (
        <p className="text-xs text-gray-500">You’re not following anyone yet.</p>
      ) : (
        <div className="mb-3 flex flex-wrap gap-2">
          {followed.map((name) => (
            <span key={name} className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-2 py-1 text-[11px] text-green-800">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                {name.slice(0,1).toUpperCase()}
              </span>
              {name}
              <button onClick={() => toggle(name)} className="ml-1 rounded-full border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10px] text-rose-700 hover:bg-rose-100">
                <UserMinus size={12}/>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* suggestions */}
      <div className="mt-2">
        <div className="mb-1 text-xs font-semibold text-gray-700">Suggested</div>
        {suggestions.length === 0 ? (
          <p className="text-xs text-gray-500">No suggestions right now.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {suggestions.map(s => (
              <div key={s.author} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-[10px] font-bold text-white">
                    {s.author.slice(0,1).toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-800">{s.author}</div>
                </div>
                <button onClick={() => toggle(s.author)} className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-[11px] text-gray-700 hover:bg-gray-50">
                  <UserPlus size={12}/> Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
