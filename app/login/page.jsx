'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthNavbar from '@/components/AuthNavbar';
import AuthFooter from '@/components/AuthFooter';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/useAuth';



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
const errorToast = (title, message) => toast.custom(() => toastCard({ tone: 'error', title, message }), { duration: 4200 });

const LoginPage = () => {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      errorToast('Validation Error', 'Please enter both email and password.');
      return;
    }

    try {
      const result = await login(email, password);
      successToast('Login Successful', 'Welcome back to LangMaster!');
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err) {
      errorToast('Login Failed', err.message || 'Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Toasts */}
      <Toaster position="top-right" />

      
      <main className="flex-grow flex items-center justify-center px-4 py-12 bg-amber-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-amber-200"
        >
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">
            Welcome Back to LangMaster
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email 
              </label>
              <input
                type="text"
                className="w-full mt-1 input-style"
                placeholder="your@email.com or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-1 input-style"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                Remember Me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-700 underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Logging in…' : 'Login'}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              New to LangMaster?{' '}
              <Link
                href="/signup"
                className="text-emerald-700 font-medium"
              >
                Create Account
              </Link>
            </p>
          </form>
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default LoginPage;
