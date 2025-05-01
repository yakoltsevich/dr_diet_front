'use client';

import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const Header = () => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    const pathname = usePathname(); // <-- здесь берем текущий путь
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        router.push('/login');
    };
    return (
        <header className="w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="text-2xl font-bold text-brand dark:text-white">
                    Dr Diet
                </div>

                <nav className=" flex items-center">
                    {isAuth ? (
                        <>
                            <Button variant="outline" onPress={() => router.push('/menu')}>
                                Menu
                            </Button>
                            <Button variant="outline" onPress={() => router.push('/profile')}>
                                Профиль
                            </Button>
                            <Button onPress={handleLogout}>
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" onPress={() => router.push('/login')}>
                                Войти
                            </Button>
                            <Button onPress={() => router.push('/register')}>
                                Регистрация
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};
