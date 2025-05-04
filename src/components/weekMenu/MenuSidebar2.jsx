'use client';

import {Tab, Tabs} from "@heroui/tabs";


export const MenuSidebar2 = ({menu = [], activeDay, setActiveDay}) => {
    const onSelectionChange = (va) => {
        console.log('onSelectionChange. ', va);
        setActiveDay(va)
    }

    const renderItem = (day) => {
        return (<Tab key={day.day - 1} title={`День ${day.day}`}/>)
    }
    return (
        <div className="border-r border-[#e4d1c1] p-4 min-w-40  space-y-3">
            <h2 className="text-xl font-semibold  text-[#353535] pl-3">Неделя</h2>
                <Tabs
                    selectedKey={activeDay}
                    isVertical={true}
                    disallowEmptySelection
                    aria-label="Список дней"
                    onSelectionChange={onSelectionChange}
                >
                    {menu.map(renderItem)}
                </Tabs>

        </div>
    );
};
