'use client';

export const ScannerMask = () => {
    const bars = Array.from({ length: 60 }, (_, i) => {
        const x = i * 4; // Увеличен шаг для большей ширины
        const width = i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1;
        return { x, width };
    });

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <svg
                width="320px"
                height="120px"
                viewBox="0 0 240 120"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
            >
                {bars.map((bar, i) => (
                    <rect
                        key={i}
                        x={bar.x}
                        y={0}
                        width={bar.width}
                        height={120}
                        fill="white"
                    />
                ))}
            </svg>
        </div>
    );
};
