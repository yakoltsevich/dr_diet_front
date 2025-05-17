'use client';

import { useState } from 'react';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Icon } from '@/components/common/Icon';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MOCK_INGREDIENTS = [
    { id: 1, name: 'Овсянка' },
    { id: 2, name: 'Яйцо' },
    { id: 3, name: 'Авокадо' },
];

const MEAL_TYPES = [
    { value: 'breakfast', label: 'Завтрак' },
    { value: 'lunch', label: 'Обед' },
    { value: 'dinner', label: 'Ужин' },
    { value: 'snack', label: 'Перекус' },
    { value: 'afternoon_snack', label: 'Полдник' },
];

export default function AddMealPage() {
    const [name, setName] = useState('');
    const [type, setType] = useState('breakfast');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [ingredients, setIngredients] = useState([
        { ingredientId: '', weight: '' },
    ]);

    const updateIngredient = (index, field, value) => {
        const newList = [...ingredients];
        newList[index][field] = value;
        setIngredients(newList);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { ingredientId: '', weight: '' }]);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        const payload = {
            name,
            type,
            date,
            ingredients: ingredients.map((i) => ({
                ingredientId: parseInt(i.ingredientId),
                weight: parseFloat(i.weight),
            })),
        };
        console.log('submit payload:', payload);
        // TODO: call API (POST /meals)
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center text-[#353535]">Add Meal</h1>

            <Card>
                <CardBody className="space-y-4">
                    <Input
                        label="Meal Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Завтрак"
                    />

                    <Select
                        label="Meal Type"
                        selectedKeys={[type]}
                        onSelectionChange={(keys) => setType(Array.from(keys)[0])}
                    >
                        {MEAL_TYPES.map((opt) => (
                            <SelectItem key={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </Select>

                    <Input
                        type="date"
                        label="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm">Ingredients</h3>

                        {ingredients.map((ing, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Select
                                    className="w-full"
                                    label="Ingredient"
                                    selectedKeys={[ing.ingredientId.toString()]}
                                    onSelectionChange={(keys) =>
                                        updateIngredient(index, 'ingredientId', Array.from(keys)[0])
                                    }
                                >
                                    {MOCK_INGREDIENTS.map((ingr) => (
                                        <SelectItem key={ingr.id}>{ingr.name}</SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    type="number"
                                    className="w-32"
                                    label="Grams"
                                    value={ing.weight}
                                    onChange={(e) => updateIngredient(index, 'weight', e.target.value)}
                                />

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onPress={() => removeIngredient(index)}
                                >
                                    <Icon icon={faTrash} className="text-red-500" />
                                </Button>
                            </div>
                        ))}

                        <Button variant="outline" onPress={addIngredient}>
                            + Add Ingredient
                        </Button>
                    </div>

                    <Button
                        className="w-full bg-[#5e7a76] text-white rounded-2xl shadow-md hover:bg-[#4d6965]"
                        onPress={handleSubmit}
                    >
                        Save Meal
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
