'use client';

import {useEffect, useState} from 'react';
import {Input} from '@heroui/input';
import {Select, SelectItem} from '@heroui/select';
import {Button} from '@heroui/button';
import {Card, CardBody} from '@heroui/card';
import {Icon} from '@/components/common/Icon';
import {faTrash, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {AddIngredientModal} from '@/components/ingredient/AddIngredientModal';
import {axiosClient} from '@/lib/axiosClient'; // путь подкорректируй при необходимости
import {useRouter} from 'next/navigation';
import {NumberInput} from "@heroui/react";
import {MEAL_TYPES_OPTIONS} from "@/shared/constants";

export default function AddMealPage() {
    const [name, setName] = useState('');
    const [type, setType] = useState('breakfast');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [ingredients, setIngredients] = useState([{ingredientId: '', weight: ''}]);
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        axiosClient.get('/ingredients')
            .then((res) => setAvailableIngredients(res.data))
            .catch((err) => console.error('Ошибка при загрузке ингредиентов', err));
    }, []);

    const updateIngredient = (index, field, value) => {
        const newList = [...ingredients];
        newList[index][field] = value;
        setIngredients(newList);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, {ingredientId: '', weight: ''}]);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name,
                type,
                date,
                ingredients: ingredients.map((i) => ({
                    ingredientId: parseInt(i.ingredientId),
                    weight: parseFloat(i.weight),
                })),
            };

            await axiosClient.post('/meals', payload);
            router.push('/diary'); // после создания перенаправляем обратно
        } catch (error) {
            alert(error?.response?.data?.message || 'Ошибка при сохранении приёма пищи');
        }
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
                        placeholder="Meal"
                    />

                    <Select
                        label="Meal Type"
                        selectedKeys={[type]}
                        onSelectionChange={(keys) => setType(Array.from(keys)[0])}
                    >
                        {MEAL_TYPES_OPTIONS.map((opt) => (
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
                                    {availableIngredients.map((ingr) => (
                                        <SelectItem key={ingr.id}>{ingr.name}</SelectItem>
                                    ))}
                                </Select>

                                <NumberInput
                                    className="w-32"
                                    label="Grams"
                                    minValue={0}
                                    value={ing.weight}
                                    onValueChange={(value) => updateIngredient(index, 'weight', value)}
                                />
                                <Button
                                    variant={'light'}
                                    className={'text-gray-700'}
                                    isIconOnly
                                    onPress={() => removeIngredient(index)}
                                >
                                    <Icon icon={faTrashCan}/>
                                </Button>
                            </div>
                        ))}

                        <div className="flex gap-2 flex-wrap">
                            <Button variant="outline" onPress={addIngredient}>
                                + Add Ingredient
                            </Button>
                            <Button variant="outline" onPress={() => setShowModal(true)}>
                                + New Ingredient
                            </Button>
                        </div>
                    </div>

                    <AddIngredientModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onCreated={(newIngredient) => {
                            // Добавляем в доступный список
                            setAvailableIngredients((prev) => [...prev, newIngredient]);

                            // Добавляем новую строку в форму с этим ингредиентом
                            setIngredients((prev) => [
                                ...prev,
                                {
                                    ingredientId: newIngredient.id.toString(),
                                    weight: '',
                                },
                            ]);
                        }}
                    />

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
