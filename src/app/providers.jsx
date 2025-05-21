'use client';

import { HeroUIProvider } from '@heroui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { AuthProvider } from '@/context/AuthContext'; // 👈 добавляем
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from "react";

export function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ReduxProvider store={store}>
            <AuthProvider> {/* 👈 оборачиваем */}
                <HeroUIProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </HeroUIProvider>
            </AuthProvider>
        </ReduxProvider>
    );
}
