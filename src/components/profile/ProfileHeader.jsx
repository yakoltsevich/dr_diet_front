'use client';

import {Avatar} from '@heroui/avatar';
import {Icon} from "@/components/common/Icon";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {axiosClient} from "@/lib/axiosClient";

export const ProfileHeader = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const {data} = await axiosClient.get('/users/me');
            console.log('data', data);
            setUserData(data);
        } catch (error) {
            console.error('Ошибка загрузки профиля', error);
        }
    };
    return (
        <div className="flex items-center text-center gap-4 ">
            <Avatar
                size="lg"
                showFallback
                fallback={<Icon icon={faUser}/>}
                src="/girl.png"
            />

            <div className='flex flex-col items-start'>
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-500 text-sm ">{userData.email}</p>
            </div>
        </div>
    );
}