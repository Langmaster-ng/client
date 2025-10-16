"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, MessageSquare, CheckCircle2, ArrowUp, Flag, X, Send, Sparkles, ShieldAlert, HelpCircle,
  UserPlus, UserMinus
} from "lucide-react";

import ReactionsBar from "./ReactionsBar";
import AudioReply from "./AudioReply";
import { LiveRoomChip, LiveRoomModal } from "./LiveRoomChip";
import CivilityMeter from "./CivilityMeter";
import RoomHeader from "./RoomHeader";
import SavedSearches from "./SavedSearches";
import DigestToggle from "./DigestToggle";
import FollowingPeople from "./FollowingPeople";

/* ---------- Mock data ---------- */
const ROOMS = [
  { id: "igbo-beg", name: "Beginners", language: "Igbo", members: 1280, tags: ["Greetings","Basics"] },
  { id: "yor-pron", name: "Pronunciation", language: "Yoruba", members: 1450, tags: ["Tone marks","Listening"] },
  { id: "hau-cult", name: "Culture", language: "Hausa", members: 760, tags: ["Proverbs","Etiquette"] },
];

const INITIAL_THREADS = [
  {
    id: "t1",
    roomId: "igbo-beg",
    title: "How to say “Good morning” vs “Did you wake well” in Igbo?",
    body: "I’ve heard ‘Ụtụtụ ọma’ and ‘Ị bọla chi’. When do you use each with elders?",
    author: { name: "Adaeze", avatar: "A", account_age_days: 400 },
    votes: 22, answers: 2, solved: true, createdAt: "2h",
    reports: 0,
    replies: [
      { id: "r1", author: "Chinedu", account_age_days: 365, text: "‘Ụtụtụ ọma’ = Good morning; ‘Ị bọla chi?’ = Did you wake well? Use latter warmly with close relations.", votes: 8, accepted: true },
      { id: "r2", author: "Ngozi", account_age_days: 90, text: "With elders, add titles and gentle tone. Plural politeness can show respect.", votes: 2, accepted: false },
    ],
    reactions: {},
  },
  {
    id: "t2",
    roomId: "yor-pron",
    title: "Yorùbá tone marks still confuse me on long words—best drills?",
    body: "Any pattern for hearing high-mid-low on longer words? Sample words welcome.",
    author: { name: "Seun", avatar: "S", account_age_days: 60 },
    votes: 14, answers: 1, solved: false, createdAt: "5h",
    reports: 0,
    replies: [
      { id: "r3", author: "Bimbo", account_age_days: 720, text: "Clap out tones: each syllable a beat. Practice with ‘ọmọdè’, ‘olúwa’, ‘ìbàdàn’.", votes: 5, accepted: false },
    ],
    reactions: {},
  },
  {
    id: "t3",
    roomId: "hau-cult",
    title: "Sannu vs Sannunku (plural)—usage with elders?",
    body: "What’s polite in a group vs one-on-one?",
    author: { name: "Umar", avatar: "U", account_age_days: 12 },
    votes: 9, answers: 0, solved: false, createdAt: "1d",
    reports: 2,
    replies: [],
    reactions: {},
  },
];

/* ---------- Storage keys & helpers ---------- */
const FOLLOW_ROOMS_KEY = "vs-followed-rooms";
const FOLLOW_PEOPLE_KEY = "vs-followed-people";

function getFollowedRooms() {
  try { return JSON.parse(localStorage.getItem(FOLLOW_ROOMS_KEY) || "[]"); } catch { return []; }
}
function setFollowedRoomsStore(arr) {
  try { localStorage.setItem(FOLLOW_ROOMS_KEY, JSON.stringify(arr)); } catch {}
}
function getFollowedPeople() {
  try { return JSON.parse(localStorage.getItem(FOLLOW_PEOPLE_KEY) || "[]"); } catch { return []; }
}
function setFollowedPeopleStore(arr) {
  try { localStorage.setItem(FOLLOW_PEOPLE_KEY, JSON.stringify(arr)); } catch {}
}

