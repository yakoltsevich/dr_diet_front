'use client';
import { useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

export const ZxingImageScanner = ({ onResult }) => {
    const inputRef = useRef(null);
    const imageRef = useRef(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const imageElement = new Image();
            imageElement.src = reader.result;

            imageElement.onload = async () => {
                try {
                    const codeReader = new BrowserMultiFormatReader();
                    const result = await codeReader.decodeFromImage(imageElement);
                    if (result) {
                        onResult(result.getText());
                    }
                } catch (err) {
                    console.warn('Ошибка сканирования:', err);
                }
            };

            imageRef.current.src = reader.result;
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-[#5e7a76] file:text-white
          hover:file:bg-[#4e6c67]
        "
            />
            <img
                ref={imageRef}
                alt="Загруженное изображение"
                className="max-w-full h-auto rounded-lg shadow"
            />
        </div>
    );
};
