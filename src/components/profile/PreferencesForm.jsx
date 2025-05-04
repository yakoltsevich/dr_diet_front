'use client';
import {Textarea} from '@heroui/input';

export const PreferencesForm = ({form, onChange}) => (
    <div className='flex flex-col gap-4'>
        <Textarea labelPlacement='outside' name="allergies" label="Аллергии" value={form.allergies}
                  onChange={onChange}/>
        <Textarea labelPlacement='outside' name="dietaryPreferences" label="Диет. предпочтения"
                  value={form.dietaryPreferences} onChange={onChange}/>
        <Textarea labelPlacement='outside' name="medicalConditions" label="Мед. состояния"
                  value={form.medicalConditions} onChange={onChange}/>
        <Textarea labelPlacement='outside' name="supplements" label="Добавки" value={form.supplements}
                  onChange={onChange}/>
        <Textarea labelPlacement='outside' name="favoriteFoods" label="Любимые продукты" value={form.favoriteFoods}
                  onChange={onChange}/>
        <Textarea labelPlacement='outside' name="dislikedFoods" label="Нелюбимые продукты" value={form.dislikedFoods}
                  onChange={onChange}/>
    </div>
);
