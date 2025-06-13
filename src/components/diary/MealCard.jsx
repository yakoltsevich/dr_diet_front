'use client';

import {Card, CardBody} from '@heroui/card';
import {Button} from '@heroui/button';
import {Icon} from '@/components/common/Icon';
import {faClone, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/navigation';
import {axiosClient} from '@/lib/axiosClient';
import {Chip} from '@heroui/react';

export const MealCard = ({meal, setMeals}) => {
    const router = useRouter();


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

    const renderIngredients = (meal) => {
        return <div className="space-y-1">
            {meal.ingredients.map(({ingredient, weight}, idx) => {
                const ratio = (weight / 100)
                return (
                    <div key={idx} className="rounded-lg">
                        <div className='font-semibold capitalize'>{ingredient.name?.trim()} - {weight} г</div>
                        <div className='space-x-2 text-sm  hidden group-focus-within:flex'>
                            <Chip size='sm'
                                  className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">{(ingredient.calories * ratio).toFixed(0)} ккал</Chip>
                            <Chip size='sm'
                                  className="h-4 px-0 bg-[#d9e0dd] text-[#354e49]">Б {(ingredient.protein * ratio).toFixed(1)}</Chip>
                            <Chip size='sm'
                                  className="h-4 px-0 bg-[#f1e8e0] text-[#6d5a48]">Ж {(ingredient.fat * ratio).toFixed(1)}</Chip>
                            <Chip size='sm'
                                  className="h-4 px-0 bg-[#e1eaea] text-[#4e5e5e]">У {(ingredient.carbs * ratio).toFixed(1)}</Chip>
                        </div>
                    </div>
                );
            })}
        </div>
    }
    return (
        <Card className="group  bg-[white]/80">
            <CardBody className="p-4 space-y-2 bg-[transparent]">
                <div className="flex justify-between items-center gap-2">
                    <div className=''>
                        <h2 className="font-semibold text-lg">{meal.name}</h2>
                        <div className="text-sm text-gray-400">{meal.type}</div>
                    </div>
                    <div className="flex">
                        <Button
                            variant="light"
                            isIconOnly
                            className="text-gray-700"
                            onPress={() => router.push(`/diary/edit/${meal.id}`)}
                        >
                            <Icon icon={faPen}/>
                        </Button>
                        <Button
                            variant="light"
                            isIconOnly
                            className="text-gray-700"
                            onPress={() => router.push(`/diary/add?duplicate=${meal.id}`)}
                        >
                            <Icon icon={faClone}/>
                        </Button>
                        <Button
                            variant="light"
                            isIconOnly
                            className="text-gray-700"
                            onPress={() => handleDelete(meal.id)}
                        >
                            <Icon icon={faTrashCan}/>
                        </Button>
                    </div>
                </div>
                {renderIngredients(meal)}
            </CardBody>
        </Card>

    );
}
