'use client'

import { Avatar } from "@heroui/avatar";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@heroui/dropdown";
import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const onPressSignUp = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

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

            <NavbarContent as="div" justify="end">
                {isAuthenticated ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <div className="flex items-center gap-2">
                                <div className="text-xl font-semibold">{user?.name}</div>
                                <Avatar
                                    as="button"
                                    className="transition-transform"
                                    name="Jason Hughes"
                                    size="lg"
                                    src="/nonBinary.png"
                                />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownSection showDivider>
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{user?.email}</p>
                                </DropdownItem>
                            </DropdownSection>

                            <DropdownSection showDivider>
                                <DropdownItem>
                                    <Link href="/menu" color="foreground" className="text-sm">
                                        Menu
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link href="/profile" color="foreground" className="text-sm">
                                        Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link
                                        href="/groceries"
                                        color="foreground"
                                        className="text-sm"
                                    >
                                        Groceries
                                    </Link>
                                </DropdownItem>
                                <DropdownItem key="settings">Settings</DropdownItem>
                            </DropdownSection>

                            <DropdownSection>
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    onPress={handleLogout}
                                >
                                    Log Out
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button
                        onPress={onPressSignUp}
                        className="bg-primaryColor hover:bg-[#4d6864] text-lg text-white px-6 py-2 rounded-lg"
                    >
                        Sign Up
                    </Button>
                )}
            </NavbarContent>
        </Navbar>
    );
};
