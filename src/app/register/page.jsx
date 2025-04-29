'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardBody } from '@heroui/card';
import { useRouter } from 'next/navigation';
import {axiosClient} from "@/lib/axiosClient";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axiosClient.post('/auth/register', { email, password });
            localStorage.setItem('token', data.access_token);
            router.push('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6">
                <CardBody className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
                    <form onSubmit={handleRegister} className=" w-full">
                        <Input
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                        <Input
                            label="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <Button type="submit" className="w-full">
                            Зарегистрироваться
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;
