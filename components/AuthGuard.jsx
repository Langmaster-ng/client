'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(null); // null = checking

  useEffect(() => {
    // 🔍 Read token explicitly
    const token = window.localStorage.getItem('langmaster_token');

    if (!token) {
      // ❌ Not authenticated → redirect
      router.replace('/login');
      setAuthorized(false);
    } else {
      // ✅ Authenticated
      setAuthorized(true);
    }
  }, [router]);

  // ⛔ BLOCK rendering while checking or unauthorized
  if (authorized !== true) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <Loader2 className="animate-spin text-emerald-700" size={28} />
      </div>
    );
  }

  // ✅ Only render dashboard if authorized
  return children;
}
