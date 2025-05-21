import {useQuery} from '@tanstack/react-query';
import {axiosClient} from '@/lib/axiosClient';

export function useMeal(id) {
    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosClient.get(`/meals/${id}`);
            return res.data;
        },
        enabled: !!id, // только если есть id
    });

    return {
        meal: data || null,
        loading: isLoading,
        error,
        refetch,
    };
}
