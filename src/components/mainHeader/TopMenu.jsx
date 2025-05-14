'use client'

import Link from 'next/link';
import {NavbarContent, NavbarItem,} from "@heroui/navbar";

export const TopMenu = () => {
    return (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
            <NavbarItem isActive>
                <Link
                    href="/menu"
                    color="foreground"
                    className="cursor-pointer font-semibold text-2xl"
                >
                    Menu
                </Link>
            </NavbarItem>

            <NavbarItem>
                <Link
                    href="/profile"
                    color="foreground"
                    className="cursor-pointer font-semibold text-2xl"
                >
                    Profile
                </Link>
            </NavbarItem>

            <NavbarItem>
                <Link
                    href="/groceries"
                    color="foreground"
                    className="font-semibold text-2xl"
                >
                    Groceries
                </Link>
            </NavbarItem>
        </NavbarContent>
    );
};
