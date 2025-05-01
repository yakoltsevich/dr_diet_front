'use client';

import {useEffect, useState} from 'react';
import { Button } from '@heroui/button';
import { axiosClient } from '@/lib/axiosClient';

export const WeeklyMenu = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
useEffect(() => {
    getMenu()
}, [])
    const getMenu = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/menu');
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Ошибка при генерации меню');
        } finally {
            setLoading(false);
        }
    };
    const generateMenu = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.post('/menu/generate', {body:{}});
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Ошибка при генерации меню');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <Button onClick={generateMenu} disabled={loading} className="w-full">
                {loading ? 'Генерация меню...' : 'Сгенерировать меню на неделю'}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            {menu && menu.length > 0 && (
                <div className="space-y-6">
                    {menu.map((day) => (
                        <div key={day.day} className="p-4 rounded-lg shadow bg-white">
                            <h2 className="text-xl font-semibold mb-2">День {day.day}</h2>

                            {['breakfast', 'lunch', 'dinner'].map((mealKey) => {
                                const meal = day[mealKey];
                                if (!meal) return null;

                                return (
                                    <div key={mealKey} className="mb-4">
                                        <h3 className="font-medium capitalize">
                                            {mealKey === 'breakfast' ? 'Завтрак' : mealKey === 'lunch' ? 'Обед' : 'Ужин'}
                                        </h3>
                                        <p><strong>Блюдо:</strong> {meal.dish}</p>

                                        <p className="mt-2 font-semibold">Ингредиенты:</p>
                                        <ul className="list-disc list-inside text-sm">
                                            {meal.recipe.ingredients.map((ing, idx) => (
                                                <li key={idx}>{ing.item}: {ing.amount}</li>
                                            ))}
                                        </ul>

                                        <p className="mt-2 font-semibold">Приготовление:</p>
                                        <ol className="list-decimal list-inside text-sm space-y-1">
                                            {meal.recipe.steps.map((step, idx) => (
                                                <li key={idx}>{step}</li>
                                            ))}
                                        </ol>

                                        <p className="text-sm text-gray-500 mt-2">
                                            БЖУ: {meal.total.calories} ккал, Б: {meal.total.protein}г, Ж: {meal.total.fat}г, У: {meal.total.carbs}г
                                        </p>
                                    </div>
                                );
                            })}

                            <div className="text-sm font-semibold border-t pt-2 mt-2">
                                Итого за день: {day.total.calories} ккал, Б: {day.total.protein}г, Ж: {day.total.fat}г, У: {day.total.carbs}г
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default WeeklyMenu
