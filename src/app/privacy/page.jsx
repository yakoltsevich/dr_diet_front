'use client';

import {useEffect, useState} from 'react';
import {axiosClient} from "@/lib/axiosClient";

export default function PrivacyPage() {
    const [data, setData] = useState('');

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData()
    }, []);
    const getData = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/legal/privacy');
            console.log('response', response);
            setData(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto text-[#353535]">
            <h1 className="text-2xl font-semibold mb-4">Политика конфиденциальности</h1>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </div>
    );
}
