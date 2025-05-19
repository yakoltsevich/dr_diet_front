'use client';

import { useEffect, useState } from 'react';
import {Button, ButtonGroup} from '@heroui/button';
import { axiosClient } from '@/lib/axiosClient';
import { WeekMenu } from "@/components/weekMenu/WeekMenu";
import { MOCKED_MENU } from "@/shared/constants";

export default function Menu() {
    const [menu, setMenu] = useState(null);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
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

    const generateMenu = async () => {
        setLoading1(true);
        setError(null);
        try {
            const response = await axiosClient.post('/menu/generate', { body: {} });
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Error while generating the menu');
        } finally {
            setLoading1(false);
        }
    };
    const fillRecipe = async () => {
        setLoading2(true);
        setError(null);
        try {
            const response = await axiosClient.post('/menu/fill-recipe', { body: {} });
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Error while generating the menu');
        } finally {
            setLoading2(false);
        }
    };

    const calculateNutrition = async () => {
        setLoading3(true);
        setError(null);
        try {
            const response = await axiosClient.post('/menu/calculate-nutrition', { body: {} });
            setMenu(response.data.menu);
        } catch (err) {
            console.error(err);
            setError('Error while generating the menu');
        } finally {
            setLoading3(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 min-h-[calc(100vh-217px)] space-y-2">
            {
                 (
                    <ButtonGroup size={'sm'} className={'w-full sm:max-w-xs '}>
                        <Button onPress={generateMenu} disabled={loading1} className="w-xs">
                            {loading1 ? 'Generating menu...' : 'Generate menu'}
                        </Button>
                        <Button onPress={fillRecipe} disabled={loading2} className="w-xs">
                            {loading2 ? 'filling Recipe...' : 'Fill Recipe'}
                        </Button>
                        <Button onPress={calculateNutrition} disabled={loading3} className="w-xs">
                            {loading3 ? 'calculating...' : 'Calculate Nutrition'}
                        </Button>
                    </ButtonGroup>
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
