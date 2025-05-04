'use client';
import {Input} from '@heroui/input';

export const NutritionForm = ({form, onChange}) => (
    <div className='flex flex-col gap-4'>
        <Input labelPlacement='outside'
               name="calories"
               label="Калории (ккал)"
               type="number"
               placeholder=' '
               value={form.calories}
               onChange={onChange}/>
        <Input labelPlacement='outside'
               name="proteins"
               label="Белки (г)"
               type="number"
               placeholder=' '
               value={form.proteins}
               onChange={onChange}/>
        <Input labelPlacement='outside'
               name="fats"
               label="Жиры (г)"
               type="number"
               placeholder=' '
               value={form.fats}
               onChange={onChange}/>
        <Input labelPlacement='outside'
               name="carbs"
               placeholder=' '
               label="Углеводы (г)"
               type="number"
               value={form.carbs}
               onChange={onChange}/>
    </div>
);
