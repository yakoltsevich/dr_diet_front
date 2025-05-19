'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { CardBody, Card } from '@heroui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { axiosClient } from '@/lib/axiosClient';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/store/slices/authSlice';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        try {
            const { data } = await axiosClient.post('auth/login', { email, password }, { withCredentials: true });

            dispatch(setAccessToken(data.access_token));
            router.push('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login error');
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-8">
                <CardBody>
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            labelPlacement="outside"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                        <Input
                            label="Password"
                            labelPlacement="outside"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <Button isLoading={loading} type="submit" className="w-full">
                            Log In
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link href="/register" className="text-[#5e7a76] hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
