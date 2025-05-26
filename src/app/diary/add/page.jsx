'use client';

import {useRouter} from 'next/navigation';
import {axiosClient} from '@/lib/axiosClient';
import {useIngredients} from '@/hooks/useIngredients';
import MealForm from '@/components/meal/MealForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function AddMealPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {ingredients: availableIngredients, loading, refetch} = useIngredients();

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
            <MealForm
                availableIngredients={availableIngredients}
                refetchAvailableIngredients={refetch}
                onSubmit={createMeal}
                isSubmitting={isPending}
                loading={loading}
            />
        </div>
    );
}
