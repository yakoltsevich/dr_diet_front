'use client';

import { useEffect, useState } from 'react';
import {Button, ButtonGroup} from '@heroui/button';
import { axiosClient } from '@/lib/axiosClient';
import { WeekMenu } from "@/components/weekMenu/WeekMenu";
import { MOCKED_MENU } from "@/shared/constants";

export default function Menu() {
    const [menu, setMenu] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMenu();
        // setMenu(MOCKED_MENU);
    }, []);

    const getMenu = async () => {
        setError(null);
        try {
            const response = await axiosClient.get('/menu');
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Error while loading the menu');
        } finally {
        }
    };

    return (
        <div className="max-w-7xl mx-auto sm:p-4 ">
            {
                menu && menu.length !== 0 && (
                    <WeekMenu menu={menu} />
                )
            }
        </div>
    );
};
