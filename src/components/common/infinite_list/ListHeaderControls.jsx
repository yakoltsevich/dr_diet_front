import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button, Switch, Tooltip} from "@heroui/react";
import {faFilter, faPause, faPlay, faRotate} from "@fortawesome/free-solid-svg-icons";
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
    const [animate, setAnimate] = useState(false);
    const timeoutId = useRef(null);

    useEffect(() => {
        clearTimeout(timeoutId.current)
        if (loading) {
            setAnimate(true);
        } else {
            timeoutId.current = setTimeout(() => setAnimate(false), 700);
        }
    }, [loading])

    const onShowFiltersClick = () => {
        setShowFilterEngine(!showFilterEngine);
    }

    return (
        <div className='flex gap-2 items-center'>
            <Button isIconOnly
                    className={`h-7 min-h-7 w-7 min-w-7`}
                    onPress={refreshData}>
                <Icon
                    className={classNames(animate && "spin")}
                    icon={faRotate}
                />
            </Button>
            <Badge color='danger' content={''} className='z-0' isInvisible={!filterInUse}>
                <Button isIconOnly
                        className='h-7 min-h-7 w-7 min-w-7'
                        onPress={onShowFiltersClick}>
                    <Icon icon={faFilter}/>
                </Button>
            </Badge>
            {/*<HighlighterInput value={highlightValue} onValueChange={setHighlightValue}/>*/}
            <div className='flex-1'/>
            {autoupdateEnabled && (
                <Tooltip content={`Autoupdate ${logsRefreshEnabled ? 'on' : 'off'}`}>
                    <Switch
                        isSelected={logsRefreshEnabled} onValueChange={onAutoupdateChange}
                        thumbIcon={!logsRefreshEnabled ? <Icon size='2xs' icon={faPause}/> :
                            <Icon size='2xs' transform={'right-1'} icon={faPlay}/>}
                        classNames={{
                            base: classNames(
                                "inline-flex flex-row-reverse  bg-content1 hover:bg-content2 items-center",
                                "cursor-pointer rounded-lg border-2 border-transparent  gap-2",
                            ),
                            wrapper: "p-0 h-3 overflow-visible",
                            thumb: classNames(
                                'z-0',
                                "w-6 h-6 border-2 shadow-lg",
                                "group-data-[hover=true]:border-primary",
                                "group-data-[selected=true]:border-primary",
                                //selected
                                "group-data-[selected=true]:ms-6",
                                // pressed
                                "group-data-[pressed=true]:w-7",
                                "group-data-[selected]:group-data-[pressed]:ms-4",
                            ),
                        }}
                    >
                    </Switch>
                </Tooltip>
            )}
        </div>
    );
};
