'use client';

import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useIngredients } from './useIngredients';
import { IngredientTable } from './IngredientTable';
import { IngredientFormModal } from './IngredientFormModal';
import RemoteReactSelectWrapper from "@/components/common/remote_select/RemoteReactSelectWrapper.client";

export default function IngredientsPage() {
    const {
        ingredients,
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
    } = useIngredients();

    const [isModalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [sortKey, setSortKey] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };
    const openCreate = () => {
        setEditing(null);
        setModalOpen(true);
    };

    const handleEdit = (ingredient) => {
        setEditing(ingredient);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Удалить ингредиент?')) remove(id);
    };

    const handleSubmit = (data) => {
        if (editing) update(editing.id, data);
        else create(data);
        setOffset(0);
    };

    const totalPages = Math.ceil(total / limit);
    const currentPage = offset / limit + 1;

    return (
        <div className="p-2 sm:p-6 max-w-5xl mx-auto">
            <RemoteReactSelectWrapper/>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h1 className="text-2xl font-semibold text-[#353535]">Ingredients</h1>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                        placeholder="Поиск по названию"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setOffset(0);
                        }}
                        className="w-full sm:w-64"
                    />
                    <Button onPress={openCreate} className="bg-[#5e7a76] text-white rounded-lg shadow-lg">
                        + Добавить
                    </Button>
                </div>
            </div>

            {loading ? (
                <p className="text-gray-500">Загрузка...</p>
            ) : (
                <>
                    <IngredientTable
                        ingredients={ingredients}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        activeId={editing?.id}
                        hasMore={offset + limit < total}
                        onLoadMore={() => setOffset(offset + limit)}
                        onSort={handleSort}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                    />
                </>
            )}


        </div>
    );
}
