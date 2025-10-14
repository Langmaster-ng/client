"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, Loader2, Gift, Sparkles } from "lucide-react";

export default function AIChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to LangMaster AI Tutor! Let's practice your language skills.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newUserMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    // Dummy reply
    setTimeout(() => {
      const reply = {
        sender: "bot",
        text: "Great job! You're improving already. Keep it up!",
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Practice Chat Button with Glow - i will use our logo later on*/}
        <motion.button
          onClick={() => setIsChatOpen(true)}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 rounded-full bg-green-500 text-white px-5 py-3 font-semibold shadow-lg hover:bg-green-600 transition"
        >
          <MessageCircle size={20} />
          <span>LangMaster Chat</span>

          {/* Glowing Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400/50 blur-md"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          />
        </motion.button>

        {/* Claim Reward Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsRewardOpen(true)}
          className="flex items-center gap-2 rounded-full bg-white text-green-600 font-medium px-4 py-2 shadow border border-green-200 hover:bg-green-50 transition"
        >
          <Gift size={18} className="text-green-500" />
          Claim Daily Reward
        </motion.button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-end sm:items-center sm:justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative w-full sm:w-[400px] h-[500px] sm:h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b bg-green-500 text-white">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <span className="font-semibold">LangMaster AI Tutor</span>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:text-gray-200 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-3">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                        msg.sender === "user"
                          ? "bg-green-500 text-white"
                          : "bg-white border text-gray-700"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border px-4 py-2 rounded-2xl text-sm text-gray-600 shadow-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Typing...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 text-sm border rounded-full outline-none focus:ring-2 focus:ring-green-500"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={loading}
                  className="p-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Modal */}
      <AnimatePresence>
        {isRewardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl border border-gray-100 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsRewardOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mb-6">
                <Sparkles className="text-green-500" />
                Daily Reward
              </h2>

              {/* Spinning Drum */}
              <motion.div
                animate={{ rotate: 1080 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="mx-auto mb-6 h-40 w-40 rounded-full border-[6px] border-green-400 flex items-center justify-center bg-gradient-to-tr from-green-50 to-white shadow-[0_0_25px_#22C55E55]"
              >
                <div className="text-green-600 font-semibold">🎡 Spinning...</div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-green-600 font-bold text-lg"
              >
            You won +20 XP!
              </motion.p>

              <button
                onClick={() => setIsRewardOpen(false)}
                className="mt-6 bg-green-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-600 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
