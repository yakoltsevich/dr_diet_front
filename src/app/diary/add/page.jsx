'use client';

import {useEffect, useState} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {axiosClient} from '@/lib/axiosClient';
import {useIngredients} from '@/hooks/useIngredients';
import MealForm from '@/components/meal/MealForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function AddMealPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const duplicateId = searchParams.get('duplicate');

    const queryClient = useQueryClient();
    const ingredientsQuery = useIngredients();

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(!!duplicateId);

    useEffect(() => {
        const fetchMeal = async () => {
            if (!duplicateId) return;

            try {
                const res = await axiosClient.get(`/meals/${duplicateId}`);
                const meal = res.data;

                setInitialData({
                    name: `${meal.name} (копия)`,
                    type: meal.type || 'breakfast',
                    date: new Date().toISOString().split('T')[0],
                    ingredients: meal.ingredients.map((mi) => ({
                        ingredient: mi.ingredient,
                        ingredientId: mi.ingredient.id,
                        weight: mi.weight,
                    })),
                });
            } catch (err) {
                alert('Ошибка при загрузке для копирования');
            } finally {
                setLoading(false);
            }
        };

        fetchMeal();
    }, [duplicateId]);

    const {mutate: createMeal, isPending} = useMutation({
        mutationFn: async (data) => {
            await axiosClient.post('/meals', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meals']});
            router.push('/diary');
        },
        onError: (error) => {
            alert(error?.response?.data?.message || 'Ошибка при сохранении приёма пищи');
        },
    });

    return (
        <div className="max-w-2xl mx-auto px-0 sm:px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center text-[#353535]">Add Meal</h1>
            {loading ? (
                <p className="text-center text-muted-foreground">Загрузка...</p>
            ) : (
                <MealForm
                    onSubmit={createMeal}
                    isSubmitting={isPending}
                    ingredientsQuery={ingredientsQuery}
                    initialData={initialData}
                />
            )}
        </div>
    );
}
