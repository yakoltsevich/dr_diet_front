'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { setCredentials } from '@/store/slices/authSlice'; // предполагается, что он есть

export const ClientLayoutShell = ({ children }) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [isMounted, setIsMounted] = useState(false);

    const hideHeaderAndFooter = pathname === '/login' || pathname === '/register';

    // Загрузка состояния auth из localStorage только на клиенте
    useEffect(() => {
        setIsMounted(true);

        try {
            const serialized = localStorage.getItem('auth');
            if (serialized) {
                const auth = JSON.parse(serialized);
                dispatch(setCredentials(auth));
            }
        } catch (e) {
            console.error('Ошибка загрузки auth из localStorage', e);
        }
    }, [dispatch]);

    // Избежание гидрации до полной инициализации
    if (!isMounted) return null;

    return (
        <>
            {!hideHeaderAndFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderAndFooter && <Footer />}
        </>
    );
};
