"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Download, Search, Mail, Filter, Beaker } from "lucide-react";
import EmailComposerModal from "@/components/admin/EmailComposerModal";

/** MOCK fallback */
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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "1";

/** Parse many common backend shapes */
function parseListAndTotal(json) {
  const root = json?.data ?? json?.payload ?? json?.result ?? json;
  const list =
    (Array.isArray(root?.items) && root.items) ||
    (Array.isArray(root?.rows) && root.rows) ||
    (Array.isArray(root?.results) && root.results) ||
    (Array.isArray(root?.list) && root.list) ||
    (Array.isArray(root) && root) ||
    [];
  const total =
    (typeof root?.total === "number" && root.total) ||
    (typeof root?.totalCount === "number" && root.totalCount) ||
    (typeof root?.count === "number" && root.count) ||
    (typeof json?.total === "number" && json.total) ||
    (typeof json?.totalCount === "number" && json.totalCount) ||
    null;
  return { list, total };
}

/** Try proxy first in production, then direct API_BASE in dev */
async function fetchWaitlistPage({ page, size, isProd }) {
  const candidates = [];

  // 1) In production, prefer our Next.js proxy to avoid CORS entirely
  if (isProd) {
    candidates.push({ url: `/api/waitlist?size=${size}&page=${page}`, method: "GET" });
  }

  // 2) In dev (or as fallback), hit the backend directly if API_BASE is provided
  if (API_BASE) {
    const base = API_BASE.replace(/\/$/, "");
    candidates.push(
      { url: `${base}/v1/api/waitlist?size=${size}&page=${page}`, method: "GET" },
      { url: `${base}/v1/api/waitlist/?size=${size}&page=${page}`, method: "GET" }, // trailing slash variant
      { url: `${base}/api/v1/waitlist?size=${size}&page=${page}`, method: "GET" }
    );
  }

  let lastError = null;

  for (const c of candidates) {
    try {
      const res = await fetch(c.url, { cache: "no-store" });
      const json = await res.json().catch(() => ({}));
      if (DEBUG) console.debug("[WAITLIST][TRY]", c.method, c.url, res.status, json?.status);

      if (res.ok && (json?.status === "success" || Array.isArray(json) || json?.data || json?.items || json?.rows)) {
        const { list, total } = parseListAndTotal(json);
        if (DEBUG) console.debug("[WAITLIST][OK]", { url: c.url, count: list.length, total });
        return { list, total, used: c.url };
      }

      lastError = new Error(json?.message || `HTTP ${res.status}`);
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError || new Error("No compatible waitlist endpoint found.");
}

export default function WaitlistAdminPage() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState("All");

  // Modal
  const [modal, setModal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data + states
  const [rows, setRows] = useState([]);
  const [totalFromApi, setTotalFromApi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr("");
      setUsingMock(false);
      try {
        const isProd = typeof window !== "undefined" && window.location.hostname !== "localhost";
        const { list, total } = await fetchWaitlistPage({ page, size: pageSize, isProd });
        if (!cancelled) {
          setRows(list);
          setTotalFromApi(total ?? list.length ?? 0);
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e.message || "Failed to load waitlist.");
          // graceful mock fallback to keep UI usable
          const start = (page - 1) * pageSize;
          setRows(MOCK.slice(start, start + pageSize));
          setTotalFromApi(MOCK.length);
          setUsingMock(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize]);

  // client-side filter on the currently loaded page
  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesQ =
        !q ||
        r.email?.toLowerCase().includes(q.toLowerCase()) ||
        (r.first_name || "").toLowerCase().includes(q.toLowerCase());
      const matchesSource = source === "All" || r.source === source;
      return matchesQ && matchesSource;
    });
  }, [rows, q, source]);

  const totalAll = totalFromApi ?? rows.length;
  const totalInView = filtered.length;
  const totalToday = 0; // update when backend provides metric
  const total7d = 0;

  const pages = Math.max(1, Math.ceil((totalFromApi || totalInView || 1) / pageSize));

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

  function useDemoData() {
    const start = (page - 1) * pageSize;
    setRows(MOCK.slice(start, start + pageSize));
    setTotalFromApi(MOCK.length);
    setUsingMock(true);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {(usingMock || err) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            usingMock ? "border-amber-200 bg-amber-50 text-amber-800" : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {usingMock ? "API unreachable — showing mock data." : err}
          <button
            onClick={useDemoData}
            className="ml-3 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs hover:bg-gray-50"
          >
            <Beaker size={14} /> Use demo data
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Waitlist</h1>
          <p className="text-sm text-gray-500">Track signups, export, and reach out to early adopters.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-3 py-2 text-sm font-semibold text-white hover:brightness-95"
          >
            <Mail size={16} /> Compose Email
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={() => setPage((p) => p)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Waitlist" value={Number(totalAll).toLocaleString()} />
        <StatCard label="In View (after filters)" value={Number(totalInView).toLocaleString()} />
        <StatCard label="Added Today" value={Number(totalToday).toLocaleString()} />
        <StatCard label="Last 7 days" value={Number(total7d).toLocaleString()} />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by email or first name…"
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
              <Filter size={16} className="text-gray-500" />
              <select className="outline-none" value={source} onChange={(e) => setSource(e.target.value)}>
                <option>All</option>
                <option>Landing</option>
                <option>Referral</option>
                <option>Social</option>
                <option>Direct</option>
              </select>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
              <span className="text-gray-500">Rows</span>
              <select
                className="outline-none"
                value={pageSize}
                onChange={(e) => {
                  setPage(1);
                  setPageSize(Number(e.target.value));
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((r, i) => (
                  <tr key={`${r.email}-${i}`} className="border-t border-gray-50 hover:bg-gray-50/60">
                    <td className="px-4 py-3">{r.email}</td>
                    <td className="px-4 py-3">{r.first_name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px]">
                        {r.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">{r.created_at}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] text-green-700">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-sm text-gray-500" colSpan={5}>
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-gray-500">
            Page {page} of {pages}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              Prev
            </button>
            <button
              className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages || loading}
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
          console.log("SEND EMAIL PAYLOAD:", payload);
        }}
      />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-gray-900">{value}</div>
    </motion.div>
  );
}
