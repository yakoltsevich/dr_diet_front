import './globals.css';
import { Providers } from './providers';
import { Manrope } from 'next/font/google';
import { ClientLayoutShell } from './client-layout-shell';

export const metadata = {
    title: 'Dr Diet App',
    description: 'Menu and Food Diary',
    manifest: '/manifest.json',
    icons: {
        icon: '/icons/icon-192.png',
        shortcut: '/icons/icon-192.png',
        apple: '/icons/icon-192.png',
    },
};

export const viewport = {
    themeColor: '#5e7a76',
    width: 'device-width',
    initialScale: 1,
};

const manrope = Manrope({
    subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
});

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <head />
        <body className={manrope.className}>
        <Providers>
            <ClientLayoutShell>{children}</ClientLayoutShell>
        </Providers>
        </body>
        </html>
    );
}
