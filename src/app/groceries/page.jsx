'use client'

import React, {useEffect, useState} from 'react';
import {Card, CardBody} from '@heroui/card';
import {Spinner} from '@heroui/spinner';
import {axiosClient} from '@/lib/axiosClient';

export default function GroceriesPage() {
    const [groceries, setGroceries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGroceries();
    }, []);

    const getGroceries = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/groceries');
            setGroceries(response.data.items);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f3f2] px-4 py-6">
            <h1 className="text-2xl font-bold text-[#353535] mb-6">Shopping List</h1>

            {loading && (
                <div className="flex justify-center py-10">
                    <Spinner/>
                </div>
            )}


            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groceries.map((g, index) => (
                        <Card key={index} className="rounded-2xl shadow-md">
                            <CardBody className="flex justify-between items-center p-4">
                                <span className="text-[#353535] font-medium">{g.item}</span>
                                <span className="text-[#5e7a76] font-semibold">{g.amount}</span>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}