'use client';
import { useRef, useState, useEffect } from 'react';
import { BrowserMultiFormatReader, BrowserCodeReader } from '@zxing/browser';
import { Button } from '@heroui/button';

export const ZxingHybridScanner = ({ onResult }) => {
    const [mode, setMode] = useState('camera'); // 'camera' | 'image'
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);
    const controlsRef = useRef(null);

    const stopCamera = () => {
        BrowserCodeReader.releaseAllStreams();
        if (videoRef.current instanceof HTMLVideoElement) {
            BrowserCodeReader.cleanVideoSource(videoRef.current);
        }
    };

    useEffect(() => {
        if (mode === 'camera') {
            const codeReader = new BrowserMultiFormatReader();
            codeReader
                .decodeFromVideoDevice(null, videoRef.current, (result, error, controls) => {
                    if (result) {
                        onResult(result.getText());
                        controls.stop();
                        stopCamera();
                    }
                })
                .then((controls) => (controlsRef.current = controls))
                .catch(console.error);
        }

        return () => {
            controlsRef.current?.stop();
            stopCamera();
        };
    }, [mode, onResult]);

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageElement = new Image();

            imageElement.src = reader.result;

            imageElement.onload = async () => {

                try {
                    const codeReader = new BrowserMultiFormatReader();
                    console.log(codeReader);
                    const result = await codeReader.decodeFromImageElement(imageElement);
                    console.log('result', result);

                    if (result) {
                        onResult(result.getText());
                    }
                } catch (err) {
                    console.log('Ошибка сканирования:', err.message);
                }
            };

            imageRef.current.src = reader.result;
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
            <div className="flex gap-2">
                <Button onClick={() => setMode('camera')} variant={mode === 'camera' ? 'solid' : 'outline'}>
                    📷 Камера
                </Button>
                <Button onClick={() => setMode('image')} variant={mode === 'image' ? 'solid' : 'outline'}>
                    🖼 Фото
                </Button>
            </div>

            {mode === 'camera' && (
                <video ref={videoRef} className="rounded-xl shadow-lg w-full h-auto" autoPlay muted playsInline />
            )}

            {mode === 'image' && (
                <div className="w-full flex flex-col items-center gap-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="file:bg-[#5e7a76] file:text-white file:rounded-full file:px-4 file:py-2 text-sm"
                    />
                    <img ref={imageRef} alt="Превью" className="rounded-lg max-h-96 shadow-lg" />
                </div>
            )}
        </div>
    );
};
