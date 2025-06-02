'use client';

import React, {useEffect, useState} from 'react';
import {Input} from '@heroui/input';
import {Select, SelectItem} from '@heroui/select';
import {Button} from '@heroui/button';
import {Card, CardBody} from '@heroui/card';
import {Icon} from '@/components/common/Icon';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Autocomplete, AutocompleteItem, Chip, NumberInput} from "@heroui/react";
import {AddIngredientModal} from '@/components/ingredient/AddIngredientModal';
import {MEAL_TYPES_OPTIONS} from '@/shared/constants';
import {axiosClient} from "@/lib/axiosClient";
import {AsyncAutocomplete} from "@/components/common/AsyncAutocomplete";

export default function MealForm({
                                     initialData,
                                     ingredientsQuery,
                                     onSubmit,
                                     isSubmitting = false,
                                 }) {
    const {loading, refetch: refetchAvailableIngredients, ingredients: availableIngredients} = ingredientsQuery
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
                    {/*{mealIngredients.map((ing, index) => {*/}
                    {/*    console.log('ingredient', ing);*/}
                    {/*    return (*/}
                    {/*        <div key={index} className="flex items-center gap-1">*/}
                    {/*            <AsyncAutocomplete*/}
                    {/*                className="w-full"*/}
                    {/*                label="Ingredient"*/}
                    {/*                selectedKey={'7'}*/}
                    {/*                onSelectionChange={(key) => {*/}
                    {/*                    console.log('keys', key);*/}
                    {/*                    if (key) {*/}
                    {/*                        updateIngredient(index, 'ingredientId', key)*/}
                    {/*                    }*/}
                    {/*                }}*/}
                    {/*                itemProps={{*/}
                    {/*                    handleRemoveIngredient: handleRemoveIngredient,*/}
                    {/*                    placeholder: "Enter employee name",*/}
                    {/*                }}*/}
                    {/*            />*/}

                    {/*            <NumberInput*/}
                    {/*                className="w-32 min-w-16"*/}
                    {/*                label="Grams"*/}
                    {/*                minValue={0}*/}
                    {/*                value={ing.weight}*/}
                    {/*                onValueChange={(value) => updateIngredient(index, 'weight', value)}*/}
                    {/*            />*/}

                    {/*            <Button*/}
                    {/*                variant="light"*/}
                    {/*                className="text-gray-700 w-5 min-w-5"*/}
                    {/*                isIconOnly*/}
                    {/*                onPress={() => removeMealIngredient(index)}*/}
                    {/*            >*/}
                    {/*                <Icon icon={faTrashCan}/>*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}


                    {mealIngredients.map((ing, index) => {
                        console.log('ingredient', ing);
                        return (
                            <div key={index} className="flex items-center gap-1">
                                <Autocomplete
                                    className="w-full"
                                    label="Ingredient"
                                    listboxProps={{
                                        hideSelectedIcon: true,
                                        itemClasses: {
                                            base: [
                                                "rounded-medium",
                                                "text-default-500",
                                                "transition-opacity",
                                                "data-[hover=true]:text-foreground",
                                                "dark:data-[hover=true]:bg-default-50",
                                                "data-[pressed=true]:opacity-70",
                                                "data-[hover=true]:bg-default-200",
                                                "data-[selectable=true]:focus:bg-default-100",
                                                "data-[focus-visible=true]:ring-default-500",
                                            ],
                                        },
                                    }}
                                    popoverProps={{
                                        offset: 10,
                                        classNames: {
                                            base: "rounded-large",
                                            content: "p-1 border-small border-default-100 bg-background",
                                        },
                                    }}
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
                                            placeholder="Enter employee name"
                                            endContent={<Chip className={'h-4 '} size="sm">{ingr.createdBy}</Chip>}
                                        >
                                            {/*<div className='flex flex-col items-start justify-center'>*/}
                                            {/*    <div>{ingr.name}</div>*/}
                                            {/*    <div className='space-x-2'>*/}
                                            {/*        <Chip size='sm'*/}
                                            {/*              className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">{ingr.calories.toFixed(0)} ккал</Chip>*/}
                                            {/*        <Chip size='sm'*/}
                                            {/*              className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">Б {ingr.protein.toFixed(0)}</Chip>*/}
                                            {/*        <Chip size='sm'*/}
                                            {/*              className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">Ж {ingr.fat.toFixed(0)}</Chip>*/}
                                            {/*        <Chip size='sm'*/}
                                            {/*              className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">У {ingr.carbs.toFixed(0)}</Chip>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {ingr.name}
                                        </AutocompleteItem>
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
    )
        ;
}
