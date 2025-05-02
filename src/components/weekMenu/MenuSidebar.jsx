'use client';

import {Listbox, ListboxItem} from '@heroui/listbox';


export const MenuSidebar = ({menu = [], activeDay, setActiveDay}) => {
    console.log(menu);
    const onSelectionChange = ({currentKey}) => {
        console.log('onSelectionChange. ', currentKey);
        setActiveDay(currentKey)
    }

    const renderItem = (day) => {
        console.log('activeDay', activeDay);
        console.log('day.day', day.day);
        console.log(+activeDay + 1 === day.day);
        return (<ListboxItem key={day.day - 1}
                             color={"default"}
                             hideSelectedIcon={true}
                             classNames={{
                                 base: +activeDay + 1 === day.day ? '!bg-gray-300' : ''
                             }}>День {day.day}</ListboxItem>)
    }
    return (
        <div className="border-r border-[#e4d1c1] p-4 min-w-40  space-y-3">
            <h2 className="text-xl font-semibold  text-[#353535] pl-3">Неделя</h2>

            {/* Desktop Listbox */}
            <div className="">
                <Listbox

                    disallowEmptySelection
                    aria-label="Список дней"
                    // selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={onSelectionChange}

                    selectedKeys={new Set([activeDay])}
                >
                    {menu.map(renderItem)}
                </Listbox>
            </div>

        </div>
    );
};
