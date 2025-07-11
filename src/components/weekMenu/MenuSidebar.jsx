'use client';

import {Tab, Tabs} from "@heroui/tabs";


export const MenuSidebar = ({menu = [], activeDay, setActiveDay}) => {
    const onSelectionChange = (value) => {
        setActiveDay(value)
    }

    const renderItem = (day) => {
        return (<Tab key={day.day - 1} title={`День ${day.day}`}/>)
    }
    return (
        <div className="hidden sm:block border-r border-[#e4d1c1] p-4 min-w-40  space-y-3">
            <h2 className="text-xl font-semibold  text-[#353535] pl-3">Week</h2>
                <Tabs
                    selectedKey={activeDay}
                    isVertical={true}
                    disallowEmptySelection
                    aria-label="Days list"
                    onSelectionChange={onSelectionChange}
                >
                    {menu.map(renderItem)}
                </Tabs>

        </div>
    );
};
