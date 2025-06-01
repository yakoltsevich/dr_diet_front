import {Badge, CardHeader, Checkbox,} from "@heroui/react";
import {ListHeaderControls} from "@/components/common/infinite_list/ListHeaderControls";


export const ListHeader = ({
                               mainKey,
                               checkboxList,
                               onChangeCheckboxList,
                               listItems,
                               listHeaderControlsProps,
                               loading,
                               refreshData,
                               checkBoxEnabled,
                           }) => {


    const isSelectAll =
        checkboxList.length === listItems.length &&
        checkboxList.length && listItems.length;

    const isIndeterminate = !isSelectAll && checkboxList.length;

    const selectAllItems = (isSelected) => {
        const selectedIds =
            isSelected && !isIndeterminate
                ? listItems.map((item) => item[mainKey])
                : [];

        onChangeCheckboxList(selectedIds);

        if (!isSelected || isIndeterminate) return;
        //
        // addToast({
        //     title: "info",
        //     description: `Selected ${selectedIds.length} booklets`,
        // });
    };

    return (
        <CardHeader>
            <div className='flex items-center min-h-6 w-full justify-between'>
                <div className='flex items-center gap-2'>
                    {checkBoxEnabled && (
                        <Badge color="danger"
                               size='sm'
                               classNames={{
                                   badge: 'translate-x-[unset] right-[unset] left-[55%]',
                               }}
                               isInvisible={!checkboxList.length}
                               content={checkboxList.length}
                               shape="rectangle">
                            <Checkbox
                                isSelected={isSelectAll}
                                isIndeterminate={isIndeterminate}
                                onValueChange={selectAllItems}
                            />
                        </Badge>
                    )}
                </div>

                <ListHeaderControls
                    loading={loading}
                    refreshData={refreshData}
                    {...listHeaderControlsProps}
                />
            </div>
        </CardHeader>
    );
};
