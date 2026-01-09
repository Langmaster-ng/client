"use client";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users } from "lucide-react";

const EVENTS = [
  {
    id: "ev1",
    title: "Igbo Proverbs Night",
    date: "2025-10-20",
    time: "18:00",
    location: "Virtual (Zoom)",
    capacity: 120,
    rsvp: 86,
    tag: "Igbo",
    banner:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ev2",
    title: "Yoruba Tones Workshop",
    date: "2025-11-03",
    time: "17:00",
    location: "Civic Centre, Lagos",
    capacity: 60,
    rsvp: 42,
    tag: "Yoruba",
    banner:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function UpcomingEventsWidget() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Upcoming Events</h3>
        <a href="/dashboard/events-and-heritage" className="text-xs font-medium text-green-700 hover:underline">
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {EVENTS.map((e, idx) => {
          const filled = Math.round((e.rsvp / e.capacity) * 100);
          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white"
            >
              <div className="relative h-24 w-full">
                <img src={e.banner} alt={e.title} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-green-700 border border-green-200">
                  {e.tag}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-900">{e.title}</h4>
                <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} /> {e.date} • {e.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} /> {e.location}
                  </div>
                </div>

             
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${filled}%` }} />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500 flex items-center gap-1">
                    <Users size={12} /> {e.rsvp}/{e.capacity} RSVP • {filled}%
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
