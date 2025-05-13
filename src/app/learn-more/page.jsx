'use client';

import { Button } from '@heroui/button';
import Link from 'next/link';
import { useSelector } from "react-redux";

export default function LearnMorePage() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    return (
        <div className="min-h-screen bg-[#f3f3f2] text-[#353535] font-[Manrope] px-6 py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">How does Dr. Diet work?</h1>
                <p className="mb-4 text-lg">
                    Dr. Diet helps you create a personalized nutrition plan without stress or extra effort. It’s simple:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>Set your goals and preferences</li>
                    <li>Get a weekly meal plan</li>
                    <li>Automatically generate a shopping list</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">What will you get?</h2>
                <ul className="space-y-2 mb-6">
                    <li>✅ Balanced nutrition tailored to your goals</li>
                    <li>✅ Convenient shopping list</li>
                    <li>✅ Allergy and diet support</li>
                    <li>✅ Secure data storage</li>
                </ul>

                <div className="grid gap-4 md:grid-cols-2 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold text-xl mb-2">Sample Meal Plan</h3>
                        <p>Breakfast: oatmeal with nuts and banana</p>
                        <p>Lunch: chicken breast, quinoa, salad</p>
                        <p>Dinner: baked salmon, broccoli</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold text-xl mb-2">Sample Shopping List</h3>
                        <ul className="list-disc pl-5">
                            <li>Oatmeal</li>
                            <li>Chicken breast</li>
                            <li>Salmon</li>
                            <li>Vegetables and greens</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-primaryColor hover:bg-[#4d6864] text-white px-6 py-2 rounded-lg">
                        <Link href={isAuthenticated ? '/menu' : "/register"}>
                            {isAuthenticated ? 'View Menu' : 'Sign Up'}
                        </Link>
                    </Button>

                    <Button variant="outline" className="border-primaryColor text-primaryColor px-6 py-2 rounded-lg">
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
