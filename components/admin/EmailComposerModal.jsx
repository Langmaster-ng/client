"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Send } from "lucide-react";
import LMMark from "./LMMark";

export default function EmailComposerModal({ open, onClose, onSend }) {
  const [subject, setSubject] = useState("Welcome to LangMaster — your journey starts soon");
  const [fromName, setFromName] = useState("LangMaster Team");
  const [fromEmail, setFromEmail] = useState("hello@langmaster.ng");
  const [template, setTemplate] = useState("waitlist_welcome");
  const [body, setBody] = useState(
`Hi {{first_name}},

Thanks for joining LangMaster — Nigeria’s homegrown AI platform for learning indigenous languages.

We’ll notify you before launch. Meanwhile, invite 3 friends to move up the list:
{{referral_url}}

Manage preferences: {{manage_url}}
Unsubscribe: {{unsubscribe_url}}

— The LangMaster Team`
  );
  const [preview, setPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function renderPreview() {
    const fake = {
      first_name: "Ada",
      referral_url: "https://langmaster.ng/r/ADA123",
      manage_url: "https://langmaster.ng/prefs",
      unsubscribe_url: "https://langmaster.ng/unsub",
    };
    return body
      .replaceAll("{{first_name}}", fake.first_name)
      .replaceAll("{{referral_url}}", fake.referral_url)
      .replaceAll("{{manage_url}}", fake.manage_url)
      .replaceAll("{{unsubscribe_url}}", fake.unsubscribe_url);
  }

  async function handleSend() {
    setError("");
    if (!subject.trim()) return setError("Subject is required.");
    if (!fromEmail.includes("@")) return setError("From email looks invalid.");
    setSending(true);
    try {
      // Mock send till api is ready
      await new Promise((r) => setTimeout(r, 700));
      onSend?.({ subject, fromName, fromEmail, template, body });
      onClose?.();
    } catch (e) {
      setError(e?.message || "Failed to send.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm p-4 flex items-center justify-center"
      >
        <motion.div
          initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
          className="relative w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl"
        >
          <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>

          <div className="mb-3 flex items-center gap-2">
            <img src="/images/lm.png" alt="LangMaster" className="h-9 w-9 rounded-xl" />

            <div>
              <h3 className="text-base font-semibold text-gray-900">Compose Email</h3>
              <p className="text-xs text-gray-500">Send to: Waitlist (mocked selection)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Subject</label>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22C55E]"
                  value={subject} onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">From name</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22C55E]"
                    value={fromName} onChange={(e) => setFromName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">From email</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22C55E]"
                    value={fromEmail} onChange={(e) => setFromEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Template</label>
                <select
                  value={template} onChange={(e) => setTemplate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22C55E]"
                >
                  <option value="waitlist_welcome">Waitlist • Welcome</option>
                  <option value="launch_announcement">Launch Announcement</option>
                  <option value="community_invite">Community Invite</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500">
                Body (supports tokens: {"{{first_name}}"}, {"{{referral_url}}"}, {"{{manage_url}}"}, {"{{unsubscribe_url}}"})
              </label>
              <textarea
                rows={10}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22C55E]"
                value={body} onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mt-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setPreview((v) => !v)}
            >
              <Eye size={16} /> {preview ? "Hide Preview" : "Preview"}
            </button>
            <button
              onClick={handleSend}
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-70"
            >
              <Send size={16} /> {sending ? "Sending…" : "Send"}
            </button>
          </div>

          {preview && (
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className="mb-1 text-xs text-gray-500">Preview</div>
              <pre className="whitespace-pre-wrap text-sm text-gray-800">{renderPreview()}</pre>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
