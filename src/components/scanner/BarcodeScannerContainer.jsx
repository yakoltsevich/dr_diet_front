'use client';

import {useState} from 'react';
import {Button} from '@heroui/button';
import {axiosClient} from '@/lib/axiosClient';
import ZxingScanner from "@/components/scanner/ZxingScanner";

export const BarcodeScannerContainer = ({setScannedData, setAddModal, onClose}) => {
    const [isScanning, setIsScanning] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleScanSuccess = async (barcode) => {
        setIsScanning(false);
        setLoading(true);
        setError(null);

        try {
            const res = await axiosClient.get(`/barcode/${barcode}`);
            setScannedData(res.data);
            onClose()
            setAddModal(true)
        } catch (e) {
            setError(
                e.response?.status === 404
                    ? 'Продукт не найден'
                    : e.response?.data?.message || 'Ошибка при запросе'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setError(null);
        setIsScanning(true);
    };

    return (
        <div className="p-4">
            {isScanning && (
                <ZxingScanner
                    onResult={handleScanSuccess}
                    onScanSuccess={handleScanSuccess}
                    onScanError={(err) => {
                        console.warn('Сканер: ошибка сканирования', err);
                        setError('Не удалось запустить сканер');
                        setIsScanning(false);
                    }}
                />
            )}

            {loading && <p className="text-sm text-gray-500 mt-2">Загрузка продукта...</p>}

            {error && (
                <div className="mt-4 text-red-600">
                    <p>{error}</p>
                    <Button onPress={handleRetry} className="mt-2">Повторить</Button>
                </div>
            )}
        </div>
    );
};
