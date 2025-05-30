'use client';

import {Input} from '@heroui/input';
import {Checkbox} from '@heroui/react';

export const DateInputs = ({dateFrom, dateTo, setDateFrom, setDateTo, rangeEnabled, setRangeEnabled}) => {
    return (
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
    );
}
