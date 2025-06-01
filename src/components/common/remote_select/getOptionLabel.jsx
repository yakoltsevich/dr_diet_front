'use client'

import React from 'react';
import {Code} from "@heroui/react";
import {SelectLogo} from "@/components/common/remote_select/SelectLogo";
import {classNames} from "@/shared/classNames";

export const getOptionLabel = (item) => {
    return <div
        className={classNames("optionLabelAnchor flex items-center gap-2 w-full ", item.subtitle_slt ? ' h-[36px]' : ' h-[20px]')}>
        {item.logo_slt && (
            <SelectLogo {...item}/>
        )}
        <div className="flex flex-col items-start justify-center">
            <div className="truncate">{item.title_slt}</div>
            {item.subtitle_slt && <div className="text-xs text-gray-400 subtitleAnchor">{item.subtitle_slt}</div>}
        </div>

        <div className="flex-1"/>
        {item.pubId_slt ? <Code className={'py-[2px]'} size="sm">{item.pubId_slt}</Code> : null}
    </div>
}

