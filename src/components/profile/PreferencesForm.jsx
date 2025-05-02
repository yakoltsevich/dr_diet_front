'use client';
import { Textarea } from '@heroui/input';

export const PreferencesForm = ({ form, onChange }) => (
    <>
        <Textarea name="allergies" label="Аллергии" value={form.allergies} onChange={onChange} />
        <Textarea name="dietaryPreferences" label="Диет. предпочтения" value={form.dietaryPreferences} onChange={onChange} />
        <Textarea name="medicalConditions" label="Мед. состояния" value={form.medicalConditions} onChange={onChange} />
        <Textarea name="supplements" label="Добавки" value={form.supplements} onChange={onChange} />
        <Textarea name="favoriteFoods" label="Любимые продукты" value={form.favoriteFoods} onChange={onChange} />
        <Textarea name="dislikedFoods" label="Нелюбимые продукты" value={form.dislikedFoods} onChange={onChange} />
    </>
);
