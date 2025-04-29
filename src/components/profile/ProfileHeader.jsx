'use client';

import {Avatar} from '@heroui/avatar';
import {Icon} from "@/components/common/Icon";
import {faUser} from "@fortawesome/free-solid-svg-icons";

export const ProfileHeader = () => {
    return (
        <div className="flex items-center text-center gap-4 ">
            <Avatar
                size="lg"
                showFallback
                fallback={<Icon icon={faUser}/>}
                src="https://avatars.githubusercontent.com/u/42060990?s=400&u=c18056777cbf4cdc521d3997c39e9330ea54933f&v=4"
            />

            <div className='flex flex-col items-start'>
                <h1 className="text-2xl font-bold text-gray-900">Имя пользователя</h1>
                <p className="text-gray-500 text-sm ">user@example.com</p>
            </div>
        </div>
    );
}