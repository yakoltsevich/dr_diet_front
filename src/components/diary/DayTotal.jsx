'use client';

import {Chip} from '@heroui/react';

export const DayTotal = ({meals}) => {

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
        <div className="bg-[#f3f3f2] rounded-xl p-4 text-sm text-center shadow-inner text-[#353535]">
            <div className='space-x-1'>
                <strong>Total:</strong>
                <Chip size='sm'
                      className="text-md  bg-[#d6d6d6] text-[#353535]">{totals.calories.toFixed(0)} ккал</Chip>
                <Chip size='sm'
                      className="text-md bg-[#d9e0dd] text-[#354e49]">Б {totals.protein.toFixed(0)}</Chip>
                <Chip size='sm'
                      className="text-md  bg-[#f1e8e0] text-[#6d5a48]">Ж {totals.fat.toFixed(0)}</Chip>
                <Chip size='sm'
                      className="text-md bg-[#e1eaea] text-[#4e5e5e]">У {totals.carbs.toFixed(0)}</Chip>
            </div>
        </div>

    );
}
