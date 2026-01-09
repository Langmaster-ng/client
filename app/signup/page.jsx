'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthNavbar from '@/components/AuthNavbar';
import AuthFooter from '@/components/AuthFooter';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { apiClient } from "@/lib/api/apiClient";

const languages = [
  { id: 'yoruba', name: 'Yoruba', region: 'Southwestern Nigeria', speakers: '30+ million', flag: '🇳🇬' },
  { id: 'igbo',   name: 'Igbo',   region: 'Southeastern Nigeria', speakers: '24+ million', flag: '🇳🇬' },
  { id: 'hausa',  name: 'Hausa',  region: 'Northern Nigeria',     speakers: '44+ million', flag: '🇳🇬' },
];

const proficiencyLevels = [
  { id: 'beginner',     title: 'Beginner',     desc: 'Little or no previous knowledge' },
  { id: 'intermediate', title: 'Intermediate', desc: 'Some conversational ability' },
  { id: 'advanced',     title: 'Advanced',     desc: 'Comfortable with complex conversations' },
];


function toastCard({ tone = 'info', title, message }) {
  const tones = {
    success: {
      Icon: CheckCircle2,
      ring: 'ring-1 ring-green-200',
      bg: 'bg-white',
      title: 'text-green-700',
      msg: 'text-gray-600',
      dot: 'bg-green-500',
    },
    error: {
      Icon: AlertTriangle,
      ring: 'ring-1 ring-red-200',
      bg: 'bg-white',
      title: 'text-red-700',
      msg: 'text-gray-600',
      dot: 'bg-red-500',
    },
    info: {
      Icon: Info,
      ring: 'ring-1 ring-amber-200',
      bg: 'bg-white',
      title: 'text-amber-700',
      msg: 'text-gray-600',
      dot: 'bg-amber-500',
    },
  }[tone];

  return (
    <div className={`pointer-events-auto w-[320px] rounded-2xl ${tones.bg} shadow-lg border border-gray-100 ${tones.ring} p-4`}>
      <div className="flex items-start gap-3">
        <div className={`h-2 w-2 rounded-full ${tones.dot} mt-2`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <tones.Icon size={16} className={tones.title} />
            <p className={`text-sm font-semibold ${tones.title}`}>{title}</p>
          </div>
          {message && <p className={`mt-1 text-xs ${tones.msg}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const successToast = (title, message) => toast.custom(() => toastCard({ tone: 'success', title, message }), { duration: 3500 });
const errorToast   = (title, message) => toast.custom(() => toastCard({ tone: 'error',   title, message }), { duration: 4200 });
const infoToast    = (title, message) => toast.custom(() => toastCard({ tone: 'info',    title, message }), { duration: 3200 });

/* ---------------- Validation ---------------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usernameRe = /^[a-zA-Z0-9_]{3,20}$/; 

function validateFields({ fullName, username, email, password, language, proficiency, agree }) {
  if (!fullName || fullName.trim().length < 3) {
    return 'Please enter your full name (min 3 characters).';
  }
  if (!usernameRe.test(username)) {
    return 'Username should be 3–20 chars (letters, numbers, underscores).';
  }
  if (!emailRe.test(email)) {
    return 'Please enter a valid email address.';
  }
  // Password: min 8, at least one letter & one number
  const hasLen = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasLen || !hasLetter || !hasNumber) {
    return 'Password must be 8+ chars and include letters & numbers.';
  }
  if (!language) {
    return 'Please select your language.';
  }
  if (!proficiency) {
    return 'Please select your proficiency level.';
  }
  if (!agree) {
    return 'You must agree to the Terms & Conditions.';
  }
  return null;
}

export default function SignupPage() {
  const router = useRouter();
  
  // Controlled form fields
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const mapPreferredLanguage = (id) => {
    const map = { igbo: 'igbo', yoruba: 'yoruba', hausa: 'hausa' };
    return map[id] || 'igbo';
  };

  /* -------- client toasts -------- */
  const nudgeFullName = () => {
    if (fullName && fullName.trim().length < 3) {
      errorToast('Full name too short', 'Use at least 3 characters.');
    }
  };
  const nudgeUsername = () => {
    if (username && !usernameRe.test(username)) {
      infoToast('Username hint', 'Use 3–20 letters/numbers/underscores.');
    }
  };
  const nudgeEmail = () => {
    if (email && !emailRe.test(email)) {
      errorToast('Invalid email', 'Double-check the email format.');
    }
  };
  const nudgePassword = () => {
    const hasLen = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (password && (!hasLen || !hasLetter || !hasNumber)) {
      infoToast('Password strength', '8+ chars with letters & numbers recommended.');
    }
  };

  async function handleSubmit(e) {
  e.preventDefault();

  const err = validateFields({
    fullName,
    username,
    email,
    password,
    language: selectedLanguage,
    proficiency: selectedProficiency,
    agree,
  });

  if (err) {
    errorToast('Fix required', err);
    return;
  }

  try {
    setLoading(true);

    // 🔑 IMPORTANT: match backend keys EXACTLY
    const payload = {
      email,
      password,
      username,
      full_name: fullName,
      preferred_language: mapPreferredLanguage(selectedLanguage),
      proficiency_level: selectedProficiency,
      agree_to_terms: true,
    };

    const result = await apiClient("/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    // ✅ success
    successToast(
      "Welcome to LangMaster!",
      result.message || "User registered successfully."
    );

    // ✅ redirect after UX pause
    setTimeout(() => {
      router.push("/login");
    }, 1000);

  } catch (err) {
    errorToast("Signup error", err.message || "Please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Toasts */}
      <Toaster position="top-right" />

      {/* Navbar */}
      <AuthNavbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-amber-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-amber-200"
        >
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">
            Create Your LangMaster Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Full Name and Username */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="input-style"
                  placeholder="E.g., Chika Okafor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={nudgeFullName}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="input-style"
                  placeholder="E.g., chika123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={nudgeUsername}
                  required
                />
              </div>
            </div>

            {/* Email and Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="input-style"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={nudgeEmail}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="input-style"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={nudgePassword}
                  required
                />
                {/* pass val */}
                <p className="mt-1 text-[11px] text-gray-500">
                  Use at least 8 characters, including letters & numbers.
                </p>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Language</label>
              <p className="text-sm text-gray-500 mb-4">Choose a Nigerian language to start learning</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <motion.div
                    key={lang.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedLanguage(lang.id);
                      infoToast('Language selected', `${lang.name} chosen`);
                    }}
                    className={`cursor-pointer p-4 rounded-xl border ${
                      selectedLanguage === lang.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 bg-white'
                    } shadow-sm hover:shadow-md transition duration-200`}
                  >
                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <h3 className="text-base font-semibold text-gray-800">{lang.name}</h3>
                    <p className="text-sm text-gray-600">{lang.region}</p>
                    <p className="text-xs text-gray-500">{lang.speakers} speakers</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Proficiency Level */}
            {selectedLanguage && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Proficiency</label>
                <p className="text-sm text-gray-500 mb-4">
                  How familiar are you with {languages.find((l) => l.id === selectedLanguage)?.name}?
                </p>

                <div className="grid sm:grid-cols-3 gap-4">
                  {proficiencyLevels.map((level) => (
                    <motion.div
                      key={level.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedProficiency(level.id);
                        infoToast('Proficiency selected', level.title);
                      }}
                      className={`cursor-pointer p-4 rounded-xl border ${
                        selectedProficiency === level.id
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 bg-white'
                      } shadow-sm hover:shadow-md transition duration-200`}
                    >
                      <h4 className="text-base font-semibold text-gray-800">{level.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{level.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Terms & Submit */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-emerald-700 underline">
                  Terms & Conditions
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Creating account…' : 'Sign Up'}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-700 font-medium">
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <AuthFooter />
    </div>
  );
}
