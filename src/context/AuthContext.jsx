'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { axiosClient } from '@/lib/axiosClient';
import { usePathname } from 'next/navigation';
import { PUBLIC_ROUTES } from '@/shared/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
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

            const isPublic = PUBLIC_ROUTES.includes(pathname);
            const status = err?.response?.status;

            if (!isPublic && (status === 401 || status === 403)) {
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axiosClient.post('/auth/logout', {}, { withCredentials: true });
        } catch (e) {
            console.error('Logout failed:', e);
        } finally {
            setUser(null);
            setAccessToken(null);
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, accessToken, isAuthenticated: !!user, loading, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
