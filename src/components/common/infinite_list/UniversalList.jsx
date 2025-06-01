import {Button, Card, CardBody, CheckboxGroup, Chip, Spinner} from "@heroui/react";
import {GroupedVirtuoso, Virtuoso} from "react-virtuoso";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {ItemCheckboxWrapper} from "@/components/common/infinite_list/ItemCheckboxWrapper";
import {ListHeader} from "@/components/common/infinite_list/ListHeader";
import {Icon} from "@/components/common/Icon";

const START_PAGE = 0;
const REFRESH_TIMEOUT = 3000;

export const UniversalList = forwardRef(({listConfig}, ref) => {
    const {checkBoxEnabled, groupBy, FEProps, itemContent, refreshInterval} = listConfig || {};

    const [checkboxList, setCheckboxList] = useState([]);
    const [currentPage, setCurrentPage] = useState(START_PAGE);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [virtuosoOnTop, setVirtuosoOnTop] = useState(false);
    const [groupKeys, setGroupKeys] = useState([]);
    const [groupCounts, setGroupCounts] = useState([]);
    const [showFilterEngine, setShowFilterEngine] = useState(FEProps?.defaultOpen);
    const [filterInUse, setFilterInUse] = useState(FEProps?.predefinedValue);
    const [highlightValue, setHighlightValue] = useState('');
    const [listItems, setListItems] = useState([]);
    const [logsRefreshEnabled] = useState(!!refreshInterval);

    const intervalRef = useRef(null);
    const filtersTimeoutId = useRef(null);
    const virtuosoRef = useRef(null);

    useEffect(() => {
        if (!logsRefreshEnabled) {
            loadMore();
        }
        return () => stopInterval();
    }, []);

    useEffect(() => {
        if (virtuosoOnTop && logsRefreshEnabled) {
            stopInterval();
            startInterval();
        } else if (virtuosoOnTop && !logsRefreshEnabled) {
            getItemList({page: START_PAGE});
        } else {
            scrollToTop();
        }
    }, [JSON.stringify(filters)]);

    useImperativeHandle(ref, () => ({
        scrollToIndex,
    }));

    const loadMore = async () => {
        getItemList({page: currentPage + 1, mergeEntries: true});
    };

    const getItemList = ({page, mergeEntries}) => {
        setLoading(true);
        if (!listConfig?.requestData) return;

        // postSourceData({...listConfig?.requestData, ...filters, page})
        //     .then((res) => {
        //         if (!res.data.ok) return;
        //         const newListItems = res.data.items;
        //         const newEntries = mergeEntries ? [...listItems, ...newListItems] : newListItems;
        //         const {groupedItems, groupKeys, groupCounts} = groupByKey(newEntries);
        //         setListItems(groupedItems);
        //         setGroupKeys(groupKeys);
        //         setGroupCounts(groupCounts);
        //         setCurrentPage(page);
        //     })
        //     .finally(() => setLoading(false));
    };

    const itemContentHandler = (index, item) => {
        const actualItem = typeof item === 'number' ? listItems[index] : item;
        if (!actualItem) return null;

        const content = itemContent(index, actualItem, highlightValue);
        const checkboxValue = actualItem[listConfig?.mainKey];

        return (
            <ItemCheckboxWrapper checkBoxEnabled={checkBoxEnabled} checkboxValue={checkboxValue}>
                {content}
            </ItemCheckboxWrapper>
        );
    };

    const groupByKey = (items) => {
        const groups = {};

        if (groupBy?.key) {
            items.forEach((item) => {
                const date = item[groupBy.key]
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(item);
            });

            const groupKeys = Object.keys(groups);
            const groupedItems = groupKeys.flatMap((key) => groups[key]);
            const groupCounts = groupKeys.map((key) => groups[key].length);

            return {groupedItems, groupKeys, groupCounts};
        } else {
            return {groupedItems: items, groupKeys: [], groupCounts: []};
        }
    };

    const onChangeCheckboxList = (selectedIds) => {
        setCheckboxList(selectedIds);
    };

    const scrollToTop = () => {
        if (virtuosoRef.current) {
            virtuosoRef.current.scrollToIndex(0);
        }
    };

    const scrollToIndex = (index) => {
        if (virtuosoRef.current) {
            virtuosoRef.current.scrollToIndex(index);
        }
    };

    const onTopStateChange = (isOnTop) => {
        setVirtuosoOnTop(isOnTop);
        isOnTop && logsRefreshEnabled ? startInterval() : stopInterval();
    };

    const onFilterChange = (data) => {
        clearTimeout(filtersTimeoutId.current);
        filtersTimeoutId.current = setTimeout(() => {
            setFilters(data);
            FEProps?.onFilterChange?.(data);
            setFilterInUse(data);
        }, 300);
    };

    const renderGroup = (index) => {
        return (
            <div className="bg-gray-50 px-3 py-3 sm:px-6 flex justify-between flex-row items-center gap-1">
                {groupBy.title}: {groupKeys[index]}
                {groupBy.count && (
                    <Chip variant="flat" size="sm">
                        Count: {groupCounts[index]}
                    </Chip>
                )}
            </div>
        );
    };

    const renderFooter = () =>
        hasMore
            ? () => (
                <div className="p-1 flex justify-center">
                    <Spinner/>
                </div>
            )
            : null;

    const startInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        getItemList({page: START_PAGE});
        intervalRef.current = setInterval(() => {
            getItemList({page: START_PAGE});
        }, refreshInterval);
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const onBottomStateChange = (virtuosoOnBottom) => {
        if (!virtuosoOnTop && currentPage === START_PAGE && virtuosoOnBottom) {
            loadMore();
        }
    };

    const refreshData = () => {
        getItemList({page: START_PAGE});
        scrollToTop();
    };

    const commonProps = {
        ref: virtuosoRef,
        style: {
            flex: 1,
            position: "relative",
        },
        components: {
            Footer: renderFooter,
        },
        atBottomStateChange: onBottomStateChange,
        atTopStateChange: onTopStateChange,
        itemContent: itemContentHandler,
        endReached: loadMore,
    };

    return (
        <div className="space-y-4 relative flex h-full flex-1 flex-col gap-4">
            <Card
                shadow="none"
                classNames={{
                    base: "flex-1 h-full rounded-none sm:rounded-[14px] border",
                    body: "p-0",
                    header: "flex flex-row px-3 py-3 sm:px-6 border-b",
                }}
            >
                <ListHeader
                    checkBoxEnabled={checkBoxEnabled}
                    mainKey={listConfig?.mainKey}
                    checkboxList={checkboxList}
                    listHeaderControlsProps={{
                        filterInUse,
                        setShowFilterEngine,
                        showFilterEngine,
                        setHighlightValue,
                        highlightValue,
                        logsRefreshEnabled: true,
                    }}
                    onChangeCheckboxList={onChangeCheckboxList}
                    refreshData={refreshData}
                    listItems={listItems}
                    loading={loading}
                />
                <CardBody>
                    <CheckboxGroup
                        onChange={onChangeCheckboxList}
                        value={checkboxList}
                        classNames={{
                            base: "h-full w-full",
                            wrapper: "h-full gap-0 w-full",
                        }}
                    >
                        {groupBy ? (
                            <GroupedVirtuoso
                                groupContent={renderGroup}
                                groupCounts={groupCounts}
                                {...commonProps}
                            />
                        ) : (
                            <Virtuoso data={listItems} {...commonProps} />
                        )}
                        {!virtuosoOnTop && listConfig?.scrollToTop && (
                            <Button
                                className="absolute bottom-5 right-5 z-10 opacity-[.3] hover:opacity-75 active:opacity-75 rounded-full"
                                onPress={scrollToTop}
                                isIconOnly
                            >
                                <Icon icon={faArrowUp}/>
                            </Button>
                        )}
                    </CheckboxGroup>
                </CardBody>
            </Card>
        </div>
    );
});
