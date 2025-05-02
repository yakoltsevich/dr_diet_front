'use client';

import {useState} from 'react';
import {MenuSidebar} from "@/components/weekMenu/MenuSidebar";
import {DayMeals} from "@/components/weekMenu/DayMeals";

const weekdays = ['День 1', 'День 2', 'День 3', 'День 4', 'День 5', 'День 6', 'День 7'];

export const WeekMenu = ({menu = []}) => {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <div className="flex flex-col sm:flex-row bg-[#f3f3f2] rounded-lg overflow-hidden shadow-lg">
            <MenuSidebar menu={menu} activeDay={activeDay} setActiveDay={setActiveDay}/>

            <DayMeals day={menu[activeDay]}/>
        </div>
    );
}
