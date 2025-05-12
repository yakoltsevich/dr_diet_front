'use client';

import { HeroUIProvider } from '@heroui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

export function Providers({ children }) {
    return (
        <ReduxProvider store={store}>
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </ReduxProvider>
    );
}
