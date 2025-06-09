'use client';

import {useEffect, useRef} from 'react';
import {BrowserMultiFormatReader} from '@zxing/browser';

export const ZxingScanner = ({onResult}) => {
    const videoRef = useRef(null);
    const controlsRef = useRef(null);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        codeReader
            .decodeFromVideoDevice(null, videoRef.current, (result, error, controls) => {
                if (result) {
                    console.log('Barcode detected:', result.getText());
                    if (onResult) onResult(result.getText());
                    controls.stop(); // остановка после первого успешного считывания
                }
                if (error) {
                    // можно игнорировать NotFoundException, т.к. это просто отсутствие кода
                    if (error.name !== 'NotFoundException') {
                        console.warn('Decode error:', error);
                    }
                }
            })
            .then((controls) => {
                controlsRef.current = controls;
            })
            .catch((err) => {
                console.error('Camera error:', err);
            });

        return () => {
            if (controlsRef.current) {
                controlsRef.current.stop();
            }
        };
    }, []);

    return (
        <div className="w-full h-full flex justify-center">
            <video ref={videoRef} className="rounded-lg shadow-lg w-full h-auto h-full"/>
        </div>
    );
}
