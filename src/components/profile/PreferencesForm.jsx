'use client';
import {Textarea} from '@heroui/input';

export const PreferencesForm = ({form, onChange}) => (
    <div className="flex flex-col gap-4">
        <Textarea
            labelPlacement="outside"
            name="allergies"
            label="Allergies"
            value={form.allergies}
            onChange={onChange}
        />
        <Textarea
            labelPlacement="outside"
            name="dietaryPreferences"
            label="Dietary Preferences"
            value={form.dietaryPreferences}
            onChange={onChange}
        />
        <Textarea
            labelPlacement="outside"
            name="medicalConditions"
            label="Medical Conditions"
            value={form.medicalConditions}
            onChange={onChange}
        />
        <Textarea
            labelPlacement="outside"
            name="supplements"
            label="Supplements"
            value={form.supplements}
            onChange={onChange}
        />
        <Textarea
            labelPlacement="outside"
            name="favoriteFoods"
            label="Favorite Foods"
            value={form.favoriteFoods}
            onChange={onChange}
        />
        <Textarea
            labelPlacement="outside"
            name="dislikedFoods"
            label="Disliked Foods"
            value={form.dislikedFoods}
            onChange={onChange}
        />
    </div>
);
