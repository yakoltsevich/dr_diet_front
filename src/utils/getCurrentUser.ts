// utils/getCurrentUser.ts
import {cookies} from 'next/headers';
import {jwtVerify} from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function getCurrentUser() {
    const refreshToken = (await cookies()).get('refresh_token')?.value;
    if (!refreshToken) return null;

    const res = await fetch('http://localhost:3000/auth/refresh', {
        method: 'POST',
        headers: {
            cookie: `refresh_token=${refreshToken}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) return null;

    const {access_token} = await res.json();
    const {payload} = await jwtVerify(access_token, JWT_SECRET);

    return {
        id: payload.sub,
        email: payload.email,
    };
}
