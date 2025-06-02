'use client';

import {UniversalList} from "@/components/common/infinite_list/UniversalList";

export default function IngredientsPage() {
    return (
        <div className="p-2 sm:p-6 max-w-5xl mx-auto h-full min-h-[inherit]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h1 className="text-2xl font-semibold text-[#353535]">Ingredients</h1>
            </div>
            <UniversalList/>
        </div>
    );
}
