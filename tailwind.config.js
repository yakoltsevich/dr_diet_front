import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                lightColor: "#f3f3f2",   // светлый фон
                primaryColor: "#5e7a76", // кнопки (серо-зелёный)
                textColor: "#353535",    // основной текст
                beigeColor: "#e4d1c1",   // бежевый оттенок
                softColor: "#b6c8c4",    // фон/вспомогательные элементы
            },
        },
    },
    plugins: [heroui()],
}
export default config
