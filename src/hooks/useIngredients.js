import {useQuery} from '@tanstack/react-query';
import {axiosClient} from '@/lib/axiosClient';

export function useIngredients() {
    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['ingredients'],
        queryFn: async () => {
            const res = await axiosClient.get('/ingredients');
            return res.data;
        },
    });

    return {
        ingredients: data || [],
        loading: isLoading,
        error,
        refetch,
    };
}
