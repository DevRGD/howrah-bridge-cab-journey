'use client';

import { useRef } from 'react';

export default function Button({ children, onClick, className = '' }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btnRef.current.style.setProperty('--x', `${x}px`);
    btnRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative px-8 py-4 sm:px-14 sm:py-6 overflow-hidden border border-white/20 text-white/80 font-serif tracking-[0.2em] sm:tracking-[0.4em] uppercase transition-all duration-500 hover:text-white hover:border-white/50 active:scale-95 shadow-[0_0_40px_rgba(0,0,0,0.15)] cursor-pointer backdrop-blur-sm ${className}`}
    >
      <span
        className="absolute w-0 h-0 transition-[width,height] duration-700 ease-out bg-linear-to-br from-blue-400/60 via-sky-200/60 to-blue-300/60 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:w-175 group-hover:h-100 blur-[20px]"
        style={{ left: 'var(--x, 50%)', top: 'var(--y, 50%)' }}
      />
      <span className="relative z-10 transition-colors duration-300 font-medium text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em]">{children}</span>
    </button>
  );
}
