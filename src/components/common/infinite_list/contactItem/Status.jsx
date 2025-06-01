import {Chip, Popover, PopoverTrigger} from "@heroui/react";
import {useState} from "react";

export const Status = ({status}) => {
    const [isOpen, setIsOpen] = useState(false);
    const statuses = {
        ok: "success",
        cancelled: "danger",
        inactive: "default",
    };

    const color = statuses[status];
    const hasError = status !== "ok";

    const handlePopoverToggle = (open) => {
        if (status !== "ok") setIsOpen(open);
    };

    return (
        <Popover
            classNames={{trigger: "z-0", content: "p-4"}}
            showArrow={true}
            isOpen={isOpen}
            onOpenChange={handlePopoverToggle}
        >
            <PopoverTrigger>
                <Chip
                    classNames={{
                        base: classNames(
                            hasError ? "cursor-pointer" : "cursor-default"
                        ),
                    }}
                    size={"sm"}
                    variant={"flat"}
                    onMouseEnter={() => handlePopoverToggle(true)}
                    onMouseLeave={() => handlePopoverToggle(false)}
                    color={color}
                >
                    {status}
                </Chip>
            </PopoverTrigger>
            {/* {hasError && (
                <PopoverContent>
                    <div className="flex flex-col">
                        <span>{lastError.message}</span>
                        <span>{lastError.code}</span>
                        <span>{lastError.type}</span>
                    </div>
                </PopoverContent>
            )} */}
        </Popover>
    );
};

