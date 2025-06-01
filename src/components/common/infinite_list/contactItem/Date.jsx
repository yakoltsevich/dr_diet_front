import {Chip, Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import {useState} from "react";

import {classNames} from "@/shared/classNames";
const TooltipContent = ({timestamp}) => {
    const activity = [
        {
            id: 1,
            name: "Timestamp",
            date: timestamp,
        },
    ];

    return (
        <ul className="space-y-4">
            {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id} className="relative flex gap-x-4">
                    <div
                        className={classNames(
                            activityItemIdx === activity.length - 1
                                ? "h-6"
                                : "-bottom-6",
                            "absolute left-0 top-0 flex w-6 justify-center"
                        )}
                    >
                        <div className="w-px bg-gray-200"/>
                    </div>

                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                        <div
                            className={classNames(
                                "bg-gray-100 ring-gray-300",
                                "h-1.5 w-1.5 rounded-full  ring-1 ring-gray-300"
                            )}
                        />
                    </div>
                    <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                            {activityItem.name}
                        </span>
                    </p>
                    <time
                        dateTime={activityItem.dateTime}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                        {activityItem.date}
                    </time>
                </li>
            ))}
        </ul>
    );
};

export const Date = ({timestamp}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Popover
            classNames={{trigger: "z-0", content: "p-4"}}
            showArrow={false}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        >
            <PopoverTrigger>
                <Chip
                    classNames={{
                        base: classNames("cursor-pointer", "flex gap-1"),
                    }}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    size={"sm"}
                    radius={"sm"}
                    variant={"flat"}
                >
                    adasdasdas
                </Chip>
            </PopoverTrigger>
            <PopoverContent>
                <TooltipContent timestamp={timestamp}/>
            </PopoverContent>
        </Popover>
    );
};

