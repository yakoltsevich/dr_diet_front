'use client';

import {useEffect, useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '@heroui/button';
import {useRouter} from 'next/navigation';
import {axiosClient} from '@/lib/axiosClient';
import {MealCard} from "@/components/diary/MealCard";
import {DayTotal} from "@/components/diary/DayTotal";
import {DateInputs} from "@/components/diary/DateInputs";
import {Spinner} from "@heroui/spinner";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Icon} from "@/components/common/Icon";

const shiftDate = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

export default function NutritionDiaryPage() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rangeEnabled, setRangeEnabled] = useState(false);
    const [dateFrom, setDateFrom] = useState(() => new Date().toISOString().split('T')[0]);
    const [dateTo, setDateTo] = useState(() => new Date().toISOString().split('T')[0]);
    const [swipeDirection, setSwipeDirection] = useState(0); // -1 = вправо, 1 = влево

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
    }, [dateFrom, dateTo]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            const newDate = shiftDate(dateFrom, 1);
            setSwipeDirection(1);
            setDateFrom(newDate);
            if (!rangeEnabled) setDateTo(newDate);
        },
        onSwipedRight: () => {
            const newDate = shiftDate(dateFrom, -1);
            setSwipeDirection(-1);
            setDateFrom(newDate);
            if (!rangeEnabled) setDateTo(newDate);
        },
        trackTouch: true,
        trackMouse: true,
    });

    const motionVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
        }),
    };

    return (
        <div
            {...swipeHandlers}
            className="max-w-2xl mx-auto px-4 py-6 space-y-6 touch-pan-x"
        >
            <h1 className="text-2xl font-semibold text-center text-[#353535]">
                Nutrition Diary
            </h1>
            <div className="flex items-center justify-center sm:justify-between">
                <Button
                    onPress={() => {
                        const newDate = shiftDate(dateFrom, -1);
                        setSwipeDirection(-1);
                        setDateFrom(newDate);
                        if (!rangeEnabled) setDateTo(newDate);
                    }}
                    className="hidden sm:flex bg-[#e4d1c1]/50 items-center justify-center p-2 rounded-full hover:bg-[#e4d1c1] transition"
                    aria-label="Previous day"
                    isIconOnly
                >
                    <Icon size={'xl'} className="text-[#5e7a76] font-bold" icon={faChevronLeft}/>
                </Button>

                <DateInputs
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    rangeEnabled={rangeEnabled}
                    setRangeEnabled={setRangeEnabled}
                />

                <Button
                    onPress={() => {
                        const newDate = shiftDate(dateFrom, 1);
                        setSwipeDirection(1);
                        setDateFrom(newDate);
                        if (!rangeEnabled) setDateTo(newDate);
                    }}
                    isIconOnly
                    className="hidden sm:flex bg-[#e4d1c1]/50 items-center justify-center p-2 rounded-full hover:bg-[#e4d1c1] transition"
                    aria-label="Next day"
                >
                    <Icon size={'xl'} className="text-[#5e7a76]" icon={faChevronRight}/>
                </Button>
            </div>
            <AnimatePresence custom={swipeDirection} mode="wait">

                {loading ? (
                    <div className='w-full flex items-center justify-center min-h-32'>
                        <Spinner color="default" size="lg"/>
                    </div>
                ) : (
                    <motion.div
                        key={dateFrom + dateTo}
                        custom={swipeDirection}
                        variants={motionVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration: 0.3}}
                        className="space-y-4"
                    >
                        {meals.map((meal) => (
                            <MealCard key={meal.id} meal={meal}/>
                        ))}
                        <DayTotal meals={meals}/>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onPress={() => router.push('/diary/add')}
                className="w-full bg-[#5e7a76] text-white rounded-2xl shadow-lg hover:bg-[#4d6965]"
            >
                Add Meal
            </Button>
        </div>
    );
}
