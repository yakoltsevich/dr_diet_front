'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { CardBody, Card } from '@heroui/card';
import { useRouter } from 'next/navigation';
import {axiosClient} from "@/lib/axiosClient";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axiosClient.post('auth/login', { email, password });
            localStorage.setItem('token', data.access_token);
            router.push('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Ошибка входа');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-8">
                <CardBody>
                    <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
                    <form onSubmit={handleLogin}  className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            labelPlacement='outside'
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                        <Input
                            label="Пароль"
                            labelPlacement='outside'
                            value={password}
                            placeholder="Пароль"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <Button type="submit" className="w-full">
                            Войти
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
