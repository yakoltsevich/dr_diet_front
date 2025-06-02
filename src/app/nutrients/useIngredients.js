'use client';

import {useState, useEffect} from 'react';
import {axiosClient} from "@/lib/axiosClient";

export function useIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [offset, setOffset] = useState(0);
    const limit = 20;

    const fetchIngredients = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/ingredients', {
                params: {
                    offset,
                    limit,
                    ...(search ? {name: search} : {}),
                },
            });

            const {data, total} = response.data;
            setIngredients(data);
            setTotal(total);
            return response.data;
        } catch (error) {
            console.error('Ошибка при загрузке ингредиентов:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, [offset, search]);

    const create = async (ingredient) => {
        await axiosClient.post('/ingredients', ingredient);
        fetchIngredients();
    };

    const update = async (id, ingredient) => {
        await axiosClient.put(`/ingredients/${id}`, ingredient);
        fetchIngredients();
    };

    const remove = async (id) => {
        await axiosClient.delete(`/ingredients/${id}`);
        fetchIngredients();
    };

    return {
        ingredients,
        fetchIngredients,
        total,
        limit,
        offset,
        setOffset,
        search,
        setSearch,
        loading,
        create,
        update,
        remove,
    };
}
