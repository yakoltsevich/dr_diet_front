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
import {useAuth} from "@/context/AuthContext";

export const SideMenu = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, isAuthenticated, logout } = useAuth();

    const onPressSignUp = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        logout()
    };

    return (
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
                            <DropdownItem onPress={()=>router.push("/menu")}>
                                <Link href="/menu" color="foreground" className="text-sm">
                                    Menu
                                </Link>
                            </DropdownItem>
                            <DropdownItem onPress={()=>router.push("/profile")}>
                                <Link href="/profile" color="foreground" className="text-sm">
                                    Profile
                                </Link>
                            </DropdownItem>
                            <DropdownItem  onPress={()=>router.push("/groceries")}>
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
    );
};
