'use client'

import * as React from 'react';
import {Avatar} from "@heroui/react";
import {Icon} from "@/components/common/Icon";

import {classNames} from "@/shared/classNames";
export const SelectLogo = (item) => {
    const {title_slt, logo_slt} = item
    return (
        <div className={classNames("flex items-center flex-nowrap gap-1", logo_slt.logoClass)}>
            <Avatar
                icon={
                    logo_slt.icon &&
                    <Icon
                        className={`w-4 h-4 text-lg text-default-500 ${logo_slt.iconClass}`}
                        icon={logo_slt.icon}
                        fill="currentColor"
                        size={'2x'}
                    />
                }
                name={!logo_slt.icon && title_slt && title_slt[0]}
                color={logo_slt.tagColor}
                alt={title_slt}
                size="sm"
                className="w-4 h-4 flex-shrink-0 flex items-center justify-center"
                src={logo_slt.imageSrc}
            />
        </div>
    );
};

