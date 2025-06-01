'use client'

import React, {useMemo} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {AsyncPaginate} from 'react-select-async-paginate';
import {reactSelectClassNames, reactSelectTheme} from "@/components/common/remote_select/config";
import {getOptionLabel} from "@/components/common/remote_select/getOptionLabel";
import {useScreenWidth} from "@/hooks/useScreenWidth";
import {useScreenHeight} from "@/hooks/useScreenHeight";


export const RemoteReactSelect = ({
                                      isRemote,
                                      startPage = 0,
                                      withPagination,
                                      optionLabel = getOptionLabel,
                                      theme = reactSelectTheme,
                                      customClassNames = {},
                                      minMenuHeight,
                                      maxMenuHeight,
                                      onMenuOpen,
                                      onMenuClose,
                                      ...restProps
                                  }) => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    // const screenWidth = useScreenWidth();
    // const screenHeight = useScreenHeight();

    const SelectComponent = isRemote ? withPagination ? AsyncPaginate : AsyncSelect : Select;
    const classNames = useMemo(() => reactSelectClassNames({
        menuIsOpen,
        customClassNames
    }), [menuIsOpen, customClassNames])

    const menuOpenEvent = () => {
        setMenuIsOpen(true);
        onMenuOpen && onMenuOpen()
    }
    const menuCloseEvent = () => {
        setMenuIsOpen(false);
        onMenuClose && onMenuClose()
    }

    // const minMenuHeightDef = screenWidth > 639 ? 300 : 150
    // const maxMenuHeightDef = screenWidth > 639 ? 300 : screenHeight * 0.45
    return (
        <SelectComponent
            // minMenuHeight={minMenuHeight || minMenuHeightDef}
            // maxMenuHeight={maxMenuHeight || maxMenuHeightDef}
            onMenuOpen={menuOpenEvent}
            onMenuClose={menuCloseEvent}
            cacheOptions={isRemote}
            classNamePrefix="custom-select"
            classNames={classNames}
            theme={theme}
            additional={{
                page: startPage,
            }}
            defaultOptions
            getOptionLabel={optionLabel}
            {...restProps}
        />
    );
};
