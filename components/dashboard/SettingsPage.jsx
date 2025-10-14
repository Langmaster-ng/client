"use client";

import { motion } from "framer-motion";
import { User, Moon, Edit, Bell } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    lessons: true,
    streaks: true,
    announcements: false,
  });

  return (
    <section className="md:ml-64 px-4 md:px-10 pt-6 md:pt-10 pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Settings & Profile 
        </h1>
        <p className="text-gray-500 mt-1">
          Customize your LangMaster experience to match your style.
        </p>
      </div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8"
      >
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User size={18} className="text-green-500" />
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              value="Kingdom Ezirim Chukwuebuka"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              readOnly
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              value="chukwuebuka"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              readOnly
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-500">Gender</label>
            <select
              defaultValue="male"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>

          {/* Account Visibility */}
          <div>
            <label className="text-sm text-gray-500">Account Visibility</label>
            <select
              defaultValue="public"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Privacy Level */}
          <div>
            <label className="text-sm text-gray-500">Privacy Level</label>
            <select
              defaultValue="standard"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="standard">Standard</option>
              <option value="strict">Strict</option>
            </select>
          </div>
        </div>

        {/* Edit Profile Row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-lg">
              K
            </div>
            <div>
              <p className="text-sm text-gray-800 font-medium">
                Edit Profile, Avatar & Language Preference
              </p>
              <p className="text-xs text-gray-500">
                Change your look or preferred language
              </p>
            </div>
          </div>
          <button className="bg-green-500 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-green-600 transition flex items-center gap-2">
            <Edit size={16} />
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8"
      >
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Moon size={18} className="text-green-500" />
          Theme
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">
            Switch between light and dark mode
          </span>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              theme === "light"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-white"
            } transition`}
          >
            {theme === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Bell size={18} className="text-green-500" />
          Notification Settings
        </h2>
        <div className="space-y-4">
          {Object.keys(notifications).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between border-b border-gray-100 pb-3"
            >
              <span className="text-sm capitalize text-gray-700">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
