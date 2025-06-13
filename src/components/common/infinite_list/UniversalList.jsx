import {Button, CardHeader, CheckboxGroup, Chip, Spinner} from "@heroui/react";
import {Virtuoso} from "react-virtuoso";
import React, {useEffect, useRef, useState} from "react";
import {faBarcode, faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Icon} from "@/components/common/Icon";
import {ItemCheckboxWrapper} from "@/components/common/infinite_list/ItemCheckboxWrapper";
import {axiosClient} from "@/lib/axiosClient";
import {Input} from "@heroui/input";
import {AddIngredientModal} from "@/components/ingredient/AddIngredientModal";
import {Card, CardBody} from "@heroui/card";

const START_PAGE = 0;
export const UniversalList = () => {
    const [currentPage, setCurrentPage] = useState(START_PAGE);
    const [hasMore, setHasMore] = useState(false);
    const virtuosoRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [showScanModal, setShowScanModal] = useState(false);

    const [ingredients, setIngredients] = useState([]);
    const [search, setSearch] = useState('');
    const limit = 50;

    useEffect(() => {
        getItemList({page: START_PAGE, mergeEntries: true});
    }, []);

    useEffect(() => {
        setIngredients([]);
        setCurrentPage(START_PAGE);
        getItemList({page: START_PAGE});
    }, [search]);

    const loadMore = async () => {
        getItemList({page: currentPage + 1, mergeEntries: true});
    };

    const getItemList = ({page, mergeEntries}) => {
        axiosClient.get('/ingredients', {
            params: {
                offset: limit * page,
                limit,
                ...(search ? {name: search} : {}),
            },
        })
            .then(response => {
                const {hasMore, data, total} = response.data;

                const newEntries = mergeEntries ? [...ingredients, ...data] : data;
                setIngredients(newEntries);
                setCurrentPage(page)
                setHasMore(hasMore)
            })
            .catch(error => {
                console.error('Ошибка при загрузке ингредиентов:', error);
            })
    };

    const remove = async (id) => {
        await axiosClient.delete(`/ingredients/${id}`);
        setIngredients([]);
        setCurrentPage(START_PAGE);
        getItemList({page: START_PAGE});
    };
    const itemContentHandler = (index, item) => {
        return (
            <ItemCheckboxWrapper checkBoxEnabled={false} checkboxValue={item.id}>
                <div className="flex w-full">
                    <div className="flex flex-col items-start justify-center w-full">
                        <div className="truncate">{item.name}</div>
                        <div className='flex items-center justify-between w-full'>
                            <Chip className={'h-4 '} size="sm">{item.createdBy}</Chip>
                            <div className='space-x-2'>
                                <Chip size='sm'
                                      className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">{item.calories} ккал</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">Б {item.protein}</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">Ж {item.fat}</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">У {item.carbs}</Chip>
                            </div>
                        </div>
                    </div>

                    <Button isIconOnly
                            variant={'light'}
                            className={`h-7 min-h-7 w-7 min-w-7`}
                            onPress={() => remove(item.id)}
                    >
                        <Icon icon={faTrashCan}/>
                    </Button>
                </div>
            </ItemCheckboxWrapper>
        );
    };

    const Footer = () => {
        if (!hasMore) return null;
        return (
            <div className="p-1 flex justify-center">
                <Spinner/>
            </div>
        );
    };

    return (
        <div className="space-y-4 relative flex h-[calc(100%-40px)] flex-1 flex-col gap-4">
            <Card
                shadow="none"
                classNames={{
                    base: "flex-1 h-full rounded-none sm:rounded-[14px] border",
                    body: "p-0 flex-1",
                    header: "flex flex-row px-3 py-3 sm:px-6 border-b",
                    footer: "flex flex-row px-3 py-3 sm:px-6 border-b",
                }}
            >
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
                        <div className='flex gap-2'>
                            <Button isIconOnly
                                    className={`h-7 min-h-7 w-7 min-w-7 bg-[#5e7a76] text-white shadow-lg`}
                                    onPress={() => setShowModal(true)}
                            >
                                <Icon icon={faPlus}/>
                            </Button>

                            {/*<Button isIconOnly*/}
                            {/*        className={`h-7 min-h-7 w-7 min-w-7 bg-[#5e7a76] text-white shadow-lg`}*/}
                            {/*        onPress={() => setShowScanModal(true)}*/}
                            {/*>*/}
                            {/*    <Icon icon={faBarcode}/>*/}
                            {/*</Button>*/}
                        </div>

                    </div>
                </CardHeader>
                <CardBody>
                    <CheckboxGroup
                        // onChange={onChangeCheckboxList}
                        // value={checkboxList}
                        classNames={{
                            base: "h-full w-full",
                            wrapper: "h-full gap-0 w-full",
                        }}
                    >
                        <Virtuoso
                            ref={virtuosoRef}
                            data={ingredients}
                            style={{
                                flex: 1,
                                position: "relative",
                            }}
                            components={{
                                Footer: Footer,
                            }}
                            itemContent={itemContentHandler}
                            endReached={hasMore ? loadMore : undefined}
                        />
                        {/*{!virtuosoOnTop && listConfig?.scrollToTop && (*/}
                        {/*    <Button*/}
                        {/*        className="absolute bottom-5 right-5 z-10 opacity-[.3] hover:opacity-75 active:opacity-75 rounded-full"*/}
                        {/*        onPress={scrollToTop}*/}
                        {/*        isIconOnly*/}
                        {/*    >*/}
                        {/*        <Icon icon={faArrowUp}/>*/}
                        {/*    </Button>*/}
                        {/*)}*/}
                    </CheckboxGroup>
                </CardBody>
            </Card>


            <AddIngredientModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                predefinedValue={scannedData}
                onCreated={() => {
                    setIngredients([]);
                    setCurrentPage(START_PAGE);
                    getItemList({page: START_PAGE});
                }}
            />
            {/*<ScanBarcodeModal*/}
            {/*    isOpen={showScanModal}*/}
            {/*    setAddModal={setShowModal}*/}
            {/*    setScannedData={setScannedData}*/}
            {/*    onClose={() => {*/}
            {/*        setShowScanModal(false)*/}
            {/*    }}*/}
            {/*    // onCreated={() => {*/}
            {/*    //     setIngredients([]);*/}
            {/*    //     setCurrentPage(START_PAGE);*/}
            {/*    //     getItemList({page: START_PAGE});*/}
            {/*    // }}*/}
            {/*/>*/}
        </div>
    )
}
