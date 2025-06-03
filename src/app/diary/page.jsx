'use client';

import {useEffect, useRef, useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '@heroui/button';
import {useRouter} from 'next/navigation';
import {axiosClient} from '@/lib/axiosClient';
import {MealCard} from "@/components/diary/MealCard";
import {DayTotal} from "@/components/diary/DayTotal";
import {DateInputs} from "@/components/diary/DateInputs";

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
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const isFirstRender = useRef(true)
    const router = useRouter();

    useEffect(() => {
        if (!loading && meals.length > 0 && isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, [loading, meals]);

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
            if (!hasLoadedOnce) setHasLoadedOnce(true);
        }
    };

    useEffect(() => {
        if (dateFrom) {
            loadMeals();
        }
    }, [dateFrom, dateTo]);

    const onSwiped = (value) => {
        const newDate = shiftDate(dateFrom, value);
        setSwipeDirection(value)
        setDateFrom(newDate);
        if (!rangeEnabled) setDateTo(newDate);
    }

    const onSwipedLeft = () => {
        onSwiped(1)
    }

    const onSwipedRight = () => {
        onSwiped(-1)
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight,
        trackTouch: true,
        trackMouse: true,
    });

    const motionVariants = {
        enter: ({direction, isInitial}) => ({
            x: isInitial ? 0 : direction > 0 ? 300 : -300,
            y: isInitial ? 50 : 0,
            opacity: 0,
        }),
        center: {
            x: 0,
            y: 0,
            opacity: 1,
        },
        exit: ({direction}) => ({
            x: direction > 0 ? -300 : 300,
            y: 0,
            opacity: 0,
        }),
    };

    return (
        <div
            {...swipeHandlers}
            className="max-w-2xl mx-auto px-4 py-6 space-y-6 touch-pan-x min-h-[inherit]"
        >
            <h1 className="text-2xl font-semibold text-center text-[#353535]">
                Nutrition Diary
            </h1>

            <DateInputs
                dateFrom={dateFrom}
                dateTo={dateTo}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
                rangeEnabled={rangeEnabled}
                setRangeEnabled={setRangeEnabled}
                increaseDay={onSwipedLeft}
                decreaseDay={onSwipedRight}
            />

            <AnimatePresence custom={{direction: swipeDirection, isInitial: isFirstRender.current}} mode="wait">
                {!loading && (
                    <motion.div
                        key={dateFrom + dateTo}
                        custom={{direction: swipeDirection, isInitial: isFirstRender.current}}
                        variants={motionVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration: 0.3}}
                        className="space-y-4"
                    >
                        {meals.map((meal) => (
                            <MealCard key={meal.id} meal={meal} setMeals={setMeals}/>
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
