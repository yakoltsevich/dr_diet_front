// src/app/profile/page.jsx
'use client';

import {motion} from 'framer-motion';
import {ProfileHeader} from "@/components/profile/ProfileHeader";
import {UserProfileForm} from "@/components/profile/UserProfileForm";

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-2 mx-auto p-4">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <ProfileHeader/>
            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.2}}
            >
                <UserProfileForm/>
            </motion.div>
        </div>
    );
}