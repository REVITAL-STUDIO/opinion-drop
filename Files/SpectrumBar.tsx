'use client'

import React, { useState } from 'react';

const SpectrumBar: React.FC = () => {
    const [position, setPosition] = useState(50); // Initial position (50% of the spectrum)

    const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
        const spectrumBar = event.currentTarget.parentElement!;
        const newPosition = (event.clientX - spectrumBar.offsetLeft) / spectrumBar.offsetWidth;
        setPosition(Math.min(Math.max(newPosition * 100, 0), 100)); // Clamp position between 0 and 100
    };

    return (
        <div className="relative w-[50%] h-4 bg-gray-200 rounded-lg overflow-hidden"
             onMouseMove={handleDrag} onMouseDown={handleDrag}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400"></div>
            <div style={{ left: `${position}%` }} className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md cursor-pointer"></div>
        </div>
    );
}

export default SpectrumBar;