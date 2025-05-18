'use client';

import { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@heroui/modal';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import {axiosClient} from "@/lib/axiosClient";

export function AddIngredientModal({ isOpen, onClose, onCreated }) {
    const [form, setForm] = useState({
        name: '',
        calories: '',
        protein: '',
        fat: '',
        carbs: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.post('/ingredients', {
                ...form,
                calories: parseFloat(form.calories),
                protein: parseFloat(form.protein),
                fat: parseFloat(form.fat),
                carbs: parseFloat(form.carbs),
            });

            const ingredient = res.data;
            onCreated(ingredient);
            onClose();
            setForm({ name: '', calories: '', protein: '', fat: '', carbs: '' });
        } catch (err) {
            alert(err?.response?.data?.message || 'Ошибка при создании ингредиента');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent>
                <ModalHeader>New Ingredient</ModalHeader>
                <ModalBody className="space-y-3">
                    <Input
                        label="Name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <Input
                        label="Calories"
                        type="number"
                        value={form.calories}
                        onChange={(e) => handleChange('calories', e.target.value)}
                    />
                    <Input
                        label="Protein (g)"
                        type="number"
                        value={form.protein}
                        onChange={(e) => handleChange('protein', e.target.value)}
                    />
                    <Input
                        label="Fat (g)"
                        type="number"
                        value={form.fat}
                        onChange={(e) => handleChange('fat', e.target.value)}
                    />
                    <Input
                        label="Carbs (g)"
                        type="number"
                        value={form.carbs}
                        onChange={(e) => handleChange('carbs', e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleSubmit}
                        isLoading={loading}
                        className="bg-[#5e7a76] text-white"
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
