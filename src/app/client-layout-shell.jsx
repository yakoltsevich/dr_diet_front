'use client';

import {useDispatch} from 'react-redux';
import {usePathname} from 'next/navigation';
import {Header} from '@/components/mainHeader/Header';
import {Footer} from '@/components/Footer';
import {BottomNav} from "@/components/BottomNav";
import clsx from "clsx";

export const ClientLayoutShell = ({children}) => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const hideHeaderAndFooter = pathname === '/login' || pathname === '/register';

    return (
        <div>
            {!hideHeaderAndFooter && <>
                <Header/>
                <BottomNav/>
            </>}
            <main
                className={clsx(!hideHeaderAndFooter && 'mb-[70px] min-h-[calc(100vh-70px)] sm:mb-0 sm:min-h-[calc(100vh-217px)]')}>{children}</main>
            {!hideHeaderAndFooter && <Footer/>}
        </div>
    );
};
