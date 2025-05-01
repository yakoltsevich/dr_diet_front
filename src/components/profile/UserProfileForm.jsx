'use client';

import {useEffect, useState} from 'react';
import {Input, Textarea} from '@heroui/input';
import {Button} from '@heroui/button';
import {Select, SelectItem} from '@heroui/select';
import {axiosClient} from '@/lib/axiosClient';

const genders = ['male', 'female', 'other'];
const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

export const UserProfileForm = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
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
                    allergies: data.allergies?.join(', ') || '',
                    dietaryPreferences: data.dietaryPreferences?.join(', ') || '',
                    medicalConditions: data.medicalConditions?.join(', ') || '',
                    supplements: data.supplements?.join(', ') || '',
                    favoriteFoods: data.favoriteFoods?.join(', ') || '',
                    dislikedFoods: data.dislikedFoods?.join(', ') || '',
                });
            } catch (error) {
                console.error('Не удалось загрузить профиль', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            height: parseFloat(form.height),
            weight: parseFloat(form.weight),
            targetWeight: form.targetWeight ? parseFloat(form.targetWeight) : undefined,
            allergies: form.allergies.split(',').map((v) => v.trim()).filter(Boolean),
            dietaryPreferences: form.dietaryPreferences.split(',').map((v) => v.trim()).filter(Boolean),
            medicalConditions: form.medicalConditions.split(',').map((v) => v.trim()).filter(Boolean),
            supplements: form.supplements.split(',').map((v) => v.trim()).filter(Boolean),
            favoriteFoods: form.favoriteFoods.split(',').map((v) => v.trim()).filter(Boolean),
            dislikedFoods: form.dislikedFoods.split(',').map((v) => v.trim()).filter(Boolean),
        };

        try {
            const res = await axiosClient.patch('/profile/me', payload);
            alert('Профиль успешно сохранён');
        } catch (err) {
            console.error(err);
            alert('Ошибка при отправке');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4 gap-2 flex flex-col">
            <Input name="firstName" label='Имя' labelPlacement='outside-left' placeholder="Имя" value={form.firstName} onChange={handleChange} required/>
            <Input name="lastName"  label='Фамилия' labelPlacement='outside-left' placeholder="Фамилия" value={form.lastName} onChange={handleChange} required/>
            <Input name="birthDate"  label='birthDate' labelPlacement='outside-left' type="date" value={form.birthDate} onChange={handleChange}/>

            <Select name="gender" label='Пол' labelPlacement='outside-left'  value={form.gender} onChange={handleChange} className="max-w-xs">
                {genders.map((g) => (
                    <SelectItem key={g} value={g}>
                        {g}
                    </SelectItem>
                ))}
            </Select>

            <Input name="height" label='Рост' labelPlacement='outside-left'  type="number" placeholder="Рост (см)" value={form.height} onChange={handleChange}
                   required/>
            <Input name="weight"  label='Вес' labelPlacement='outside-left' type="number" placeholder="Вес (кг)" value={form.weight} onChange={handleChange}
                   required/>

            <Select name="activityLevel"  label='Активность' labelPlacement='outside-left' value={form.activityLevel} onChange={handleChange}
                    className="max-w-xs">
                {activityLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                        {level}
                    </SelectItem>
                ))}
            </Select>

            <Input name="goal"  label='Цель' labelPlacement='outside-left' placeholder="Цель" value={form.goal} onChange={handleChange} required/>
            <Input name="targetWeight" label='targetWeight' labelPlacement='outside-left'  type="number" placeholder="Целевой вес (необязательно)" value={form.targetWeight}
                   onChange={handleChange}/>

            <Textarea name="allergies" label='allergies' labelPlacement='outside-left'  placeholder="Аллергии (через запятую)" value={form.allergies}
                      onChange={handleChange}/>
            <Textarea name="dietaryPreferences" label='dietaryPreferences' labelPlacement='outside-left'  placeholder="Диет. предпочтения (через запятую)"
                      value={form.dietaryPreferences} onChange={handleChange}/>
            <Textarea name="medicalConditions"  label='medicalConditions' labelPlacement='outside-left' placeholder="Мед. состояния (через запятую)"
                      value={form.medicalConditions} onChange={handleChange}/>
            <Textarea name="supplements" label='supplements' labelPlacement='outside-left'  placeholder="Добавки (через запятую)" value={form.supplements}
                      onChange={handleChange}/>
            <Textarea name="favoriteFoods"  label='favoriteFoods' labelPlacement='outside-left' placeholder="Любимые продукты (через запятую)" value={form.favoriteFoods}
                      onChange={handleChange}/>
            <Textarea name="dislikedFoods"  label='dislikedFoods' labelPlacement='outside-left' placeholder="Нелюбимые продукты (через запятую)" value={form.dislikedFoods}
                      onChange={handleChange}/>

            <Button type="submit" className="w-full">Сохранить профиль</Button>
        </form>
    );
};
