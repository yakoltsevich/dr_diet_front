'use client';

import { HeroUIProvider } from '@heroui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { AuthProvider } from '@/context/AuthContext'; // 👈 добавляем

export function Providers({ children }) {
    return (
        <ReduxProvider store={store}>
            <AuthProvider> {/* 👈 оборачиваем */}
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </AuthProvider>
        </ReduxProvider>
    );
}
