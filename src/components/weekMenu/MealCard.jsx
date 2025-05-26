'use client';

import { Button } from '@heroui/button';
import { RecipeModal } from "@/components/weekMenu/RecipeModal";
import { useState } from "react";
import {MEAL_TYPES} from "@/shared/constants";

export const MealCard = (meal) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1 space-y-1 text-sm text-textColor">
                    <div>{MEAL_TYPES[meal.type]}</div>
                    <div className="text-lg font-semibold">{meal.title}</div>
                    <div className="flex gap-2 text-primaryColor">
                        <div>{meal.calories} kcal</div>
                        <div>{meal.protein}g protein</div>
                        <div>{meal.fat}g fat</div>
                        <div>{meal.carbs}g carbs</div>
                    </div>
                </div>
                <Button size="sm" className="bg-primaryColor text-white" onPress={() => setOpen(true)}>
                    View Recipe
                </Button>
            </div>
            <RecipeModal isOpen={open} onClose={() => setOpen(false)} title={meal.dish} recipe={meal.recipe} />
        </>
    );
};
