'use client';

import {UniversalList} from "@/components/common/infinite_list/UniversalList";

export default function IngredientsPage() {
    return (
        <div className="py-2 sm:p-6 max-w-5xl mx-auto h-[calc(100vh-70px)]  sm:h-[calc(100vh-217px)]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h1 className="text-2xl pl-3 sm:pl-6 font-semibold text-[#353535]">Nutrients</h1>
            </div>
            <UniversalList/>
        </div>
    );
}
