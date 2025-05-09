// src/app/client-layout-shell.jsx
'use client';

import { usePathname } from 'next/navigation';
import { Header2 } from '@/components/Header2';
import { Footer } from '@/components/Footer';

export const ClientLayoutShell = ({ children }) => {
    const pathname = usePathname();
    const hideHeaderAndFooter = pathname === '/login' || pathname === '/register';

    return (
        <>
            {!hideHeaderAndFooter && <Header2 />}
            <main>{children}</main>
            {!hideHeaderAndFooter && <Footer />}
        </>
    );
};
