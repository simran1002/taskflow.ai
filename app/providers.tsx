'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
      if (data.success) {
        setUser(data.data.user);
      }
    } catch {
      // Not authenticated, continue
    } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}

