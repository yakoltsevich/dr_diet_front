'use client';

import {useState} from 'react';
import {MenuSidebar} from "@/components/weekMenu/MenuSidebar";
import {DayMeals} from "@/components/weekMenu/DayMeals";
import {MenuSidebar2} from "@/components/weekMenu/MenuSidebar2";

export const WeekMenu = ({menu = []}) => {
    const [activeDay, setActiveDay] = useState('0');

    return (
        <div className="flex bg-lightColor rounded-lg overflow-hidden shadow-lg">
            <MenuSidebar2 menu={menu} activeDay={activeDay} setActiveDay={setActiveDay}/>
            <DayMeals day={menu[activeDay]}/>
        </div>
    );
}
