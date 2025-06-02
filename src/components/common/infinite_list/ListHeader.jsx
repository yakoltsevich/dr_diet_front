import {CardHeader,} from "@heroui/react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Icon} from "@/components/common/Icon";
import {faBarcode, faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";


export const ListHeader = ({
                               search,
                               setSearch,
                           }) => {


    return (
        <CardHeader>
            <div className='flex items-center min-h-6 w-full justify-between gap-2'>
                <Input
                    placeholder="Поиск по названию"
                    value={search}
                    onValueChange={setSearch}
                    className="w-full sm:w-64"
                    autoComplete='off'
                    isClearable
                />
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
        </CardHeader>
    );
};
