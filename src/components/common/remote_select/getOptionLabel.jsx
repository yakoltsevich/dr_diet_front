'use client'

import React from 'react';
import {Chip} from "@heroui/react";
import {classNames} from "@/shared/classNames";

const ss = {
    "id": 2,
    "name": "Gouda cheese",
    "calories": 356,
    "protein": 25,
    "fat": 27,
    "carbs": 2.2,
    "createdBy": "ai",
    "value": 2
}
export const getOptionLabel = (item) => {
    console.log("getOptionLabel", item);
    return <div
        className={classNames("optionLabelAnchor flex items-center gap-2  w-full  h-[36px]")}>
        {/*{item.logo_slt && (*/}
        {/*    <SelectLogo {...item}/>*/}
        {/*)}*/}
        <div className="flex flex-col items-start justify-center w-full">
            <div className="truncate">{item.name}</div>
            <div className='flex items-center justify-between w-full'>
                <Chip className={'h-4 '} size="sm">{item.createdBy}</Chip>
                <div className='space-x-2'>
                    <Chip size='sm'
                          className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">{item.calories} ккал</Chip>
                    <Chip size='sm'
                          className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">Б {item.protein}</Chip>
                    <Chip size='sm'
                          className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">Ж {item.fat}</Chip>
                    <Chip size='sm'
                          className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">У {item.carbs}</Chip>
                </div>
            </div>
        </div>

    </div>
}

