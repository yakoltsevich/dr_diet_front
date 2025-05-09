'use client'

import {Avatar} from "@heroui/avatar";
import {Dropdown, DropdownSection} from "@heroui/dropdown";
import {DropdownItem} from "@heroui/dropdown";
import {DropdownMenu} from "@heroui/dropdown";
import {DropdownTrigger} from "@heroui/dropdown";
import {Link} from "@heroui/link"
import {Navbar} from "@heroui/navbar";
import {NavbarBrand} from "@heroui/navbar";
import {NavbarContent} from "@heroui/navbar";
import {NavbarItem} from "@heroui/navbar";
import Image from "next/image";
import {useRouter} from "next/navigation";

export const Header2 = () => {

    const router = useRouter();


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
                <Link color="foreground"  href="/">
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
                    <Link color="foreground" className='cursor-pointer font-semibold text-2xl' onPress={() => router.push('/menu')}>Menu</Link>
                </NavbarItem>


                <NavbarItem>
                    <Link color="foreground"  className='cursor-pointer font-semibold text-2xl' onPress={() => router.push('/profile')}>Profile</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className='font-semibold text-2xl' href="#">Groceries</Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
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
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                        </DropdownSection>

                        <DropdownSection showDivider>
                            <DropdownItem>
                                <Link color="foreground" className='text-sm' onPress={() => router.push('/menu')}>Меню</Link>
                            </DropdownItem>


                            <DropdownItem>
                                <Link color="foreground"  className='text-sm' onPress={() => router.push('/profile')}>Профиль</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link color="foreground" className='text-sm' href="#">Список покупок</Link>
                            </DropdownItem>

                            <DropdownItem key="settings">Настройки</DropdownItem>
                        </DropdownSection>


                        <DropdownSection >
                            <DropdownItem key="logout" color="danger" onPress={handleLogout}>Выйти</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
};
