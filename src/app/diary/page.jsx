'use client';

import {useState} from 'react';
import {Card, CardBody} from '@heroui/card';
import {Button} from '@heroui/button';

import {Icon} from "@/components/common/Icon";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const mockMeals = [
    {
        id: 1,
        name: 'Завтрак',
        type: 'breakfast',
        ingredients: [
            {
                ingredient: {name: 'Овсянка', calories: 350, protein: 12, fat: 5, carbs: 60},
                weight: 100,
            },
        ],
    },
    {
        id: 2,
        name: 'Обед',
        type: 'lunch',
        ingredients: [
            {
                ingredient: {name: 'Куриная грудка', calories: 165, protein: 31, fat: 3, carbs: 0},
                weight: 200,
            },
            {
                ingredient: {name: 'Рис', calories: 230, protein: 5, fat: 2, carbs: 50},
                weight: 150,
            },
        ],
    },
];

export default function NutritionDiaryPage() {
    const [meals, setMeals] = useState(mockMeals);

    const getTotal = () => {
        return meals.reduce(
            (acc, meal) => {
                meal.ingredients.forEach(({ingredient, weight}) => {
                    const ratio = weight / 100;
                    acc.calories += ingredient.calories * ratio;
                    acc.protein += ingredient.protein * ratio;
                    acc.fat += ingredient.fat * ratio;
                    acc.carbs += ingredient.carbs * ratio;
                });
                return acc;
            },
            {calories: 0, protein: 0, fat: 0, carbs: 0}
        );
    };

    const totals = getTotal();

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center text-[#353535]">Nutrition Diary</h1>
            <p className="text-center text-sm text-muted-foreground">Friday, May 16</p>

            <div className="space-y-4">
                {meals.map((meal) => (
                    <Card key={meal.id}>
                        <CardBody className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold text-lg">{meal.name}</h2>
                                <Button isIconOnly size="icon" variant="ghost">
                                    <Icon icon={faTrash}/>
                                </Button>
                            </div>
                            <ul className="space-y-1">
                                {meal.ingredients.map(({ingredient, weight}, idx) => {
                                    const ratio = weight / 100;
                                    return (
                                        <li key={idx} className="text-sm text-muted-foreground">
                                            {weight} г {ingredient.name} —{' '}
                                            {(ingredient.calories * ratio).toFixed(0)} ккал ·{' '}
                                            {(ingredient.protein * ratio).toFixed(0)}г Б ·{' '}
                                            {(ingredient.fat * ratio).toFixed(0)}г Ж ·{' '}
                                            {(ingredient.carbs * ratio).toFixed(0)}г У
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="bg-[#f3f3f2] rounded-xl p-4 text-sm text-center shadow-inner text-[#353535]">
                <strong>Total:</strong> {totals.calories.toFixed(0)} ккал ·{' '}
                {totals.protein.toFixed(0)}г Б · {totals.fat.toFixed(0)}г Ж ·{' '}
                {totals.carbs.toFixed(0)}г У
            </div>

            <Button className="w-full bg-[#5e7a76] text-white rounded-2xl shadow-lg hover:bg-[#4d6965]">
                Add Meal
            </Button>
        </div>
    );
}
