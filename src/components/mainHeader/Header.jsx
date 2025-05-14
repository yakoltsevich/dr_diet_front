'use client'

import Link from 'next/link';
import {Navbar, NavbarBrand,} from "@heroui/navbar";
import Image from "next/image";
import {SideMenu} from "@/components/mainHeader/SideMenu";
import {TopMenu} from "@/components/mainHeader/TopMenu";

export const Header = () => {

    return (
        <Navbar
            height={80}
            isBordered
            maxWidth="full"
            className="bg-[#f3f3f2] text-[#353535] justify-end"
            classNames={{
                wrapper: 'pl-0 sm:px-6',
            }}
        >
            <NavbarBrand>
                <Link color="foreground" href="/">
                    <Image
                        src="/logo5.png"
                        alt="Dr Diet Logo"
                        width={140}
                        height={140}
                    />
                </Link>
            </NavbarBrand>

            <TopMenu/>
            <SideMenu/>
        </Navbar>
    );
};
