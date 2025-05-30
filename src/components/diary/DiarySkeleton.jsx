'use client';

import {Card, CardBody} from '@heroui/card';
import {Button} from '@heroui/button';
import {Icon} from '@/components/common/Icon';
import {faClone, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Chip, Skeleton} from '@heroui/react';

export const DiarySkeleton = ({isLoaded}) => {
    return (
        <div className="space-y-4">
            <Card>
                <CardBody className="p-4 space-y-2">
                    <div className="flex justify-between items-center gap-2">
                        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                            <div className=''>
                                <h2 className="font-semibold text-lg">asdsasdasdasd a</h2>
                                <div className="text-sm text-gray-400">dasd</div>
                            </div>
                        </Skeleton>
                        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                            <div className="flex">
                                <Button isIconOnly>
                                    <Icon icon={faPen}/>
                                </Button>
                                <Button
                                    isIconOnly
                                >
                                    <Icon icon={faClone}/>
                                </Button>
                                <Button
                                    variant="light"
                                    isIconOnly
                                    className="text-gray-700"
                                >
                                    <Icon icon={faTrashCan}/>
                                </Button>
                            </div>
                        </Skeleton>
                    </div>
                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>

                        <div className="text-sm text-muted-foreground rounded-lg ">
                            <div className='font-semibold'>- asfasfasf</div>
                            <div className='space-x-2'>
                                <Chip size='sm'
                                      className="h-4 px-0">afasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">afsaf</Chip>
                            </div>
                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>

                        <div className="text-sm text-muted-foreground rounded-lg ">
                            <div className='font-semibold'>- asfasfasf</div>
                            <div className='space-x-2'>
                                <Chip size='sm'
                                      className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">afasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">afsaf</Chip>
                            </div>
                        </div>
                    </Skeleton>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="p-4 space-y-2">
                    <div className="flex justify-between items-center gap-2">
                        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                            <div className=''>
                                <h2 className="font-semibold text-lg">asdsasdasdasd a</h2>
                                <div className="text-sm text-gray-400">dasd</div>
                            </div>
                        </Skeleton>
                        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                            <div className="flex">
                                <Button isIconOnly>
                                    <Icon icon={faPen}/>
                                </Button>
                                <Button
                                    isIconOnly
                                >
                                    <Icon icon={faClone}/>
                                </Button>
                                <Button
                                    variant="light"
                                    isIconOnly
                                    className="text-gray-700"
                                >
                                    <Icon icon={faTrashCan}/>
                                </Button>
                            </div>
                        </Skeleton>
                    </div>
                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                        <div className="text-sm text-muted-foreground rounded-lg ">
                            <div className='font-semibold'>- asfasfasf</div>
                            <div className='space-x-2'>
                                <Chip size='sm'
                                      className="h-4 px-0">afasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">afsaf</Chip>
                            </div>
                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                        <div className="text-sm text-muted-foreground rounded-lg ">
                            <div className='font-semibold'>- asfasfasf</div>
                            <div className='space-x-2'>
                                <Chip size='sm'
                                      className="h-4 px-0">afasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">afsaf</Chip>
                            </div>
                        </div>
                    </Skeleton>
                    <Skeleton className="rounded-lg" isLoaded={isLoaded}>

                        <div className="text-sm text-muted-foreground rounded-lg ">
                            <div className='font-semibold'>- asfasfasf</div>
                            <div className='space-x-2'>
                                <Chip size='sm'
                                      className="h-4 px-0 bg-[#d6d6d6] text-[#353535]">afasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#d9e0dd] text-[#354e49]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#f1e8e0] text-[#6d5a48]">asfasf</Chip>
                                <Chip size='sm'
                                      className="h-4 px-0  bg-[#e1eaea] text-[#4e5e5e]">afsaf</Chip>
                            </div>
                        </div>
                    </Skeleton>
                </CardBody>
            </Card>
        </div>
    );
}
