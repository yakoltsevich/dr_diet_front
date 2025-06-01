'use client';

import { Modal } from '@heroui/modal';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useState, useEffect } from 'react';

export function IngredientFormModal({ open, onClose, onSubmit, initial }) {
    const [form, setForm] = useState({
        name: '',
        calories: '',
        protein: '',
        fat: '',
        carbs: '',
    });

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name || '',
                calories: initial.calories || '',
                protein: initial.protein || '',
                fat: initial.fat || '',
                carbs: initial.carbs || '',
            });
        } else {
            setForm({
                name: '',
                calories: '',
                protein: '',
                fat: '',
                carbs: '',
            });
        }
    }, [initial]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSubmit({
            ...form,
            calories: +form.calories,
            protein: +form.protein,
            fat: +form.fat,
            carbs: +form.carbs,
        });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto space-y-4">
                <h2 className="text-xl font-semibold text-[#353535]">
                    {initial ? 'Редактировать' : 'Добавить'} ингредиент
                </h2>
                <Input
                    name="name"
                    placeholder="Название"
                    value={form.name}
                    onChange={handleChange}
                />
                <Input
                    name="calories"
                    type="number"
                    placeholder="Калории"
                    value={form.calories}
                    onChange={handleChange}
                />
                <Input
                    name="protein"
                    type="number"
                    placeholder="Белки"
                    value={form.protein}
                    onChange={handleChange}
                />
                <Input
                    name="fat"
                    type="number"
                    placeholder="Жиры"
                    value={form.fat}
                    onChange={handleChange}
                />
                <Input
                    name="carbs"
                    type="number"
                    placeholder="Углеводы"
                    value={form.carbs}
                    onChange={handleChange}
                />
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>Отмена</Button>
                    <Button className="bg-[#5e7a76] text-white" onClick={handleSave}>
                        {initial ? 'Сохранить' : 'Создать'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
