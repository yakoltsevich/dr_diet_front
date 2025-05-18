'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardBody } from '@heroui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { axiosClient } from "@/lib/axiosClient";
import { useDispatch } from "react-redux";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axiosClient.post('/users', { email, password });
            localStorage.setItem('token', data.access_token);
            router.push('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration error');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6">
                <CardBody className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    <form onSubmit={handleRegister} className="w-full flex flex-col items-center gap-3">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            labelPlacement="outside"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            labelPlacement="outside"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                    <div className="mt-2 text-sm text-gray-600 text-center">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#5e7a76] hover:underline">
                            Log In
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
