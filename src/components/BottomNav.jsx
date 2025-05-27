'use client';

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faUtensils,
    faPlusCircle,
    faUser,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import {MENU_ROUTES, MOBILE_MENU_ROUTES} from "@/shared/constants";
import {DropdownItem} from "@heroui/dropdown";
import {Icon} from "@/components/common/Icon";

export const BottomNav = () => {
    const path = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 w-full sm:hidden block h-[70px] max-h-[70px] bg-[#f3f3f2] border-t border-[#b6c8c4] z-50">
            <div className="flex justify-between items-center px-4 pt-2">
                {MOBILE_MENU_ROUTES.map(({route, icon, title}) => {
                    const active = path === route;
                    return (
                        <Link
                            key={route}
                            href={route}
                            className={clsx(
                                'flex flex-col h-full items-center text-xs transition-all',
                                active ? 'text-[#5e7a76]' : 'text-[#353535]'
                            )}
                        >
                            <Icon icon={icon} className={clsx(
                                'w-5 h-5 p-2 rounded-full transition-colors',
                                active ? 'bg-[#e4d1c1] shadow-lg' : ''
                            )}/>
                            <div className="-mt-1">{title}</div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
