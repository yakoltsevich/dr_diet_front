'use client';

import {Button} from '@heroui/button';
import {RecipeModal} from "@/components/weekMenu/RecipeModal";
import {useState} from "react";

export const MealCard = ({title, icon, meal}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-md flex items-start gap-4">
                <div className="text-2xl">{icon}</div>
                <div className="flex-1 space-y-1">
                    <div className="text-lg font-semibold text-[#353535]">{title}</div>
                    <div className="text-sm text-[#353535]">{meal.dish}</div>
                    <div className="text-sm text-[#353535]">{meal.total.calories} ккал</div>
                </div>
                <Button size="sm" className="" onPress={() => setOpen(true)}>
                    Смотреть рецепт
                </Button>
            </div>
            <RecipeModal isOpen={open} onClose={() => setOpen(false)} title={meal.dish} recipe={meal.recipe}/>
        </>
    )
}
