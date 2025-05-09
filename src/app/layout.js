// src/app/layout.js
import './globals.css';
import { Providers } from './providers';
import { Manrope } from 'next/font/google';
import { ClientLayoutShell } from './client-layout-shell';

export const metadata = {
    title: 'Dr Diet App',
    description: 'Авторизация и регистрация',
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
