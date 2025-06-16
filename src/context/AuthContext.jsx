'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { axiosClient } from '@/lib/axiosClient';
import { usePathname, useRouter } from 'next/navigation';
import { PUBLIC_ROUTES } from '@/shared/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!PUBLIC_ROUTES.includes(pathname)) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await axiosClient.post('/auth/refresh', {}, { withCredentials: true });
      const token = res.data.access_token;
      setAccessToken(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.sub, email: payload.email, name: payload.name });
    } catch (err) {
      setUser(null);
      setAccessToken(null);
      if (!PUBLIC_ROUTES.includes(pathname)) router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated: !!user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
