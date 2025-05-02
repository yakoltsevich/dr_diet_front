'use client';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';

const genders = ['male', 'female', 'other'];
const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const toSet = (value) => new Set([value]);
const fromSet = (set) => Array.from(set)[0] || '';

export const BasicInfoForm = ({ form, onChange, onSelect }) => (
    <>
        <Input name="birthDate" label="Дата рождения" labelPlacement="outside-left" type="date" value={form.birthDate} onChange={onChange} />
        <Select
            label="Пол"
            labelPlacement="outside-left"
            selectedKeys={toSet(form.gender)}
            onSelectionChange={(keys) => onSelect('gender', fromSet(keys))}
            className="max-w-xs"
        >
            {genders.map((g) => <SelectItem key={g}>{g}</SelectItem>)}
        </Select>
        <Input name="height" label="Рост (см)" type="number" value={form.height} onChange={onChange} />
        <Input name="weight" label="Вес (кг)" type="number" value={form.weight} onChange={onChange} />
        <Select
            label="Активность"
            labelPlacement="outside-left"
            selectedKeys={toSet(form.activityLevel)}
            onSelectionChange={(keys) => onSelect('activityLevel', fromSet(keys))}
            className="max-w-xs"
        >
            {activityLevels.map((level) => <SelectItem key={level}>{level}</SelectItem>)}
        </Select>
        <Input name="goal" label="Цель" value={form.goal} onChange={onChange} />
        <Input name="targetWeight" label="Целевой вес (кг)" type="number" value={form.targetWeight} onChange={onChange} />
    </>
);
