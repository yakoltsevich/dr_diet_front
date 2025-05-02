import './globals.css';
import {Providers} from "./providers";
import {Manrope} from 'next/font/google'
import {Header2} from "@/components/Header2";
import {Header} from "@/components/Header";

export const metadata = {
    title: "Dr Diet App",
    description: "Авторизация и регистрация",
};

// If loading a variable font, you don't need to specify the font weight
const manrope = Manrope({subsets: ['latin', "cyrillic", "cyrillic-ext"]})

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <head>
            <meta charSet="UTF-8"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=0, interactive-widget=resizes-content"
            />

        </head>
        <body className={manrope.className}>
        <Header />
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
