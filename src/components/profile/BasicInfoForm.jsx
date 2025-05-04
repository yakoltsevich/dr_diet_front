'use client';
import {Input } from '@heroui/input';
import {NumberInput} from '@heroui/number-input';
import {Select, SelectItem} from '@heroui/select';

const genders = ['male', 'female'];
const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const toSet = (value) => new Set([value]);
const fromSet = (set) => Array.from(set)[0] || '';

export const BasicInfoForm = ({form, onChange, onSelect}) => (
    <div className='flex flex-col gap-4'>
        <Input name="birthDate" label="Дата рождения" labelPlacement="outside" type="date" value={form.birthDate}
               onChange={onChange}/>
        <Select
            label="Пол"
            labelPlacement="outside"
            selectedKeys={toSet(form.gender)}
            onSelectionChange={(keys) => onSelect('gender', fromSet(keys))}
            className="max-w-xs"
        >
            {genders.map((g) => <SelectItem key={g}>{g}</SelectItem>)}
        </Select>
        <Input
            labelPlacement="outside"
            name="height"
            label="Рост (см)"
            placeholder=' '
            type="number" value={form.height}
            onChange={onChange}/>
        <Input
            labelPlacement="outside"
            name="weight"
            label="Вес (кг)"
            placeholder=' '
            type="number"
            value={form.weight}
            onChange={onChange}/>
        <Select
            label="Активность"
            labelPlacement="outside"
            selectedKeys={toSet(form.activityLevel)}
            onSelectionChange={(keys) => onSelect('activityLevel', fromSet(keys))}
            className="max-w-xs"
        >
            {activityLevels.map((level) => <SelectItem key={level}>{level}</SelectItem>)}
        </Select>
        <Input
            labelPlacement="outside"
            name="goal"
            label="Цель"
            placeholder=' '
            value={form.goal}
            onChange={onChange}/>
        <Input
            labelPlacement="outside"
            name="targetWeight"
            label="Целевой вес (кг)"
            placeholder=' '
            type="number"
            value={form.targetWeight}
            onChange={onChange}/>
    </div>
);
