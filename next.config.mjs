/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
    output: 'standalone', // ✅ важно для Render
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development', // отключаем PWA в dev
})(nextConfig);
