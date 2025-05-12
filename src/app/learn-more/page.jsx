'use client';

import {Button} from '@heroui/button';
import Link from 'next/link';
import {useSelector} from "react-redux";

export default function LearnMorePage() {
    const {isAuthenticated, user} = useSelector(state => state.auth);
    return (
        <div className="min-h-screen bg-[#f3f3f2] text-[#353535] font-[Manrope] px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Как работает Dr. Diet?</h1>
                <p className="mb-4 text-lg">
                    Dr. Diet помогает создать персональный план питания без стресса и лишних усилий. Всё просто:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>Вводите цели и предпочтения</li>
                    <li>Получаете меню на неделю</li>
                    <li>Автоматический список покупок</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Что вы получите?</h2>
                <ul className="space-y-2 mb-6">
                    <li>✅ Балансированное питание под ваши цели</li>
                    <li>✅ Удобный список покупок</li>
                    <li>✅ Поддержка аллергий и диет</li>
                    <li>✅ Безопасное хранение данных</li>
                </ul>

                <div className="grid gap-4 md:grid-cols-2 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold text-xl mb-2">Пример меню</h3>
                        <p>Завтрак: овсянка с орехами и бананом</p>
                        <p>Обед: куриная грудка, киноа, салат</p>
                        <p>Ужин: запечённый лосось, брокколи</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold text-xl mb-2">Пример покупок</h3>
                        <ul className="list-disc pl-5">
                            <li>Овсянка</li>
                            <li>Куриное филе</li>
                            <li>Лосось</li>
                            <li>Овощи и зелень</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={isAuthenticated ? '/menu' : "/register"}>
                        <Button className="bg-primaryColor hover:bg-[#4d6864] text-white px-6 py-2 rounded-lg">
                            {isAuthenticated ? 'Смотреть меню' : ' Зарегистрироваться'}
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="border-primaryColor text-primaryColor px-6 py-2 rounded-lg">
                            Вернуться на главную
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
