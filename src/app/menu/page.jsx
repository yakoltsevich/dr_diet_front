'use client';

import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { axiosClient } from '@/lib/axiosClient';
import { WeekMenu } from "@/components/weekMenu/WeekMenu";
import { MOCKED_MENU } from "@/shared/constants";

export default function Menu() {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMenu();
        // setMenu(MOCKED_MENU);
    }, []);

    const getMenu = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/menu');
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Error while loading the menu');
        } finally {
            setLoading(false);
        }
    };

    const generateMenu = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.post('/menu/generate', { body: {} });
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Error while generating the menu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 min-h-[calc(100vh-217px)]">
            {
                (!menu || menu.length === 0) && (
                    <Button onPress={generateMenu} disabled={loading} className="w-full">
                        {loading ? 'Generating menu...' : 'Generate weekly menu'}
                    </Button>
                )
            }

            {error && <p className="text-red-500">{error}</p>}
            <div className='flex-1' />
            {
                menu && menu.length !== 0 && (
                    <WeekMenu menu={menu} />
                )
            }
        </div>
    );
};
