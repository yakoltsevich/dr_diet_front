'use client';

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const CallToAction = () => {
    const router = useRouter();
    const { isAuthenticated } = useSelector(state => state.auth);

    const handleSignUp = () => {
        router.push('/login');
    };

    const handleGoToMenu = () => {
        router.push('/menu');
    };

    return (
        <section className="bg-primaryColor text-white py-16 text-center px-6 md:px-20 w-full">
            {!isAuthenticated ? (
                <>
                    <h2 className="text-3xl font-semibold mb-4">
                        Try your first meal plan today
                    </h2>
                    <button
                        onClick={handleSignUp}
                        className="bg-white text-primaryColor px-6 py-3 rounded-lg font-semibold"
                    >
                        Sign up for free
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-semibold mb-4">
                        Ready to continue planning?
                    </h2>
                    <button
                        onClick={handleGoToMenu}
                        className="bg-white text-primaryColor px-6 py-3 rounded-lg font-semibold"
                    >
                        Go to Menu
                    </button>
                </>
            )}
        </section>
    );
};
