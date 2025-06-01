import {Chip, Snippet} from "@heroui/react";
import {Status} from "@/components/common/infinite_list/contactItem/Status";
import {ItemDropdownMenu} from "@/components/common/infinite_list/contactItem/ItemDropdownMenu";

export const ContactItem = ({item}) => {

    return (
        <>
            <div className="flex flex-1 flex-col items-start justify-between">
                <div className="flex flex-1 flex-col gap-2 ">
                    <span className="text-nowrap">{item.name}</span>
                    {item.status && (
                        <div className="flex items-center flex-row gap-2">
                            <Status {...item} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col  items-end gap-y-3 justify-between">
                <div className="flex flex-row items-center gap-x-2">
                    <Chip
                        classNames={{
                            base: classNames("cursor-pointer", "flex gap-1"),
                        }}
                        size={"sm"}
                        radius={"sm"}
                        variant={"flat"}
                    >
                        asdasdsads
                    </Chip>
                    <ItemDropdownMenu {...item} />
                </div>

                <Snippet
                    disableTooltip
                    hideSymbol
                    variant={"flat"}
                    classNames={{copyButton: 'h-4 w-4 z-0', pre: 'text-sm', base: 'p-0 pl-1 gap-0'}}
                    size="sm"
                >
                    {item.pubId}
                </Snippet>
            </div>
        </>
    );
};
