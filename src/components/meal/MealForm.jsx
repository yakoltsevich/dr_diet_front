'use client';

import {useEffect, useState} from 'react';
import {Input} from '@heroui/input';
import {Select, SelectItem} from '@heroui/select';
import {Button} from '@heroui/button';
import {Card, CardBody} from '@heroui/card';
import {Icon} from '@/components/common/Icon';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Autocomplete, AutocompleteItem, NumberInput} from "@heroui/react";
import {AddIngredientModal} from '@/components/ingredient/AddIngredientModal';
import {MEAL_TYPES_OPTIONS} from '@/shared/constants';
import {axiosClient} from "@/lib/axiosClient";

export default function MealForm({
                                     initialData,
                                     availableIngredients,
                                     refetchAvailableIngredients,
                                     onSubmit,
                                     isSubmitting = false,
                                     loading = false
                                 }) {
    const [name, setName] = useState(initialData?.name || '');
    const [type, setType] = useState(initialData?.type || 'breakfast');
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [mealIngredients, setMealIngredients] = useState(initialData?.ingredients || []);
    const [showModal, setShowModal] = useState(false);

    const updateIngredient = (index, field, value) => {
        console.log('updateIngredient', index, field, value);
        const newList = [...mealIngredients];
        newList[index][field] = value;
        setMealIngredients(newList);
    };

    const addIngredient = () => {
        setMealIngredients([...mealIngredients, {ingredientId: '', weight: ''}]);
    };

    const removeMealIngredient = (index) => {
        setMealIngredients(mealIngredients.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        onSubmit({
            name,
            type,
            date,
            ingredients: mealIngredients.map((i) => ({
                ingredientId: parseInt(i.ingredientId),
                weight: parseFloat(i.weight),
            })),
        });
    };

    const handleRemoveIngredient = async (id) => {
        const confirmed = confirm('Удалить этот ингредиент?');
        if (!confirmed) return;

        try {
            await axiosClient.delete(`/ingredients/${id}`);
            refetchAvailableIngredients();
        } catch (err) {
            alert(err?.response?.data?.message || 'Ошибка при удалении');
        }
    };

    if (loading) {
        return <p className="text-center text-muted-foreground">Загрузка ингредиентов...</p>;
    }
    console.log('mealIngredients', mealIngredients);
    console.log('availableIngredients', availableIngredients);
    console.log('refetchAvailableIngredients', refetchAvailableIngredients);
    return (
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

                    {mealIngredients.map((ing, index) => {
                        return (
                            <div key={index} className="flex items-center gap-1">
                                <Autocomplete
                                    className="w-full"
                                    label="Ingredient"
                                    selectedKey={String(ing.ingredientId)}
                                    onSelectionChange={(key) => {
                                        console.log('keys', key);
                                        if (key) {
                                            updateIngredient(index, 'ingredientId', key)
                                        }
                                    }}
                                >
                                    {availableIngredients.map((ingr) => (
                                        <AutocompleteItem
                                            hideSelectedIcon
                                            key={ingr.id}
                                            endContent={<Button
                                                variant="light"
                                                className="text-gray-700 w-5 min-w-5"
                                                isIconOnly
                                                onPress={() => handleRemoveIngredient(ingr.id)}
                                            >
                                                <Icon icon={faTrashCan}/>
                                            </Button>}
                                        >{ingr.name}</AutocompleteItem>
                                    ))}
                                </Autocomplete>

                                   <NumberInput
                                       className="w-32 min-w-16"
                                       label="Grams"
                                       minValue={0}
                                       value={ing.weight}
                                       onValueChange={(value) => updateIngredient(index, 'weight', value)}
                                   />

                                   <Button
                                       variant="light"
                                       className="text-gray-700 w-5 min-w-5"
                                       isIconOnly
                                       onPress={() => removeMealIngredient(index)}
                                   >
                                       <Icon icon={faTrashCan}/>
                                   </Button>
                            </div>
                        )
                    })}

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
                        setMealIngredients((prev) => [
                            ...prev,
                            {ingredientId: newIngredient.id.toString(), weight: ''},
                        ]);
                        refetchAvailableIngredients()
                    }}
                />

                <Button
                    className="w-full bg-[#5e7a76] text-white rounded-2xl shadow-md hover:bg-[#4d6965]"
                    onPress={handleSubmit}
                    isDisabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Meal'}
                </Button>
            </CardBody>
        </Card>
    );
}
