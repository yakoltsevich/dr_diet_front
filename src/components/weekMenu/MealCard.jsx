'use client';

import {Button} from '@heroui/button';
import {RecipeModal} from "@/components/weekMenu/RecipeModal";
import {useState} from "react";

export const MealCard = (meal) => {
    console.log('MealCard,',meal)
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-md flex items-start gap-4">
                <div className="flex-1 space-y-1 text-sm text-textColor">
                    <div className="">{meal.type}</div>
                    <div className="text-lg font-semibold">{meal.title}</div>
                    <div className='flex gap-2 text-primaryColor'>
                        <div>{meal.calories} ккал</div>
                        <div>{meal.proteins}г белка</div>
                        <div>{meal.fats}г жиры</div>
                        <div>{meal.carbs}г углеводы</div>
                    </div>

                </div>
                <Button size="sm" className="bg-primaryColor text-white" onPress={() => setOpen(true)}>
                    Рецепт
                </Button>
            </div>
            <RecipeModal isOpen={open} onClose={() => setOpen(false)} title={meal.dish} recipe={meal.recipe}/>
        </>
    )
}
