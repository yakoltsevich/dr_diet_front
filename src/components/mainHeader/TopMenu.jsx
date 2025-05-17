'use client'

import Link from 'next/link';
import {NavbarContent, NavbarItem,} from "@heroui/navbar";
import {MENU_ROUTES} from "@/shared/constants";

export const TopMenu = () => {
    return (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
            {MENU_ROUTES.map(({route, title}) => (
                <NavbarItem key={route}>
                    <Link
                        href={route}
                        color="foreground"
                        className="cursor-pointer font-semibold text-2xl"
                    >
                        {title}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
    );
};
