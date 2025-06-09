'use client';
import {useEffect, useRef} from 'react';
import {BrowserCodeReader, BrowserMultiFormatReader} from '@zxing/browser';

export const ZxingScanner = ({onResult}) => {
    const videoRef = useRef(null);
    const controlsRef = useRef(null);

    const stopScannerCompletely = () => {
        BrowserCodeReader.releaseAllStreams();
        const videoEl = videoRef.current;
        if (videoEl instanceof HTMLVideoElement) {
            BrowserCodeReader.cleanVideoSource(videoEl);
        }
    };

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        codeReader
            .decodeFromVideoDevice(null, videoRef.current, (result, error, controls) => {
                if (result) {
                    onResult(result.getText());
                    controls.stop();
                    stopScannerCompletely();
                }
                if (error && error.name !== 'NotFoundException') {
                    console.warn(error);
                }
            })
            .then((controls) => (controlsRef.current = controls))
            .catch(console.error);

        return () => {
            controlsRef.current?.stop();
            stopScannerCompletely();
        };
    }, [onResult]);

    return (
        <div className="w-full flex justify-center">
            <video ref={videoRef} className="rounded-lg shadow-lg w-full h-auto" autoPlay muted playsInline/>
        </div>
    );
};
