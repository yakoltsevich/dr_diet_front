'use client';

import {Avatar} from '@heroui/avatar';
import {Icon} from "@/components/common/Icon";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@/context/AuthContext";

export const ProfileHeader = () => {
    const {user} = useAuth();
    return (
        <div className="flex items-center text-center gap-4 ">
            <Avatar
                size="lg"
                showFallback
                fallback={<Icon icon={faUser}/>}
                src="/nonBinary.png"
            />

            <div className='flex flex-col items-start'>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-500 text-sm ">{user?.email}</p>
            </div>
        </div>
    );
}