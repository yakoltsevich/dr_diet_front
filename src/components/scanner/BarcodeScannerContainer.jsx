'use client';

import {useState} from 'react';
import {Button} from '@heroui/button';
import {axiosClient} from '@/lib/axiosClient';
import ZxingScanner from "@/components/scanner/ZxingScanner";
import {ScannerMask} from "@/components/scanner/ScannerMask";

export const BarcodeScannerContainer = ({setScannedData, onClose}) => {
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
            onClose();
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
        <div className="p-4 relative w-full max-w-md mx-auto">
            {isScanning && (
                <>
                    <ZxingScanner onResult={handleScanSuccess}/>
                    <ScannerMask/>
                </>
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
