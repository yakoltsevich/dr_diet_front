'use client';

import {Input} from '@heroui/input';
import {Checkbox} from '@heroui/react';
import {Button} from "@heroui/button";
import {Icon} from "@/components/common/Icon";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export const DateInputs = ({
                               dateFrom,
                               dateTo,
                               setDateFrom,
                               setDateTo,
                               rangeEnabled,
                               setRangeEnabled,
                               increaseDay,
                               decreaseDay,
                           }) => {
    return (
        <div className="flex items-center justify-center sm:justify-between w-full">
            <Button
                onPress={decreaseDay}
                className="hidden sm:flex bg-[#e4d1c1]/50 items-center justify-center p-2 rounded-full hover:bg-[#e4d1c1] transition"
                aria-label="Previous day"
                isIconOnly
            >
                <Icon size={'xl'} className="text-[#5e7a76] font-bold" icon={faChevronLeft}/>
            </Button>

            <div className="flex justify-center gap-2 w-full">
                <Input
                    type="date"
                    className="w-full sm:w-48"
                    value={dateFrom}
                    onValueChange={setDateFrom}
                />
                <Checkbox
                    classNames={{
                        base: 'baseAnchor m-0 p-0',
                        wrapper: 'wrapperAnchor m-0',
                    }}
                    isSelected={rangeEnabled}
                    onValueChange={setRangeEnabled}
                />
                <Input
                    type="date"
                    isDisabled={!rangeEnabled}
                    className="w-full sm:w-48"
                    value={rangeEnabled ? dateTo : ''}
                    onValueChange={setDateTo}
                />
            </div>

            <Button
                onPress={increaseDay}
                isIconOnly
                className="hidden sm:flex bg-[#e4d1c1]/50 items-center justify-center p-2 rounded-full hover:bg-[#e4d1c1] transition"
                aria-label="Next day"
            >
                <Icon size={'xl'} className="text-[#5e7a76]" icon={faChevronRight}/>
            </Button>
        </div>
    );
}
