'use client';

import {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,} from '@heroui/modal';
import {Input} from '@heroui/input';
import {Button} from '@heroui/button';
import {axiosClient} from "@/lib/axiosClient";
import {NumberInput} from "@heroui/react";
import isEqual from 'lodash/isEqual';

const NUTRIENT_CONF = [
    {
        key: 'calories',
        label: 'Calories',
        placeholder: 'Calories',
    },
    {
        key: 'protein',
        label: 'Protein per 100g',
        placeholder: 'Proteins',
    },
    {
        key: 'fat',
        label: 'Fat per 100g',
        placeholder: 'Fats',
    },
    {
        key: 'carbs',
        label: 'Carbs',
        placeholder: 'Carbs',
    },
]

export const createdBy = {
    user: 'user',
    admin: 'admin',
    ai: 'ai',
}

export function AddIngredientModal({isOpen, onClose, onCreated, predefinedValue = {}}) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    });

    useEffect(() => {
        if (!predefinedValue) return;

        const updated = {
            name: predefinedValue?.name || '',
            calories: predefinedValue?.calories || 0,
            protein: predefinedValue?.protein || 0,
            fat: predefinedValue?.fat || 0,
            carbs: predefinedValue?.carbs || 0,
        };

        setForm((prev) => (isEqual(prev, updated) ? prev : updated));
    }, [predefinedValue]);

    const handleChange = (field, value) => {
        setForm((prev) => ({...prev, [field]: value}));
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
                createdBy: createdBy.user
            });

            const ingredient = res.data;
            onCreated(ingredient);
            onClose();
            setForm({name: '', calories: '', protein: '', fat: '', carbs: ''});
        } catch (err) {
            alert(err?.response?.data?.message || 'Ошибка при создании ингредиента');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal scrollBehavior='outside' isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent>
                <ModalHeader>New Ingredient</ModalHeader>
                <ModalBody className="space-y-3">
                    <Input
                        isRequired
                        label="Name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {NUTRIENT_CONF.map(item => (
                        <NumberInput
                            key={item.key}
                            label={item.label}
                            placeholder={item.placeholder}
                            minValue={0}
                            onFocus={(e) => e.target.select()}
                            isRequired
                            value={form[item.key]}
                            onValueChange={(value) => handleChange(item.key, value)}
                        />
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        isDisabled={form.name.length === 0}
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
