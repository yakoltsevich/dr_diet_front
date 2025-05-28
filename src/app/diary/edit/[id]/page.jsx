'use client';

import {useParams, useRouter} from 'next/navigation';
import {useMeal} from '@/hooks/useMeal';
import {useIngredients} from '@/hooks/useIngredients';
import {axiosClient} from '@/lib/axiosClient';
import MealForm from '@/components/meal/MealForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function EditMealPage() {
    const {id} = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    const {meal, loading: loadingMeal} = useMeal(id);

    const ingredientsQuery = useIngredients();

    const {mutate: updateMeal, isPending} = useMutation({
        mutationFn: async (data) => {
            console.log('mutationFn', data);
            await axiosClient.put(`/meals/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['meals']});
            router.push('/diary');
        },
        onError: (error) => {
            alert(error?.response?.data?.message || 'Ошибка при сохранении изменений');
        },
    });

    const loading = loadingMeal || ingredientsQuery.loading;
    console.log('meal', meal);

    const initialData = meal && {
        name: meal.name,
        type: meal.type || 'breakfast',
        date: meal.createdAt.split('T')[0],
        ingredients: meal.ingredients.map((mi) => ({
            ingredient: mi.ingredient,
            ingredientId: mi.ingredient.id,
            weight: mi.weight,
        })),
    };
    return (
        <div className="max-w-2xl mx-auto px-0 sm:px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center text-[#353535]">Edit Meal</h1>
            {!initialData ? (
                <p className="text-center text-muted-foreground">Загрузка...</p>
            ) : (
                <MealForm
                    initialData={initialData}
                    ingredientsQuery={ingredientsQuery}
                    onSubmit={updateMeal}
                    isSubmitting={isPending}
                    loading={loading}
                />
            )}
        </div>
    );
}
