'use client';

import Image from 'next/image';

export const HeroSection = () => {
    return (
        <section className="max-w-7xl w-xl flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
            <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Ваш личный план питания — без лишних усилий
                </h1>
                <p className="text-lg text-[#5e7a76]">
                    Генерируйте сбалансированное меню на неделю, узнайте рецепты и получайте список покупок по вашим
                    целям.
                </p>
                <div className="flex gap-4">
                    <button className="bg-[#5e7a76] text-white px-6 py-3 rounded-lg shadow-lg">Начать</button>
                    <button className="border border-[#5e7a76] text-[#5e7a76] px-6 py-3 rounded-lg">Узнать больше
                    </button>
                </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
                <Image src="/woman.png" alt="Здоровая еда" width={500} height={500} className="w-full"/>
            </div>
        </section>
    );
}
