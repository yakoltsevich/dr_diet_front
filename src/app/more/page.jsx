'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import {MORE_ITEMS} from "@/shared/constants";
import {useAuth} from "@/context/AuthContext";
import {faRightFromBracket, faRightToBracket} from "@fortawesome/free-solid-svg-icons";


export default function MorePage() {

    const {user, isAuthenticated, logout} = useAuth();


    const handleLogout = () => {
        logout()
    };
    return (
        <div className="min-h-[calc(100vh-70px)] bg-[#f3f3f2]  px-4 flex flex-col items-center justify-between w-full  ">
           <div className=' w-full  flex items-center justify-between mb-4'>
               <h1 className="text-2xl font-semibold text-[#353535]">More</h1>
               <Link color="foreground" href="/">
                   <Image
                       src="/logo5.png"
                       alt="Dr Diet Logo"
                       width={140}
                       height={140}
                   />
               </Link>
           </div>
            <div className=" w-full  space-y-3 pb-4">
                {MORE_ITEMS.map(({ href, icon, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:bg-[#e4d1c1] transition"
                    >
                        <div className="flex items-center gap-4 text-[#353535]">
                            <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                            <span className="text-sm">{label}</span>
                        </div>
                        <span className="text-[#b6c8c4]">&gt;</span>
                    </Link>
                ))}
                {isAuthenticated
                    ? (
                    <div
                        className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:bg-[#e4d1c1] transition"
                        onClick={handleLogout}
                    >
                        <div className="flex items-center gap-4 text-[#353535]">
                            <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
                            <span className="text-sm">Logout</span>
                        </div>
                        <span className="text-[#b6c8c4]">&gt;</span>
                    </div>
                ): (
                    <Link
                        href={'/login'}
                        className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm hover:bg-[#e4d1c1] transition"
                    >
                        <div className="flex items-center gap-4 text-[#353535]">
                            <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5" />
                            <span className="text-sm">Login</span>
                        </div>
                        <span className="text-[#b6c8c4]">&gt;</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
