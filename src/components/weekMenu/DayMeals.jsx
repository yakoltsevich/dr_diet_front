'use client';

import { MealCard } from "@/components/weekMenu/MealCard";

export const DayMeals = ({ day }) => {
    console.log('DayMeals', day);
    if (!day) return null;

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold text-textColor mb-2">Day {day.day}</h2>
            <div className="text-primaryColor font-medium mb-4 flex gap-3">
                <div>{day.total.calories} kcal</div>
                <div>{day.total.protein}g protein</div>
                <div>{day.total.fat}g fat</div>
                <div>{day.total.carbs}g carbs</div>
            </div>
            <div className="flex flex-col gap-4">
                {day.meals?.map((meal) => (
                    <MealCard key={meal.title} {...meal} />
                ))}
            </div>
        </div>
    );
};
