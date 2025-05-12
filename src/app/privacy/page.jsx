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
            <h1 className="text-2xl font-semibold mb-4">{data.title}</h1>
            <p className="text-sm text-gray-500 mb-6">Обновлено: {data.lastUpdated}</p>
            {data.sections?.map((section, idx) => (
                <div key={idx} className="mb-6">
                    <h2 className="text-xl font-medium mb-2">{section.heading}</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {section.content.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
