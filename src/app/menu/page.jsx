'use client';

import {useEffect, useState} from 'react';
import {Button} from '@heroui/button';
import {axiosClient} from '@/lib/axiosClient';
import {WeekMenu} from "@/components/weekMenu/WeekMenu";

export default () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        getMenu()
    }, [])
    const getMenu = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/menu');
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Ошибка при генерации меню');
        } finally {
            setLoading(false);
        }
    };
    const generateMenu = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.post('/menu/generate', {body: {}});
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Ошибка при генерации меню');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 min-h-[calc(100vh-217px)]">
            {
                !menu || menu.length === 0 && (
                    <Button onPress={generateMenu} disabled={loading} className="w-full">
                        {loading ? 'Генерация меню...' : 'Сгенерировать меню на неделю'}
                    </Button>
                )
            }

            {error && <p className="text-red-500">{error}</p>}
            <div className='flex-1'/>
            {
                menu && menu.length !== 0 && (
                    <WeekMenu menu={menu}/>
                )
            }
        </div>
    );
};
