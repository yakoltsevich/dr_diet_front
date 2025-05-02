'use client';
import { Input } from '@heroui/input';

export const NutritionForm = ({ form, onChange }) => (
    <>
        <Input name="calories" label="Калории (ккал)" type="number" value={form.calories} onChange={onChange} />
        <Input name="proteins" label="Белки (г)" type="number" value={form.proteins} onChange={onChange} />
        <Input name="fats" label="Жиры (г)" type="number" value={form.fats} onChange={onChange} />
        <Input name="carbs" label="Углеводы (г)" type="number" value={form.carbs} onChange={onChange} />
    </>
);
