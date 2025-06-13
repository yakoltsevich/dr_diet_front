'use client';
import { useRef, useState } from 'react';
import {
    TransformWrapper,
    TransformComponent,
} from 'react-zoom-pan-pinch';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Button } from '@heroui/button';

export const ImageCropScanner = ({ onResult }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file:bg-[#5e7a76] file:text-white file:rounded-full file:px-4 file:py-2 text-sm"
            />

            {imageSrc && (
                <div className="w-full max-w-md border rounded-lg shadow overflow-hidden">
                    <TransformWrapper
                        wheel={{ step: 100 }}
                        doubleClick={{ disabled: true }}
                        pinch={{ step: 5 }}
                        zoomAnimation={{ animationTime: 300 }}
                    >
                        {(transform) => {
                            const { state } = transform;

                            return (
                                <>
                                    <TransformComponent wrapperClass="overflow-hidden">
                                        <img
                                            ref={imgRef}
                                            src={imageSrc}
                                            alt="preview"
                                            className="w-full h-auto select-none pointer-events-none"
                                        />
                                    </TransformComponent>

                                    <div className="w-full flex justify-center py-4">
                                        <Button
                                            onClick={async () => {
                                                const canvas = canvasRef.current;
                                                const img = imgRef.current;
                                                if (!canvas || !img) return;

                                                const container = img.parentElement;
                                                const scale = state.scale;
                                                const positionX = state.positionX;
                                                const positionY = state.positionY;

                                                const viewWidth = container.offsetWidth;
                                                const viewHeight = container.offsetHeight;

                                                const sx = -positionX / scale;
                                                const sy = -positionY / scale;
                                                const sw = viewWidth / scale;
                                                const sh = viewHeight / scale;

                                                canvas.width = viewWidth;
                                                canvas.height = viewHeight;

                                                const ctx = canvas.getContext('2d');
                                                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, viewWidth, viewHeight);

                                                // 💾 Сохраняем кроп для отладки
                                                const a = document.createElement('a');
                                                a.href = canvas.toDataURL();
                                                a.download = 'debug-cropped-image.png';
                                                a.click();

                                                const imageElement = new Image();
                                                imageElement.src = canvas.toDataURL();
                                                imageElement.onload = async () => {
                                                    try {
                                                        const codeReader = new BrowserMultiFormatReader();
                                                        const result = await codeReader.decodeFromImageElement(imageElement);
                                                        if (result) {
                                                            onResult(result.getText());
                                                        }
                                                    } catch (err) {
                                                        console.log('Ошибка сканирования:', err.message);
                                                    }
                                                };
                                            }}
                                        >
                                            🔍 Сканировать видимую область
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </TransformWrapper>
                </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};
