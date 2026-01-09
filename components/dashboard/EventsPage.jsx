"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  X,
  Filter,
  CheckCircle2,
  Landmark,
  Info,
  Quote,
} from "lucide-react";

// Lazy load leaflet components (client-side only)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

/* Cultural Moments Data */
const CULTURAL_MOMENTS = [
  {
    date: "1970-01-09",
    language: "Igbo",
    title: "Ojukwu’s Handover: The End of the Biafran War",
    description:
      "On January 9, 1970, Lt. Col. Odumegwu Ojukwu handed over power to Major General Effiong, marking the end of the Biafran War.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ojukwu_1967.jpg",
    location: [6.5244, 3.3792], 
  },
  {
    date: "1967-01-05",
    language: "Igbo",
    title: "The Aburi Accord",
    description:
      "The Aburi Conference in Ghana emphasized regional autonomy and dialogue to avoid war.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Aburi_Conference.jpg",
    location: [5.9348, -0.1841], 
  },
  {
    date: "1804-02-21",
    language: "Hausa",
    title: "The Sokoto Jihad Begins",
    description:
      "Usman dan Fodio declared a jihad that founded the Sokoto Caliphate, reshaping Northern Nigeria’s history.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Usman_dan_Fodio.jpg",
    location: [13.0667, 5.2333], 
  },
];


const ALL_EVENTS = [
  {
    id: "ev1",
    title: "Igbo Proverbs Night",
    date: "2025-10-20",
    time: "18:00",
    location: "Virtual (Zoom)",
    type: "Virtual",
    capacity: 120,
    rsvp: 86,
    description:
      "An evening of classic Igbo proverbs with live translations and cultural context.",
    tags: ["Igbo", "Culture", "Beginner+"],
    banner:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ev2",
    title: "Yoruba Tones Workshop",
    date: "2025-11-03",
    time: "17:00",
    location: "Civic Centre, Lagos",
    type: "In-person",
    capacity: 60,
    rsvp: 42,
    description:
      "Hands-on session to master tone marks and pronunciation with native speakers.",
    tags: ["Yoruba", "Pronunciation", "All Levels"],
    banner:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ev3",
    title: "Hausa Conversation Hour",
    date: "2025-11-10",
    time: "16:00",
    location: "Virtual (Google Meet)",
    type: "Virtual",
    capacity: 100,
    rsvp: 77,
    description:
      "Casual Hausa conversation circles led by facilitators—bring your questions!",
    tags: ["Hausa", "Speaking", "Beginner"],
    banner:
      "https://images.unsplash.com/photo-1514517182625-8f7c84e8d8fd?q=80&w=1200&auto=format&fit=crop",
  },
];


const CULTURAL_QUOTES = {
  Igbo: [
    {
      quote: "Ebe onye dara, ka chi ya kwaturu ya.",
      translation: "Where one falls is where destiny directs — every fall has meaning.",
    },
    {
      quote: "A na-amụ nwa ka a mụ nwa.",
      translation: "It takes a child to raise another — we grow through community.",
    },
  ],
  Yoruba: [
    {
      quote: "Bi omode ba subu, a wo iwaju; bi agbalagba ba subu, a wo eyin.",
      translation: "When a child falls, they look ahead; when an elder falls, they look back.",
    },
  ],
  Hausa: [
    {
      quote: "Komai nisan jifa, ƙasa zai dawo.",
      translation: "No matter how far a throw goes, it returns to the ground.",
    },
  ],
};


function DailyPopup() {
  const [show, setShow] = useState(false);
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem("lm-dyk-shown");
    if (lastShown !== today) {
      const random = CULTURAL_MOMENTS[Math.floor(Math.random() * CULTURAL_MOMENTS.length)];
      setFact(random);
      setShow(true);
      localStorage.setItem("lm-dyk-shown", today);
    }
  }, []);

  if (!show || !fact) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 right-6 z-[9999] max-w-sm rounded-2xl bg-white shadow-2xl border border-green-100 p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Info className="text-green-600" size={18} />
            <h3 className="font-semibold text-gray-900 text-sm">Did You Know? 🕊️</h3>
          </div>
          <button onClick={() => setShow(false)} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
        <img src={fact.image} alt={fact.title} className="mt-3 h-28 w-full rounded-lg object-cover" />
        <h4 className="mt-3 text-sm font-semibold text-gray-800">{fact.title}</h4>
        <p className="text-xs text-gray-600 mt-1">{fact.description}</p>
      </motion.div>
    </AnimatePresence>
  );
}


function QuoteOfTheDay({ language }) {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    const today = new Date().getDate();
    const langQuotes = CULTURAL_QUOTES[language] || CULTURAL_QUOTES.Igbo;
    setQuote(langQuotes[today % langQuotes.length]);
  }, [language]);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-green-100 bg-gradient-to-br from-white to-green-50 shadow-sm p-6 mb-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <Quote className="text-green-600" size={18} />
        <h3 className="font-semibold text-gray-800">Cultural Quote of the Day</h3>
      </div>
      <p className="text-green-800 italic text-base mb-2">“{quote.quote}”</p>
      <p className="text-sm text-gray-600">— {quote.translation}</p>
    </motion.div>
  );
}


