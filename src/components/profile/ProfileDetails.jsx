'use client';

import {Input} from '@heroui/input';
import {Button} from '@heroui/button';

export function ProfileDetails() {
    return (
        <div className="flex flex-col gap-4">
            <Input
                label="Name"
                placeholder="Введите ваше имя"
                defaultValue="Имя пользователя"
                labelPlacement='outside'
            />
            <Input
                placeholder="Введите ваш email"
                defaultValue="user@example.com"
                labelPlacement='outside'
                label='Email'
            />
            <div>
                <Button size='md'>
                    Save Changes
                </Button>
            </div>
        </div>

    );
}
