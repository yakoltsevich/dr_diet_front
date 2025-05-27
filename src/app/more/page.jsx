'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import {MORE_ITEMS} from "@/shared/constants";


export default function MorePage() {
    return (
        <div className="min-h-[calc(100vh-60px)] bg-[#f3f3f2]  px-4">
           <div className='flex items-center justify-between mb-4'>
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
            <div className="space-y-4">
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
            </div>
        </div>
    );
}
