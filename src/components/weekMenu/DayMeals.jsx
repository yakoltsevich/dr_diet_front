'use client';

import {MealCard} from "@/components/weekMenu/MealCard";

export const DayMeals = ({day}) => {
    if (!day) return null;
    const meals = [
        {title: 'Завтрак', data: day.breakfast, icon: '🍳'},
        {title: 'Обед', data: day.lunch, icon: '🍗'},
        {title: 'Ужин', data: day.dinner, icon: '🐟'},
    ];

    return (
        <div className='w-full  p-4 '>
            <h2 className="text-2xl font-bold text-[#353535] mb-2">День {day.day}</h2>
            <div className="text-[#5e7a76] font-medium mb-4 flex gap-3">
                <div>{day.total.calories} ккал</div>
                <div>{day.total.protein}г белка</div>
                <div>{day.total.fat}г жиры</div>
                <div>{day.total.carbs}г углеводы</div>
            </div>
            <div className="flex flex-col gap-4">
                {meals.map((meal) => (
                    <MealCard key={meal.title} title={meal.title} icon={meal.icon} meal={meal.data}/>
                ))}
            </div>
        </div>
    );
}
