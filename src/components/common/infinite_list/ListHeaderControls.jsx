import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button, Switch, Tooltip} from "@heroui/react";
import {
    faBarcode,
    faCircle,
    faCirclePlus,
    faFilter,
    faPause,
    faPlay, faPlus,
    faRotate
} from "@fortawesome/free-solid-svg-icons";
import {Icon} from "@/components/common/Icon";

import {classNames} from "@/shared/classNames";
export const ListHeaderControls = ({
                                       highlightValue,
                                       setHighlightValue,
                                       onAutoupdateChange,
                                       refreshData,
                                       filterInUse,
                                       loading,
                                       setShowFilterEngine,
                                       showFilterEngine,
                                       logsRefreshEnabled,
                                       autoupdateEnabled,
                                   }) => {

    return (
        <div className='flex gap-2 items-center'>
            <Button isIconOnly
                    className={`h-7 min-h-7 w-7 min-w-7 bg-[#5e7a76] text-white shadow-lg`}
                    // onPress={refreshData}
            >
                <Icon
                    icon={faPlus}
                />
            </Button>

            <Button isIconOnly
                    className={`h-7 min-h-7 w-7 min-w-7 bg-[#5e7a76] text-white shadow-lg`}
                    // onPress={refreshData}
            >
                <Icon
                    icon={faBarcode}
                />
            </Button>

        </div>
    );
};
