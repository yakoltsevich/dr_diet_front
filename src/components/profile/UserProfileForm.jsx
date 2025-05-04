'use client';
import {useEffect, useState} from 'react';
import {Button} from '@heroui/button';
import {axiosClient} from '@/lib/axiosClient';
import {BasicInfoForm} from './BasicInfoForm';
import {NutritionForm} from './NutritionForm';
import {PreferencesForm} from './PreferencesForm';
import {Accordion, AccordionItem} from '@heroui/accordion';

export const UserProfileForm = () => {
    const [form, setForm] = useState({
        birthDate: '',
        gender: 'male',
        height: '',
        weight: '',
        activityLevel: 'moderate',
        goal: '',
        targetWeight: '',
        allergies: '',
        dietaryPreferences: '',
        medicalConditions: '',
        supplements: '',
        favoriteFoods: '',
        dislikedFoods: '',
        calories: '',
        fats: '',
        carbs: '',
        proteins: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const {data} = await axiosClient.get('/profile/me');
                setForm({
                    ...form,
                    ...data,
                    height: data.height?.toString() || '',
                    weight: data.weight?.toString() || '',
                    targetWeight: data.targetWeight?.toString() || '',
                    calories: data.calories?.toString() || '',
                    fats: data.fats?.toString() || '',
                    carbs: data.carbs?.toString() || '',
                    proteins: data.proteins?.toString() || '',
                    allergies: data.allergies?.join(', ') || '',
                    dietaryPreferences: data.dietaryPreferences?.join(', ') || '',
                    medicalConditions: data.medicalConditions?.join(', ') || '',
                    supplements: data.supplements?.join(', ') || '',
                    favoriteFoods: data.favoriteFoods?.join(', ') || '',
                    dislikedFoods: data.dislikedFoods?.join(', ') || '',
                });
            } catch (error) {
                console.error('Ошибка загрузки профиля', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSelectChange = (field, value) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            height: parseFloat(form.height),
            weight: parseFloat(form.weight),
            targetWeight: form.targetWeight ? parseFloat(form.targetWeight) : undefined,
            calories: form.calories ? parseFloat(form.calories) : null,
            fats: form.fats ? parseFloat(form.fats) : null,
            carbs: form.carbs ? parseFloat(form.carbs) : null,
            proteins: form.proteins ? parseFloat(form.proteins) : null,
            allergies: form.allergies.split(',').map((v) => v.trim()).filter(Boolean),
            dietaryPreferences: form.dietaryPreferences.split(',').map((v) => v.trim()).filter(Boolean),
            medicalConditions: form.medicalConditions.split(',').map((v) => v.trim()).filter(Boolean),
            supplements: form.supplements.split(',').map((v) => v.trim()).filter(Boolean),
            favoriteFoods: form.favoriteFoods.split(',').map((v) => v.trim()).filter(Boolean),
            dislikedFoods: form.dislikedFoods.split(',').map((v) => v.trim()).filter(Boolean),
        };

        try {
            await axiosClient.patch('/profile/me', payload);
            console.log('Профиль успешно сохранён');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-6 flex flex-col">
            <Accordion>
                <AccordionItem title="Основная информация">
                    <BasicInfoForm form={form} onChange={handleChange} onSelect={handleSelectChange}/>
                </AccordionItem>
                <AccordionItem title="Цели и параметры">
                    <NutritionForm form={form} onChange={handleChange}/>
                </AccordionItem>
                <AccordionItem title="Питание">
                    <PreferencesForm form={form} onChange={handleChange}/>
                </AccordionItem>
            </Accordion>
            <Button type="submit" className="w-full text-white bg-primaryColor">Сохранить профиль</Button>
        </form>
    );
};
