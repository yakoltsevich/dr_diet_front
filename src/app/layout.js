// src/app/layout.js
import './globals.css';
import { Providers } from './providers';
import { Manrope } from 'next/font/google';
import { ClientLayoutShell } from './client-layout-shell';


export const metadata = {
    title: 'Dr Diet App',
    description: 'Menu and Food Diary',
    manifest: '/manifest.json',
    themeColor: '#5e7a76',
    icons: {
        icon: '/icons/icon-192.png',
        shortcut: '/icons/icon-192.png',
        apple: '/icons/icon-192.png',
    },
};
const manrope = Manrope({
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
});

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <head />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5e7a76" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <body className={manrope.className}>
        <Providers>
            <ClientLayoutShell>{children}</ClientLayoutShell>
        </Providers>
        </body>
        </html>
    );
}
