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

const navItems = [
    {href: '/dashboard', icon: faHouse, label: 'Главная'},
    {href: '/meals', icon: faUtensils, label: 'Питание'},
    {href: '/add', icon: faPlusCircle, label: 'Добавить', special: true},
    {href: '/profile', icon: faUser, label: 'Профиль'},
    {href: '/more', icon: faEllipsisH, label: 'Ещё'},
];

export const BottomNav = () => {
    const path = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#f3f3f2] border-t border-[#b6c8c4] z-50">
            <div className="flex justify-between items-center px-4 py-2">
                {navItems.map(({href, icon, label, special}) => {
                    const active = path.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                'flex flex-col items-center text-xs transition-all',
                                special ? 'translate-y-[-12px]' : '',
                                active ? 'text-[#5e7a76]' : 'text-[#353535]'
                            )}
                        >
                            <div
                                className={clsx(
                                    'p-2 rounded-full transition-colors',
                                    active ? 'bg-[#e4d1c1] shadow-lg' : ''
                                )}
                            >
                                <FontAwesomeIcon icon={icon} className="w-5 h-5"/>
                            </div>
                            <span className="mt-1">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