function HeritageTimeline({ onSelectMoment }) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Landmark className="text-green-600" size={18} /> Our Heritage Timeline
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-6 py-2">
          {CULTURAL_MOMENTS.map((m) => (
            <motion.div
              key={m.title}
              whileHover={{ scale: 1.05 }}
              className="min-w-[180px] bg-white border border-gray-100 shadow-sm rounded-xl p-4 cursor-pointer hover:border-green-300"
              onClick={() => onSelectMoment(m)}
            >
              <p className="text-xs text-gray-500">
                {new Date(m.date).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{m.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


function EventCard({ ev, onSelect }) {
  const filled = Math.round((ev.rsvp / ev.capacity) * 100);
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="relative h-32 w-full">
        <img src={ev.banner} alt={ev.title} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-700 border border-green-200">
          {ev.type}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-base font-semibold text-gray-900">{ev.title}</h3>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1.5"><CalendarDays size={14} /> {ev.date}</div>
          <div className="flex items-center gap-1.5"><Clock size={14} /> {ev.time}</div>
          <div className="col-span-2 flex items-center gap-1.5"><MapPin size={14} /> {ev.location}</div>
        </div>

        {/* RSVP Progress */}
        <div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-green-500" style={{ width: `${filled}%` }} />
          </div>
          <p className="mt-1 text-xs text-gray-500 flex justify-between">
            <span className="flex items-center gap-1"><Users size={14} /> {ev.rsvp}/{ev.capacity} RSVP</span>
            <span>{filled}%</span>
          </p>
        </div>


        <div className="flex flex-wrap gap-2">
          {ev.tags.map((t) => (
            <span key={t} className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
              {t}
            </span>
          ))}
        </div>

        <button onClick={() => onSelect(ev)} className="mt-2 w-full rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">
          View & RSVP
        </button>
      </div>
    </motion.div>
  );
}


function CulturalMomentsPanel({ language, onSelectMoment }) {
  const filtered = CULTURAL_MOMENTS.filter((m) => m.language.toLowerCase() === language.toLowerCase());
  return (
    <aside className="hidden lg:block w-80 sticky top-24 space-y-5">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Landmark className="text-green-600" /> Cultural Moments
      </h3>
      {filtered.map((m) => (
        <motion.div
          key={m.title}
          whileHover={{ scale: 1.02 }}
          className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden cursor-pointer"
          onClick={() => onSelectMoment(m)}
        >
          <img src={m.image} alt={m.title} className="h-32 w-full object-cover" />
          <div className="p-4">
            <p className="text-xs text-gray-500">{new Date(m.date).toLocaleDateString()}</p>
            <h4 className="text-sm font-semibold text-gray-800 mt-1">{m.title}</h4>
          </div>
        </motion.div>
      ))}
    </aside>
  );
}


function MomentModal({ moment, onClose }) {
  return (
    <AnimatePresence>
      {moment && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.25 }} className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            <button onClick={onClose} className="absolute right-3 top-3 rounded-md p-1 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
            <img src={moment.image} alt={moment.title} className="h-40 w-full object-cover" />
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">{moment.title}</h3>
              <p className="text-sm text-gray-600">{moment.description}</p>

              <div className="h-52 w-full overflow-hidden rounded-xl mt-3">
                <MapContainer center={moment.location} zoom={6} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                  <Marker position={moment.location}>
                    <Popup>{moment.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export default function EventsAndHeritage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [lang, setLang] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMoment, setSelectedMoment] = useState(null);

  const filtered = useMemo(() => {
    return ALL_EVENTS.filter((e) => {
      const q = query.toLowerCase();
      const matchQ = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      const matchType = type === "All" || e.type === type;
      const matchLang = lang === "All" || e.tags.some((t) => t.toLowerCase().includes(lang.toLowerCase()));
      return matchQ && matchType && matchLang;
    });
  }, [query, type, lang]);

  const activeLang = lang === "All" ? "Igbo" : lang;

  return (
    <section className="md:ml-64 min-h-screen bg-gray-50 px-4 pb-24 pt-6 md:px-10 md:pt-10">
      {/* Daily popup */}
      <DailyPopup />

      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Events & Heritage</h1>
        <p className="mt-1 text-gray-500">Join cultural experiences and rediscover our shared history.</p>
      </div>


      <QuoteOfTheDay language={activeLang} />

    
      <HeritageTimeline onSelectMoment={setSelectedMoment} />

     
      <div className="mt-8 lg:flex lg:gap-6">
      
        <div className="flex-1">
        
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Filter size={16} className="text-green-600" />
                Quick Filters
              </div>
              <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <input
                  placeholder="Search events..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>All</option>
                  <option>Virtual</option>
                  <option>In-person</option>
                </select>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>All</option>
                  <option>Igbo</option>
                  <option>Yoruba</option>
                  <option>Hausa</option>
                </select>
              </div>
            </div>
          </div>

        
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((ev) => (
              <EventCard key={ev.id} ev={ev} onSelect={setSelectedEvent} />
            ))}
          </div>
        </div>

    
        <CulturalMomentsPanel language={activeLang} onSelectMoment={setSelectedMoment} />
      </div>

     
      <MomentModal moment={selectedMoment} onClose={() => setSelectedMoment(null)} />

     
      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.25 }} className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
              <button onClick={() => setSelectedEvent(null)} className="absolute right-3 top-3 rounded-md p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
              <img src={selectedEvent.banner} alt={selectedEvent.title} className="h-36 w-full object-cover" />
              <div className="space-y-4 p-5">
                <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><CalendarDays size={16} /> {selectedEvent.date}</div>
                  <div className="flex items-center gap-2"><Clock size={16} /> {selectedEvent.time}</div>
                  <div className="col-span-2 flex items-center gap-2"><MapPin size={16} /> {selectedEvent.location}</div>
                </div>
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">
                    <CheckCircle2 size={16} /> RSVP Now
                  </button>
                  <div className="text-xs text-gray-500">
                    Seats: {selectedEvent.rsvp}/{selectedEvent.capacity}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
