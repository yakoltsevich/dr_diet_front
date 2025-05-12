'use client';

import {Button} from "@heroui/button";
import {useRouter} from "next/navigation";

export const CallToAction = () => {
    const router = useRouter();

    const onPressSignUp = () => {
        router.push('/login');
    };
    return (
        <section className="bg-[#5e7a76] text-white py-16 text-center px-6 md:px-20 w-full">
            <h2 className="text-3xl font-semibold mb-4">Попробуйте свой первый план питания уже сегодня</h2>
            <p className="mb-6">Без подписки, без рекламы.</p>
            <button onClick={onPressSignUp} className="bg-white text-[#5e7a76] px-6 py-3 rounded-lg font-semibold">
                Зарегистрироваться бесплатно
            </button>

            {/*<Button onPress={onPressSignUp} className='font-semibold text-xl'>Sign Up</Button>*/}
        </section>
    );
}
