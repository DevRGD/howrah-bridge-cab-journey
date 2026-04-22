'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import useStore from '@/store/useStore';
import Button from '../ui/Buttons';
import AnimateEnd from '../animations/AnimateEnd';

export default function End() {
  const destination = useStore((state) => state.destination);
  const setAppPhase = useStore((state) => state.setAppPhase);
  const appPhase = useStore((state) => state.appPhase);
  const isVisible = appPhase === 'end';

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => AnimateEnd(containerRef.current, contentRef.current, isVisible), { dependencies: [isVisible] });

  const handleStartOver = () => {
    setAppPhase('idle');
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 text-center opacity-0 overflow-hidden pointer-events-none"
    >
      <div ref={contentRef} className="relative z-10 flex flex-col items-center w-full max-w-5xl pointer-events-auto">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-2xl tracking-tighter mb-4 leading-tight whitespace-nowrap uppercase">
          Happy Journey to <span className="text-blue-900 drop-shadow-xl">{destination}!</span>
        </h1>

        <p className="text-white/60 text-base md:text-xl font-serif italic tracking-wide mb-12 max-w-[280px] sm:max-w-md md:max-w-lg">
          May your path be as wonderful as the destination itself.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Button onClick={handleStartOver} className="scale-110">
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}
