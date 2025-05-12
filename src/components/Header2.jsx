'use client'

import {Avatar} from "@heroui/avatar";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@heroui/dropdown";
import {Link} from "@heroui/link"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button} from "@heroui/button";
import {useEffect, useState} from "react";
import {axiosClient} from "@/lib/axiosClient";

export const Header2 = () => {
    const isAuthorized = localStorage.getItem('token');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    useEffect(() => {
        getMe()
    }, [])
    const getMe = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/users/me');
            setUser(response.data);
        } catch (err) {
            console.error(err);
            setError('Ошибка при генерации меню');
        } finally {
            setLoading(false);
        }
    };
    const onPressSignUp = () => {
        router.push('/login');
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        // setIsAuth(false);
        router.push('/');
    };
    return (
        <Navbar height={80} isBordered maxWidth="full" className="bg-[#f3f3f2] text-[#353535] justify-end"
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
                    {/*<p className="font-bold text-[#5e7a76] -ml-2 text-3xl">Dr. Diet</p>*/}
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                <NavbarItem isActive>
                    <Link color="foreground" className='cursor-pointer font-semibold text-2xl'
                          onPress={() => router.push('/menu')}>Menu</Link>
                </NavbarItem>


                <NavbarItem>
                    <Link color="foreground" className='cursor-pointer font-semibold text-2xl'
                          onPress={() => router.push('/profile')}>Profile</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className='font-semibold text-2xl' href="#">Groceries</Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {isAuthorized
                    ? (<Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                name="Jason Hughes"
                                size="lg"
                                src="/girl.png"
                            />
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
                                    <Link color="foreground" className='text-sm'
                                          onPress={() => router.push('/menu')}>Меню</Link>
                                </DropdownItem>


                                <DropdownItem>
                                    <Link color="foreground" className='text-sm'
                                          onPress={() => router.push('/profile')}>Профиль</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link color="foreground" className='text-sm' href="#">Список покупок</Link>
                                </DropdownItem>

                                <DropdownItem key="settings">Настройки</DropdownItem>
                            </DropdownSection>


                            <DropdownSection>
                                <DropdownItem key="logout" color="danger" onPress={handleLogout}>Выйти</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>)
                    : (
                        <Button onPress={onPressSignUp} className='font-semibold text-xl'>Sign Up</Button>
                    )}

            </NavbarContent>
        </Navbar>
    );
};
