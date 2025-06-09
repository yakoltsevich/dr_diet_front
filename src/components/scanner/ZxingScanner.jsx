'use client';

import {useEffect, useRef} from 'react';
import {BrowserMultiFormatReader} from '@zxing/browser';

export const ZxingScanner = ({onResult}) => {
    const videoRef = useRef(null);
    const controlsRef = useRef(null);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        const constraints = {
            video: {
                facingMode: 'environment',
                width: {ideal: 1280},
                height: {ideal: 720},
                aspectRatio: window.innerWidth < window.innerHeight ? 3 / 4 : 4 / 3, // адаптация под экран
            }
        };

        codeReader
            .decodeFromConstraints(constraints, videoRef.current, (result, error, controls) => {
                if (result) {
                    console.log('Barcode detected:', result.getText());
                    onResult?.(result.getText());
                    controls.stop();
                }
                if (error && error.name !== 'NotFoundException') {
                    console.warn('Decode error:', error);
                }
            })
            .then((controls) => {
                controlsRef.current = controls;
            })
            .catch((err) => {
                console.error('Camera error:', err);
            });

        return () => {
            controlsRef.current?.stop();
        };
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <video
                ref={videoRef}
                className="rounded-lg shadow-lg w-full h-full object-contain"
                muted
                playsInline
            />
        </div>
    );
};
