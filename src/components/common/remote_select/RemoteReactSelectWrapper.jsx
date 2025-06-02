'use client'

import React, {useEffect, useState} from "react";
import {Skeleton} from "@heroui/react";
import {remoteSelectConfig} from "@/components/common/remote_select/config";
import {RemoteReactSelect} from "@/components/common/remote_select/RemoteReactSelect";
import {axiosClient} from "@/lib/axiosClient";

export const RemoteReactSelectWrapper = ({
                                             type = 'ingredient',
                                             isMulti,
                                             predefinedValue,
                                             label,
                                             onSelectionChange = () => {
                                             },
                                             ...restProps
                                         }) => {

    const [selectValue, setSelectValue] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const {route, embed, mainKey, formatterFn} = remoteSelectConfig[type];
    const limit = 10;

    // const fetchIngredients = async () => {
    //     setLoading(true);
    //
    //     try {
    //         const response = await axiosClient.get('/ingredients', {
    //             params: {
    //                 offset,
    //                 limit,
    //                 ...(search ? {name: search} : {}),
    //             },
    //         });
    //
    //         const {data, total} = response.data;
    //         setIngredients(data);
    //         setTotal(total);
    //     } catch (error) {
    //         console.error('Ошибка при загрузке ингредиентов:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const loadOptions = (inputValue, loadedOptions, {page}) => {
        return axiosClient.get('/ingredients', {
            params: {
                offset: page * limit,
                limit,
                ...(inputValue ? {name: inputValue} : {}),
            },
        })
            .then(({data}) => {
                const items = formatterFn(data.data);
                return {
                    options: items,
                    hasMore: items.length > 0,
                    additional: {
                        page: page + 1,
                    },
                };
            })
            .catch((error) => {
                console.error('Select error', error);
                return {
                    options: []
                };
            });
    };
    const onChangeSelection = (value) => {
        console.log('selectValue', value);
        setSelectValue(value)
        if (isMulti) {
            const idsArr = value.map(({[mainKey]: id}) => id);
            onSelectionChange(idsArr)
            return
        }
        onSelectionChange(value ? value[mainKey] : null)

    }

    return (
        <div className='w-full space-y-2 relative'>
            {label && <div className='text-xs'>{label}</div>}
            <RemoteReactSelect
                isSearchable={true}
                isMulti={isMulti}
                isRemote={true}
                withPagination={true}
                closeMenuOnSelect={!isMulti}
                value={selectValue}
                onChange={onChangeSelection}
                loadOptions={loadOptions}
                defaultMenuIsOpen={true}
                menuIsOpen={true}
                {...restProps}
            />
            {/*{*/}
            {/*    !isLoaded && <div*/}
            {/*        className={classNames(" absolute top-0 left-0 w-full items-center px-[2px] h-[32px] flex gap-1 rounded-lg", label && 'top-[16px]')}>*/}
            {/*        <Skeleton className="h-[28px] w-[200px] rounded-lg"/>*/}
            {/*        {isMulti && < Skeleton className="h-[28px] w-[170px] rounded-lg"/>}*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
};