function roomTag(id) {
  const r = ROOMS.find(r => r.id === id);
  return `${r?.language || ""} • ${r?.name || ""}`;
}

function scoreThread(t, followedPeopleSet) {
  const base = (t.votes * 2) + (t.answers * 3) + (t.solved ? -5 : 5);
  const author = t.author?.name || "";
  const boost = followedPeopleSet.has(author) ? 12 : 0; 
  return base + boost;
}

/* ---------- Main ---------- */
export default function VillageSquare() {
  const [activeRoom, setActiveRoom] = useState(ROOMS[0].id);
  const [query, setQuery] = useState("");
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [detail, setDetail] = useState(null);
  const [typing, setTyping] = useState({ count: 0, names: [] });
  const [online, setOnline] = useState(412);
  const [xp, setXp] = useState(1200);
  const [streak, setStreak] = useState(parseInt(localStorage.getItem("lm-helpful-streak") || "0", 10));
  const [confettiAt, setConfettiAt] = useState(null);
  const [liveOpen, setLiveOpen] = useState(false);

  // Tabs: For You | Following
  const [tab, setTab] = useState("forYou");
  // Following sub-filter: Rooms | People
  const [followingSub, setFollowingSub] = useState("all"); 

  // Followed rooms & people
  const [followedRooms, setFollowedRooms] = useState([]);
  const [followedPeople, setFollowedPeople] = useState([]);

  useEffect(() => {
    setFollowedRooms(getFollowedRooms());
    setFollowedPeople(getFollowedPeople());
  }, []);

  function toggleFollowRoom(roomId) {
    setFollowedRooms((prev) => {
      const has = prev.includes(roomId);
      const next = has ? prev.filter(r => r !== roomId) : [roomId, ...prev];
      setFollowedRoomsStore(next);
      return next;
    });
  }

  function toggleFollowPerson(name) {
    setFollowedPeople((prev) => {
      const has = prev.includes(name);
      const next = has ? prev.filter(n => n !== name) : [name, ...prev].slice(0, 30);
      setFollowedPeopleStore(next);
      return next;
    });
  }

  // Presence mock
  useEffect(() => {
    const names = ["Chika","Tunde","Aisha","Ngozi","Femi","Hassan","Ada"];
    const it = setInterval(() => {
      const c = Math.floor(Math.random() * 3);
      const shuffled = names.sort(() => 0.5 - Math.random());
      setTyping({ count: c, names: shuffled.slice(0, c) });
      setOnline((o) => Math.max(100, o + (Math.random() > 0.5 ? 1 : -1)));
    }, 2500);
    return () => clearInterval(it);
  }, []);

  // Derived lists
  const roomThreads = useMemo(() => threads.filter(t => t.roomId === activeRoom), [threads, activeRoom]);

  const forYou = useMemo(() => {
    const q = query.toLowerCase();
    const followedSet = new Set(followedPeople);
    return [...threads]
      .filter(t => (t.title + t.body).toLowerCase().includes(q))
      .sort((a,b) => scoreThread(b, followedSet) - scoreThread(a, followedSet));
  }, [threads, query, followedPeople]);

  const followingFeed = useMemo(() => {
    const q = query.toLowerCase();
    const setRooms = new Set(followedRooms.length ? followedRooms : [activeRoom]);
    const peopleSet = new Set(followedPeople);
    const pool = threads.filter(t => (t.title + t.body).toLowerCase().includes(q));

    if (followingSub === "people") {
      // Only posts authored by people I follow (any room)
      return pool.filter(t => peopleSet.has(t.author?.name || ""));
    }
    // Default: rooms I follow (fallback to active room)
    return pool.filter(t => setRooms.has(t.roomId));
  }, [threads, query, followedRooms, followedPeople, activeRoom, followingSub]);

  const visibleThreads = tab === "forYou" ? forYou : followingFeed;

  // People-follow quick counts for UI badge
  const peopleSet = new Set(followedPeople);
  const followedPeoplePostsCount = useMemo(
    () => visibleThreads.filter(t => peopleSet.has(t.author?.name || "")).length,
    [visibleThreads, followedPeople]
  );

  /* Handlers */
  function handleNewThread(title, body) {
    const newT = {
      id: "t" + (threads.length + 1),
      roomId: activeRoom, title, body,
      author: { name: "You", avatar: "Y", account_age_days: 1000 },
      votes: 0, answers: 0, solved: false, createdAt: "now",
      reports: 0, replies: [], reactions: {}
    };
    setThreads([newT, ...threads]);
  }

  function handleVoteThread(id) {
    setThreads(ts => ts.map(t => t.id === id ? { ...t, votes: t.votes + 1 } : t));
  }

  function handleReportThread(id) {
    setThreads(ts => ts.map(t => t.id === id ? { ...t, reports: t.reports + 1 } : t));
  }

  function softHidden(t) {
    return t.author.account_age_days < 30 && t.reports >= 3;
  }

  function handleAddReply(threadId, text) {
    setThreads(ts => ts.map(t => {
      if (t.id !== threadId) return t;
      const r = { id: "r" + (t.replies.length + 1), author: "You", account_age_days: 1000, text, votes: 0, accepted: false };
      return { ...t, replies: [r, ...t.replies], answers: t.answers + 1 };
    }));
  }

  function bumpDailyHelpfulStreak() {
    const today = new Date().toDateString();
    const last = localStorage.getItem("lm-helpful-last");
    let s = parseInt(localStorage.getItem("lm-helpful-streak") || "0", 10);
    if (last !== today) {
      s += 1;
      localStorage.setItem("lm-helpful-last", today);
      localStorage.setItem("lm-helpful-streak", String(s));
    }
    return s;
  }

  function handleAcceptAnswer(threadId, replyId, clientX, clientY) {
    setThreads(ts => ts.map(t => {
      if (t.id !== threadId) return t;
      return { ...t, solved: true, replies: t.replies.map(r => ({ ...r, accepted: r.id === replyId || r.accepted })) };
    }));
    setXp(x => x + 25);
    const s = bumpDailyHelpfulStreak();
    setStreak(s);
    setConfettiAt({ x: clientX, y: clientY });
    setTimeout(() => setConfettiAt(null), 1400);
  }

  function handleReactions(threadId, next) {
    setThreads(ts => ts.map(t => t.id === threadId ? { ...t, reactions: next } : t));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-6">
      {/* Left: Rooms & controls */}
      <aside className="space-y-4">
        <RoomsNav
          rooms={ROOMS}
          activeRoom={activeRoom}
          setActiveRoom={setActiveRoom}
          followedRooms={followedRooms}
        />
        <RoomHeader
          room={ROOMS.find(r => r.id === activeRoom)}
          online={online}
          followed={followedRooms.includes(activeRoom)}
          onToggleFollow={() => toggleFollowRoom(activeRoom)}
        />
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <LiveRoomChip onJoin={() => setLiveOpen(true)} />
        </div>
        <DigestToggle />
      </aside>

      {/* Center: Tabs + Search + Saved + Composer + Feed */}
      <main className="space-y-4">
        {/* Tabs */}
        <div className="rounded-xl border border-gray-100 bg-white p-1 flex items-center w-full">
          <button
            onClick={()=>setTab("forYou")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm ${tab==="forYou" ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-700 hover:bg-gray-50"}`}
          >For You</button>
          <button
            onClick={()=>setTab("following")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm ${tab==="following" ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-700 hover:bg-gray-50"}`}
          >Following</button>
        </div>

        {/* Following sub-filter */}
        {tab === "following" && (
          <div className="flex items-center gap-2 -mt-1">
            <button
              onClick={()=>setFollowingSub("all")}
              className={`text-xs rounded-full px-2 py-1 border ${followingSub==="all" ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              Rooms
            </button>
            <button
              onClick={()=>setFollowingSub("people")}
              className={`text-xs rounded-full px-2 py-1 border ${followingSub==="people" ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              People
            </button>
          </div>
        )}

        {/* Search row + quick chip */}
        <div className="rounded-xl border border-gray-100 bg-white p-3 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-gray-500" />
            <input
              placeholder={`Search ${tab === "forYou" ? "top threads…" : (followingSub === "people" ? "people you follow…" : "followed rooms…")}`}
              className="w-full text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {tab === "following" && (
            <button
              onClick={() => setFollowingSub(followingSub === "people" ? "all" : "people")}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] ${followingSub==="people" ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              title="Toggle people-only filter"
            >
              {followingSub==="people" ? <UserMinus size={12}/> : <UserPlus size={12}/>}
              People you follow
              {followedPeoplePostsCount > 0 && (
                <span className="ml-1 rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {followedPeoplePostsCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Saved searches */}
        <SavedSearches query={query} setQuery={setQuery} />

        {/* Composer */}
        <ThreadComposer onCreate={handleNewThread} />

        {/* Feed */}
        <ThreadList
          items={visibleThreads}
          onOpen={setDetail}
          onVote={handleVoteThread}
          onReport={handleReportThread}
          onAddReply={handleAddReply}
          onAccept={handleAcceptAnswer}
          onReactions={handleReactions}
          softHidden={softHidden}
          followedPeople={followedPeople}
          onToggleFollowPerson={toggleFollowPerson}
        />
      </main>

      {/* Right rail */}
      <aside className="space-y-4">
        <FollowingPeople
          threads={threads}
          onChange={setFollowedPeople}
        />
        <HotThreads items={roomThreads.slice(0,3)} onOpen={setDetail} />
        <ExplainMicroLearning />
        <PresenceCard typing={typing} online={online} xp={xp} streak={streak} />
      </aside>

      {/* Modals & confetti */}
      <ThreadDetailModal
        thread={detail}
        onClose={() => setDetail(null)}
        onAccept={handleAcceptAnswer}
        onAddReply={handleAddReply}
        followedPeople={followedPeople}
        onToggleFollowPerson={toggleFollowPerson}
      />
      <ConfettiBurst at={confettiAt} />
      <LiveRoomModal open={liveOpen} onClose={() => setLiveOpen(false)} roomName={roomTag(activeRoom)} />
    </div>
  );
}

/* ----- Rooms list ----- */
function RoomsNav({ rooms, activeRoom, setActiveRoom, followedRooms }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3">
      <div className="mb-2 text-xs font-semibold text-gray-500">Rooms</div>
      <div className="space-y-1">
        {rooms.map((r) => {
          const isActive = activeRoom === r.id;
          const isFollowed = followedRooms.includes(r.id);
          return (
            <button
              key={r.id}
              onClick={() => setActiveRoom(r.id)}
              className={`w-full text-left rounded-lg px-3 py-2 text-sm flex items-center justify-between
                ${isActive ? "bg-green-50 text-green-700 border border-green-200" : "hover:bg-gray-50 text-gray-700"}`}
            >
              <span>{r.language} • {r.name}</span>
              <span className={`text-[10px] ${isFollowed ? "text-green-700" : "text-gray-400"}`}>
                {isFollowed ? "Following" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----- Presence / XP / Streak ----- */
function PresenceCard({ typing, online, xp, streak }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">Now online</h4>
        <div className="inline-flex items-center gap-1 text-[11px] text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" /> {online}
        </div>
      </div>
      <TypingDots typing={typing} />
      <div className="mt-3 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg border border-green-200 bg-green-50 p-2">
          <div className="text-[11px] text-green-700">XP</div>
          <div className="text-sm font-semibold text-green-800">{xp}</div>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">
          <div className="text-[11px] text-amber-700">Helpful streak</div>
          <div className="text-sm font-semibold text-amber-800">{streak} day{streak===1?"":"s"}</div>
        </div>
      </div>
    </div>
  );
}
function TypingDots({ typing }) {
  if (!typing.count) return <div className="mt-2 text-[11px] text-gray-500">No one is typing right now</div>;
  return (
    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-50 px-2 py-1 border border-gray-200">
      <span className="text-[11px] text-gray-600">
        {typing.names.join(", ")} typing
      </span>
      <span className="inline-flex gap-1">
        {[0,1,2].map(i => (
          <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-400"
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2 }}
          />
        ))}
      </span>
    </div>
  );
}

/* ----- Composer ----- */
function ThreadComposer({ onCreate }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <motion.form
      onSubmit={(e)=>{e.preventDefault(); if(!title.trim()||!body.trim()) return; onCreate(title.trim(), body.trim()); setTitle(""); setBody("");}}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-gray-100 bg-white p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">Y</div>
          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Start a thread… (e.g., How to greet elders politely?)"
            className="flex-1 text-sm outline-none"
          />
        </div>
        <CivilityMeter text={`${title} ${body}`} />
      </div>
      <textarea
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        placeholder="Give context, examples, or a short audio description you need help with."
        className="w-full text-sm rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-green-500"
        rows={3}
      />
      <div className="flex items-center justify-between">
        <div className="text-[11px] text-gray-500">Be kind. Real people are learning here.</div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700">
          <Plus size={14}/> Post thread
        </button>
      </div>
    </motion.form>
  );
}

/* ----- Feed list ----- */
function ThreadList({
  items, onOpen, onVote, onReport, onAddReply, onAccept, onReactions, softHidden,
  followedPeople, onToggleFollowPerson
}) {
  if (!items.length) {
    return <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">No threads yet. Try switching tabs or rooms.</div>;
  }
  return (
    <div className="space-y-3">
      {items.map((t, i) => {
        const hidden = softHidden(t);
        const isFollowingAuthor = followedPeople.includes(t.author?.name || "");
        return (
          <motion.div key={t.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-gray-100 bg-white p-4">
            {hidden ? (
              <div className="flex items-start gap-2">
                <ShieldAlert className="text-amber-600" size={18} />
                <div className="text-xs text-gray-600">This thread is temporarily hidden pending review (new account, multiple reports).</div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-xs text-green-700 font-medium">{roomTag(t.roomId)}</div>
                    <h4 className="mt-0.5 text-sm font-semibold text-gray-900">{t.title}</h4>

                    {/* Author row + Follow */}
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-600">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-[10px] font-bold text-white">
                        {(t.author?.name || "A").slice(0,1).toUpperCase()}
                      </span>
                      <span>{t.author?.name || "Anon"}</span>
                      <button
                        onClick={() => onToggleFollowPerson(t.author?.name || "Anon")}
                        className={`ml-1 rounded-full border px-2 py-0.5 ${isFollowingAuthor ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                      >
                        {isFollowingAuthor ? "Following" : "Follow"}
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-gray-700">{renderExplainBody(t.body)}</p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="inline-flex items-center gap-1"><MessageSquare size={12}/> {t.answers} answers</span>
                      {t.solved && <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 size={12}/> Solved</span>}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <button onClick={() => onVote(t.id)} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700 border border-green-200">
                      <ArrowUp size={12}/> {t.votes}
                    </button>
                    <div className="mt-2 flex items-center gap-1">
                      <button onClick={() => onOpen(t)} className="rounded-full border border-gray-200 px-2 py-1 text-[11px] text-gray-700 hover:bg-gray-50">Open</button>
                      <button onClick={() => onReport(t.id)} className="rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] text-rose-700 hover:bg-rose-100"><Flag size={12}/> Report</button>
                    </div>
                  </div>
                </div>

                {/* reactions */}
                <ReactionsBar initial={t.reactions} onChange={(n)=>onReactions(t.id, n)} />

                {/* audio + text reply */}
                <div className="mt-3 space-y-2">
                  <AudioReply onSubmit={() => onAddReply(t.id, "(posted an audio reply)")} />
                  <InlineReply threadId={t.id} onAddReply={onAddReply} />
                </div>

                {/* replies preview */}
                <div className="mt-3 space-y-2">
                  {t.replies.slice(0,2).map(r => (
                    <ReplyRow
                      key={r.id}
                      threadId={t.id}
                      reply={r}
                      solved={t.solved}
                      onAccept={onAccept}
                      followedPeople={followedPeople}
                      onToggleFollowPerson={onToggleFollowPerson}
                    />
                  ))}
                  {t.replies.length > 2 && (
                    <button onClick={() => onOpen(t)} className="text-[11px] text-green-700 hover:underline">View all {t.replies.length} replies</button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function InlineReply({ threadId, onAddReply }) {
  const [text, setText] = useState("");
  return (
    <form onSubmit={(e)=>{e.preventDefault(); if(!text.trim()) return; onAddReply(threadId, text.trim()); setText("");}} className="flex items-center gap-2">
      <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a quick reply…" className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"/>
      <button className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"><Send size={14}/> Reply</button>
    </form>
  );
}

function ReplyRow({ threadId, reply, solved, onAccept, followedPeople, onToggleFollowPerson }) {
  const isFollowing = followedPeople.includes(reply.author);
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">{reply.author}</div>
          <button
            onClick={() => onToggleFollowPerson(reply.author)}
            className={`rounded-full border px-2 py-0.5 text-[10px] ${isFollowing ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
        {reply.accepted && <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700"><CheckCircle2 size={12}/> Accepted</div>}
      </div>
      <div className="text-sm text-gray-800 mt-1">{reply.text}</div>
      {!solved && !reply.accepted && (
        <div className="mt-2">
          <button onClick={(e)=> onAccept(threadId, reply.id, e.clientX, e.clientY)} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-200">
            <CheckCircle2 size={14}/> Mark as Answer
          </button>
        </div>
      )}
    </div>
  );
}

/* ----- Detail modal ----- */
function ThreadDetailModal({ thread, onClose, onAccept, onAddReply, followedPeople, onToggleFollowPerson }) {
  const [text, setText] = useState("");
  if (!thread) return null;
  const hidden = thread.author.account_age_days < 30 && thread.reports >= 3;
  const authorFollowing = followedPeople.includes(thread.author?.name || "");
  return (
    <AnimatePresence>
      {thread && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div initial={{scale:0.97, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.97, opacity:0}} className="relative w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-xl">
            <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"><X size={18}/></button>
            {hidden ? (
              <div className="flex items-start gap-2"><ShieldAlert className="text-amber-600" size={18} /><div className="text-sm text-gray-700">This thread is temporarily hidden pending review.</div></div>
            ) : (
              <>
                <div className="text-xs text-green-700 font-medium">{roomTag(thread.roomId)}</div>
                <h3 className="text-lg font-semibold text-gray-900">{thread.title}</h3>

                {/* Author + Follow in modal */}
                <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-600">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-[10px] font-bold text-white">
                    {(thread.author?.name || "A").slice(0,1).toUpperCase()}
                  </span>
                  <span>{thread.author?.name || "Anon"}</span>
                  <button
                    onClick={() => onToggleFollowPerson(thread.author?.name || "Anon")}
                    className={`rounded-full border px-2 py-0.5 ${authorFollowing ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {authorFollowing ? "Following" : "Follow"}
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-700">{thread.body}</p>

                <div className="mt-4 space-y-3">
                  {thread.replies.map(r => {
                    const isFollowing = followedPeople.includes(r.author);
                    return (
                      <div key={r.id} className="rounded-xl border border-gray-100 bg-white p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-gray-500">{r.author}</div>
                            <button
                              onClick={() => onToggleFollowPerson(r.author)}
                              className={`rounded-full border px-2 py-0.5 text-[10px] ${isFollowing ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                            >
                              {isFollowing ? "Following" : "Follow"}
                            </button>
                          </div>
                          {r.accepted ? (
                            <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700"><CheckCircle2 size={12}/> Accepted</div>
                          ) : !thread.solved ? (
                            <button onClick={(e)=> onAccept(thread.id, r.id, e.clientX, e.clientY)} className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-200">
                              <CheckCircle2 size={14}/> Mark as Answer
                            </button>
                          ) : null}
                        </div>
                        <div className="text-sm text-gray-800 mt-1">{r.text}</div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={(e)=>{e.preventDefault(); if(!text.trim()) return; onAddReply(thread.id, text.trim()); setText("");}} className="mt-4 flex items-center gap-2">
                  <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a reply…" className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"/>
                  <button className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"><Send size={14}/> Reply</button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----- emoji ----- */
function ConfettiBurst({ at }) {
  if (!at) return null;
  const emojis = ["🎉","✨","🪩","🎊","🌟","💫"];
  const base = { left: at.x, top: at.y };
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {emojis.map((e, i) => (
        <motion.span key={i} className="absolute" style={{ left: base.left, top: base.top }}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0, 1, 0], y: [-10 - i * 12, -60 - i * 18], x: [0, (i - 2) * 30], scale: [0.6, 1, 0.8] }}
          transition={{ duration: 1.2, ease: "easeOut" }}>
          {e}
        </motion.span>
      ))}
    </div>
  );
}

/* ----- Micro-learning panel ----- */
function ExplainMicroLearning() {
  const tips = [
    { term: "Ụtụtụ ọma", expl: "Standard ‘Good morning’ in Igbo." },
    { term: "Tone marks", expl: "Yorùbá accents mark pitch: high, mid, low." },
    { term: "Sannunku", expl: "Hausa plural/politeness greeting." },
  ];
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center gap-2"><HelpCircle size={16} className="text-green-600"/><h4 className="text-sm font-semibold text-gray-900">Explain (hover)</h4></div>
      <div className="mt-2 flex flex-wrap gap-2">
        {tips.map((t, i) => (
          <div key={i} className="group relative">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">{t.term}</span>
            <span className="pointer-events-none absolute left-0 top-7 z-20 hidden w-56 rounded-lg border border-gray-200 bg-white p-2 text-[11px] text-gray-700 shadow-lg group-hover:block">{t.expl}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-gray-500">Hover a chip to see a quick gloss. (Later: AI voice & examples.)</p>
    </div>
  );
}

/* ----- Hot threads ----- */
function HotThreads({ items, onOpen }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-green-600"/>
        <h4 className="text-sm font-semibold text-gray-900">Hot right now</h4>
      </div>
      <div className="mt-2 space-y-2">
        {items.map(t => (
          <button key={t.id} onClick={() => onOpen(t)} className="block w-full text-left rounded-lg px-2 py-2 hover:bg-gray-50">
            <div className="text-[11px] text-green-700">{roomTag(t.roomId)}</div>
            <div className="text-xs font-medium text-gray-800 line-clamp-1">{t.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----- Explain body rendering ----- */
function renderExplainBody(text) {
  const glossary = {
    "Ụtụtụ": "‘Morning’ in Igbo.",
    "Ị": "Second person singular pronoun in Igbo.",
    "tone": "In tonal languages, pitch patterns distinguish meaning.",
  };
  const tokens = text.split(/(\s+)/);
  return tokens.map((tk, i) => {
    const cleaned = tk.replace(/[^\w’ọụịáéíóúÀ-ÿ-]/g,"");
    const key = Object.keys(glossary).find(g => cleaned === g);
    if (!key) return <span key={i}>{tk}</span>;
    return <ExplainChip key={i} label={tk} explanation={glossary[key]} />;
  });
}
function ExplainChip({ label, explanation }) {
  return (
    <span className="group relative inline-flex items-center">
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-medium text-emerald-800">
        <HelpCircle size={12} /> {label}
      </span>
      <span className="pointer-events-none absolute left-0 top-7 z-20 hidden w-56 rounded-lg border border-gray-200 bg-white p-2 text-[11px] text-gray-700 shadow-lg group-hover:block">
        {explanation}
      </span>
    </span>
  );
}
