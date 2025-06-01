'use client';

import React, { useMemo, useRef } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    getKeyValue,
} from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';

export function IngredientTable({
                                    ingredients,
                                    loading,
                                    onEdit,
                                    onDelete,
                                    onLoadMore,
                                    hasMore,
                                    activeId,
                                    onSort,
                                    sortKey,
                                    sortDirection,
                                }) {
    const loaderRef = useRef(null);

    const columns = useMemo(
        () => [
            { key: 'name', label: 'Название', sortable: true },
            { key: 'calories', label: 'Ккал', sortable: true },
            { key: 'protein', label: 'Белки', sortable: true },
            { key: 'fat', label: 'Жиры', sortable: true },
            { key: 'carbs', label: 'Углеводы', sortable: true },
            { key: 'actions', label: '', sortable: false },
        ],
        []
    );

    // infinite scroll
    const [loaderScrollRef, tableScrollRef] = useInfiniteScroll({
        hasMore,
        onLoadMore,
    });

    const renderSortIcon = (columnKey) => {
        if (!onSort) return null;
        if (sortKey !== columnKey) return '⇅';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    return (
        <Table
            isHeaderSticky
            aria-label="Список ингредиентов"
            baseRef={tableScrollRef}
            bottomContent={
                hasMore ? (
                    <div className="flex w-full justify-center">
                        <Spinner ref={loaderScrollRef} color="white" />
                    </div>
                ) : null
            }
            classNames={{
                base: 'max-h-[520px] overflow-scroll rounded-lg border border-gray-200',
                table: 'min-h-[400px]',
            }}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        align={column.key === 'actions' ? 'end' : 'start'}
                        onClick={() =>
                            column.sortable && onSort && onSort(column.key)
                        }
                        className={column.sortable ? 'cursor-pointer select-none' : ''}
                    >
                        <div className="flex items-center gap-1">
                            {column.label}
                            {column.sortable && <span className="text-xs">{renderSortIcon(column.key)}</span>}
                        </div>
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={ingredients}
                isLoading={loading}
                loadingContent={<Spinner color="white" />}
                emptyContent="Нет ингредиентов"
            >
                {(item) => (
                    <TableRow
                        key={item.id}
                        className={
                            item.id === activeId
                                ? 'bg-[#e4d1c1]/30 transition-colors'
                                : ''
                        }
                    >
                        {(columnKey) => {
                            if (columnKey === 'actions') {
                                return (
                                    <TableCell className="text-right">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-blue-600 hover:underline mr-2"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            🗑️
                                        </button>
                                    </TableCell>
                                );
                            }

                            return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
