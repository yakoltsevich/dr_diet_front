'use client';
import { Input } from '@heroui/input';

export const NutritionForm = ({ form, onChange }) => (
    <div className="flex flex-col gap-4">
        <Input
            labelPlacement="outside"
            name="calories"
            label="Calories (kcal)"
            type="number"
            placeholder=" "
            value={form.calories}
            onChange={onChange}
        />
        <Input
            labelPlacement="outside"
            name="proteins"
            label="Proteins (g)"
            type="number"
            placeholder=" "
            value={form.proteins}
            onChange={onChange}
        />
        <Input
            labelPlacement="outside"
            name="fats"
            label="Fats (g)"
            type="number"
            placeholder=" "
            value={form.fats}
            onChange={onChange}
        />
        <Input
            labelPlacement="outside"
            name="carbs"
            label="Carbohydrates (g)"
            type="number"
            placeholder=" "
            value={form.carbs}
            onChange={onChange}
        />
    </div>
);
