"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Download, Search, Mail, Filter } from "lucide-react";
import EmailComposerModal from "@/components/admin/EmailComposerModal";

/** Mock data  */
const MOCK = Array.from({ length: 48 }).map((_, i) => {
  const day = (i % 12) + 1;
  return {
    email: `user${i + 1}@example.com`,
    first_name: ["Ada", "Uche", "Kehinde", "Umar", "Sade", "Ozioma"][i % 6],
    source: i % 4 === 0 ? "Landing" : i % 4 === 1 ? "Referral" : i % 4 === 2 ? "Social" : "Direct",
    created_at: `2025-10-${String(day).padStart(2, "0")} 10:${String(i % 60).padStart(2, "0")}`,
    status: "subscribed",
  };
});

export default function WaitlistAdminPage() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState("All");
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    return MOCK.filter((r) => {
      const matchesQ =
        !q ||
        r.email.toLowerCase().includes(q.toLowerCase()) ||
        (r.first_name || "").toLowerCase().includes(q.toLowerCase());
      const matchesSource = source === "All" || r.source === source;
      return matchesQ && matchesSource;
    });
  }, [q, source]);

  const total = filtered.length;
  const totalAll = MOCK.length;
  const totalToday = MOCK.slice(0, 100).filter((r) => r.created_at.startsWith("2025-10-18")).length; 
  const total7d = 37; 

  const pages = Math.max(1, Math.ceil(total / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function exportCSV() {
    const header = ["email", "first_name", "source", "created_at", "status"];
    const lines = [header.join(",")].concat(
      filtered.map((r) => header.map((h) => `"${String(r[h] ?? "").replaceAll('"', '""')}"`).join(","))
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Waitlist</h1>
          <p className="text-sm text-gray-500">Track signups, export, and reach out to early adopters.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setModal(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-3 py-2 text-sm font-semibold text-white hover:brightness-95">
            <Mail size={16} /> Compose Email
          </button>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Waitlist" value={totalAll.toLocaleString()} />
        <StatCard label="In View (after filters)" value={total.toLocaleString()} />
        <StatCard label="Added Today" value={totalToday.toLocaleString()} />
        <StatCard label="Last 7 days" value={total7d.toLocaleString()} />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              value={q}
              onChange={(e) => { setPage(1); setQ(e.target.value); }}
              placeholder="Search by email or first name…"
              className="w-full text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
              <Filter size={16} className="text-gray-500" />
              <select
                className="outline-none"
                value={source}
                onChange={(e) => { setPage(1); setSource(e.target.value); }}
              >
                <option>All</option>
                <option>Landing</option>
                <option>Referral</option>
                <option>Social</option>
                <option>Direct</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead className="text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">First name</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/60">
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.first_name}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px]">{r.source}</span>
                  </td>
                  <td className="px-4 py-3">{r.created_at}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] text-green-700">{r.status}</span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="px-4 py-6 text-sm text-gray-500" colSpan={5}>No results.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-gray-500">Page {page} of {pages}</div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Compose modal */}
      <EmailComposerModal
        open={modal}
        onClose={() => setModal(false)}
        onSend={(payload) => {
          // For now, just log — later call your /send endpoint
          console.log("SEND EMAIL PAYLOAD:", payload);
        }}
      />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-100 bg-white p-4"
    >
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-gray-900">{value}</div>
    </motion.div>
  );
}
