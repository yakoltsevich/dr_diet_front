'use client';

import {MealCard} from "@/components/weekMenu/MealCard";
import {Select, SelectItem} from "@heroui/select";

export const DAYS = [
    {key: "0", label: "Day 1"},
    {key: "1", label: "Day 2"},
    {key: "2", label: "Day 3"},
    {key: "3", label: "Day 4"},
    {key: "4", label: "Day 5"},
    {key: "5", label: "Day 6"},
    {key: "6", label: "Day 7"},
];
const SelectDay = ({activeDay, setActiveDay}) => {
    const onSelectionChange = (v)=>{
        console.log('v', v);
        setActiveDay(Array.from(v)[0])
    }
    return <Select
        className="max-w-full py-2 sm:hidden"
        placeholder="Select an day"
        selectedKeys={new Set(activeDay)}
        variant="faded"
        onSelectionChange={onSelectionChange}
    >
        {DAYS.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
    </Select>
}
export const DayMeals = ({day, activeDay, setActiveDay}) => {
    if (!day) return null;

    return (
        <div className="w-full p-4">
            <h2 className="hidden sm:block text-2xl font-bold text-textColor mb-2">Day {day.day}</h2>
            <SelectDay setActiveDay={setActiveDay} activeDay={activeDay}/>
            {day.total && (
                <div className="text-primaryColor font-medium mb-4 flex gap-3">
                    <div>{day.total.calories} kcal</div>
                    <div>{day.total.protein}g protein</div>
                    <div>{day.total.fat}g fat</div>
                    <div>{day.total.carbs}g carbs</div>
                </div>
            )}
            <div className="flex flex-col gap-4">
                {day.meals?.map((meal) => (
                    <MealCard key={meal.title} {...meal} />
                ))}
            </div>
        </div>
    );
};
