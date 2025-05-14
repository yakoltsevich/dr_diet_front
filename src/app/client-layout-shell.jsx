'use client';

import {useDispatch} from 'react-redux';
import {usePathname} from 'next/navigation';
import {Header} from '@/components/mainHeader/Header';
import {Footer} from '@/components/Footer';

export const ClientLayoutShell = ({children}) => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const hideHeaderAndFooter = pathname === '/login' || pathname === '/register';

    return (
        <div>
            {!hideHeaderAndFooter && <Header/>}
            <main>{children}</main>
            {!hideHeaderAndFooter && <Footer/>}
        </div>
    );
};
