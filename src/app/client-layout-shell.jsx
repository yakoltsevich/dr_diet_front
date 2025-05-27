'use client';

import {useDispatch} from 'react-redux';
import {usePathname} from 'next/navigation';
import {Header} from '@/components/mainHeader/Header';
import {Footer} from '@/components/Footer';
import {BottomNav} from "@/components/BottomNav";

export const ClientLayoutShell = ({children}) => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const hideHeaderAndFooter = pathname === '/login' || pathname === '/register';

    return (
        <div>
            <BottomNav/>
            {!hideHeaderAndFooter && <>
                <Header/>
                <BottomNav/>
            </>}
            <main className='pb-[70px] '>{children}</main>
            {!hideHeaderAndFooter && <Footer/>}
        </div>
    );
};
