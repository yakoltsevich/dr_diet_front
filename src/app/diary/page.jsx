'use client';

import {useEffect, useState} from 'react';
import {Card, CardBody} from '@heroui/card';
import {Button} from '@heroui/button';
import {Input} from '@heroui/input';
import {Icon} from '@/components/common/Icon';
import {faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/navigation';
import {axiosClient} from '@/lib/axiosClient';
import {Checkbox} from '@heroui/react';

export default function NutritionDiaryPage() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rangeEnabled, setRangeEnabled] = useState(false);
    const [dateFrom, setDateFrom] = useState(() => new Date().toISOString().split('T')[0]);
    const [dateTo, setDateTo] = useState(() => new Date().toISOString().split('T')[0]);

    const router = useRouter();

    const loadMeals = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/meals', {
                params: {
                    dateFrom,
                    dateTo: rangeEnabled ? dateTo : dateFrom,
                },
            });
            setMeals(res.data);
        } catch (err) {
            console.error('Ошибка при загрузке приёмов пищи:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (dateFrom) {
            loadMeals();
        }
    }, [dateFrom, dateTo, rangeEnabled]);

    const handleDelete = async (id) => {
        const confirmed = confirm('Удалить этот приём пищи?');
        if (!confirmed) return;

        try {
            await axiosClient.delete(`/meals/${id}`);
            setMeals((prev) => prev.filter((meal) => meal.id !== id));
        } catch (err) {
            alert(err?.response?.data?.message || 'Ошибка при удалении');
        }
    };

    const getTotal = () => {
        return meals.reduce(
            (acc, meal) => {
                meal.ingredients.forEach(({ingredient, weight}) => {
                    const ratio = weight / 100;
                    acc.calories += ingredient.calories * ratio;
                    acc.protein += ingredient.protein * ratio;
                    acc.fat += ingredient.fat * ratio;
                    acc.carbs += ingredient.carbs * ratio;
                });
                return acc;
            },
            {calories: 0, protein: 0, fat: 0, carbs: 0}
        );
    };

    const totals = getTotal();

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold text-center text-[#353535]">Nutrition Diary</h1>

            <div className="flex flex justify-center gap-2">
                <Input
                    type="date"
                    className="w-full sm:w-48"
                    value={dateFrom}
                    onValueChange={setDateFrom}
                />
                <Checkbox
                    classNames={{
                        base: 'baseAnchor m-0 p-0',
                        wrapper: 'wrapperAnchor m-0',
                    }}
                    isSelected={rangeEnabled}
                    onValueChange={setRangeEnabled}
                />
                <Input
                    type="date"
                    isDisabled={!rangeEnabled}
                    className="w-full sm:w-48"
                    value={rangeEnabled ? dateTo : ''}
                    onValueChange={setDateTo}
                />
            </div>

            {loading ? (
                <p className="text-center text-muted-foreground">Загрузка...</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {meals.map((meal) => (
                            <Card key={meal.id}>
                                <CardBody className="p-4 space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h2 className="font-semibold text-lg">{meal.name}</h2>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="light"
                                                isIconOnly
                                                className="text-gray-700"
                                                onPress={() => router.push(`/diary/edit/${meal.id}`)}
                                            >
                                                <Icon icon={faPen} />
                                            </Button>
                                            <Button
                                                variant="light"
                                                isIconOnly
                                                className="text-gray-700"
                                                onPress={() => handleDelete(meal.id)}
                                            >
                                                <Icon icon={faTrashCan} />
                                            </Button>
                                        </div>
                                    </div>
                                    <ul className="space-y-1">
                                        {meal.ingredients.map(({ingredient, weight}, idx) => {
                                            const ratio = weight / 100;
                                            return (
                                                <li key={idx} className="text-sm text-muted-foreground">
                                                    {weight} г {ingredient.name} —{' '}
                                                    {(ingredient.calories * ratio).toFixed(0)} ккал ·{' '}
                                                    {(ingredient.protein * ratio).toFixed(0)}г Б ·{' '}
                                                    {(ingredient.fat * ratio).toFixed(0)}г Ж ·{' '}
                                                    {(ingredient.carbs * ratio).toFixed(0)}г У
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-[#f3f3f2] rounded-xl p-4 text-sm text-center shadow-inner text-[#353535]">
                        <strong>Total:</strong> {totals.calories.toFixed(0)} ккал ·{' '}
                        {totals.protein.toFixed(0)}г Б · {totals.fat.toFixed(0)}г Ж ·{' '}
                        {totals.carbs.toFixed(0)}г У
                    </div>
                </>
            )}

            <Button
                onPress={() => router.push('/diary/add')}
                className="w-full bg-[#5e7a76] text-white rounded-2xl shadow-lg hover:bg-[#4d6965]"
            >
                Add Meal
            </Button>
        </div>
    );
}
