'use client';

import {useState} from 'react';
import {DayMeals} from "@/components/weekMenu/DayMeals";
import {MenuSidebar} from "@/components/weekMenu/MenuSidebar";

export const WeekMenu = ({menu = []}) => {
    const [activeDay, setActiveDay] = useState('0');

    return (
        <div className="flex bg-lightColor rounded-lg overflow-hidden shadow-lg">
            <MenuSidebar menu={menu} activeDay={activeDay} setActiveDay={setActiveDay}/>
            <DayMeals day={menu[activeDay]}/>
        </div>
    );
}
