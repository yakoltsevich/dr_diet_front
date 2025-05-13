'use client';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';

const genders = ['male', 'female'];
const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const toSet = (value) => new Set([value]);
const fromSet = (set) => Array.from(set)[0] || '';

export const BasicInfoForm = ({ form, onChange, onSelect }) => (
    <div className="flex flex-col gap-4">
            <Input
                name="birthDate"
                label="Birth Date"
                labelPlacement="outside"
                type="date"
                value={form.birthDate}
                onChange={onChange}
            />
            <Select
                label="Gender"
                labelPlacement="outside"
                selectedKeys={toSet(form.gender)}
                onSelectionChange={(keys) => onSelect('gender', fromSet(keys))}
                className="max-w-xs"
            >
                    {genders.map((g) => (
                        <SelectItem key={g}>{g}</SelectItem>
                    ))}
            </Select>
            <Input
                labelPlacement="outside"
                name="height"
                label="Height (cm)"
                placeholder=" "
                type="number"
                value={form.height}
                onChange={onChange}
            />
            <Input
                labelPlacement="outside"
                name="weight"
                label="Weight (kg)"
                placeholder=" "
                type="number"
                value={form.weight}
                onChange={onChange}
            />
            <Select
                label="Activity Level"
                labelPlacement="outside"
                selectedKeys={toSet(form.activityLevel)}
                onSelectionChange={(keys) => onSelect('activityLevel', fromSet(keys))}
                className="max-w-xs"
            >
                    {activityLevels.map((level) => (
                        <SelectItem key={level}>{level}</SelectItem>
                    ))}
            </Select>
            <Input
                labelPlacement="outside"
                name="goal"
                label="Goal"
                placeholder=" "
                value={form.goal}
                onChange={onChange}
            />
            <Input
                labelPlacement="outside"
                name="targetWeight"
                label="Target Weight (kg)"
                placeholder=" "
                type="number"
                value={form.targetWeight}
                onChange={onChange}
            />
    </div>
);
