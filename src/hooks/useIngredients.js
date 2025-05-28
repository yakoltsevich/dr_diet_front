import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';

const LIMIT = 999;

export function useIngredients(searchQuery = '') {
    const query = useInfiniteQuery({
        queryKey: ['ingredients', searchQuery], // Ключ зависит от поискового текста
        queryFn: async ({ pageParam = 0 }) => {
            const res = await axiosClient.get('/ingredients', {
                params: {
                    offset: pageParam,
                    limit: LIMIT,
                    name: searchQuery, // 🔍 передаём inputValue
                },
            });
            return res.data;
        },
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined,
    });

    return {
        ingredients: query.data?.pages.flatMap((page) => page.data) || [],
        loading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
        fetchNextPage: query.fetchNextPage,
        hasNextPage: query.hasNextPage,
        isFetchingNextPage: query.isFetchingNextPage,
    };
}
