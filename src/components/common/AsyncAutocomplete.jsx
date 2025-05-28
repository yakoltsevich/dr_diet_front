import React, {useState} from "react";
import {Autocomplete, AutocompleteItem, Chip} from "@heroui/react";
import {useInfiniteScroll} from "@heroui/use-infinite-scroll";
import {useIngredients} from "@/hooks/useIngredients";


export const AsyncAutocomplete = ({itemProps, ...restProps}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const {
        ingredients: items,
        loading: isLoading,
        fetchNextPage: onLoadMore,
        hasNextPage: hasMore,
    } = useIngredients(inputValue);

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore,
    });
console.log('1331 selectedKey', restProps.selectedKey)
console.log('1331 items', items)
    return (
        <Autocomplete
            items={items}
            inputValue={inputValue}
            onInputChange={setInputValue}
            isLoading={isLoading}
            scrollRef={scrollerRef}
            itemHeight={52}
            selectedKey={restProps.selectedKey}
            onOpenChange={setIsOpen}
            {...restProps}
        >
            {(ingr) => (
                <AutocompleteItem
                    hideSelectedIcon
                    key={ingr.id}
                    {...itemProps}
                >
                    <div className='flex max-w-full flex-col items-start justify-center'>
                        <div className='max-w-48 truncate'>{ingr.name} {ingr.id}</div>
                        <div className=' w-full flex items-center justify-between text-xs'>
                            <Chip size='sm'
                                  color='secondary'
                                  className="h-4 px-0 uppercase">{ingr.createdBy}</Chip>
                            <div className='space-x-1 text-xs'>
                                <Chip size='sm'
                                      className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">{ingr.calories.toFixed(0)}</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">{ingr.protein.toFixed(0)}</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">{ingr.fat.toFixed(0)}</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">{ingr.carbs.toFixed(0)}</Chip>
                            </div>
                        </div>
                    </div>
                    {/*{ingr.name}*/}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}
