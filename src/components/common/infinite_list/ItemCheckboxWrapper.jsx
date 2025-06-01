import {Checkbox} from "@heroui/react";

export const ItemCheckboxWrapper = ({checkBoxEnabled, checkboxValue, children}) => {
    return (
        <div
            className={"flex  flex-row  border-b px-3 py-3 sm:px-6 text-sm items-center gap-x-2 hover:bg-gray-50 transition ease-in-out duration-300"}
        >
            {checkBoxEnabled && (<Checkbox value={checkboxValue}/>)}
            {children}
        </div>
    );
};
