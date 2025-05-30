import {Suspense} from 'react';
import AddMealPage from './AddMealPage';

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center mt-8">Загрузка формы...</div>}>
            <AddMealPage/>
        </Suspense>
    );
}
