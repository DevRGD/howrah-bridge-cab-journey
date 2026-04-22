'use client';

import { useState, useEffect, useRef } from 'react';
import useStore from '@/store/useStore';
import { handleResetToIdle } from '@/utils/interactions';
import { playSFX } from '@/utils/audio';

export default function SettingsMenu() {
  const appPhase = useStore((state) => state.appPhase);
  const animationSpeed = useStore((state) => state.animationSpeed);
  const setAnimationSpeed = useStore((state) => state.setAnimationSpeed);
  const setAppPhase = useStore((state) => state.setAppPhase);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const validPhases = ['idle', 'walk', 'ride', 'journey'];
  if (!validPhases.includes(appPhase)) return null;

  const handleSpeedAdjust = (delta) => {
    const newSpeed = Math.max(0, Math.min(5, animationSpeed + delta));
    setAnimationSpeed(newSpeed);
  };

  return (
    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 pointer-events-auto" ref={menuRef}>
      <div
        className={`flex flex-col items-center bg-black/40 backdrop-blur-xl border border-white/20 rounded-[28px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden shadow-2xl w-14 ${
          isOpen ? 'h-[300px]' : 'h-14'
        }`}
      >
        <button
          onClick={() => {
          setIsOpen(!isOpen);
          playSFX('click');
        }}
          className="w-14 h-14 flex-shrink-0 flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer group active:scale-90"
          title="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-6 h-6 text-white/90 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } group-hover:scale-110`}
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 .1 3.46l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-.1-3.46l.15-.08a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        <div
          className={`flex flex-col items-center w-full transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-8 h-[1px] bg-white/10 mb-1" />

          <button
            onClick={() => {
              toggleSound();
              playSFX('click');
            }}
            className="w-14 h-12 flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer group active:scale-90"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white/40 group-hover:scale-110 transition-transform"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          <div className="w-8 h-[1px] bg-white/10 my-1" />

          <div className="flex flex-col items-center py-2 gap-2">
            <button
              onClick={() => {
                handleSpeedAdjust(0.5);
                playSFX('click');
              }}
              className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-all cursor-pointer group active:scale-90"
              title="Increase Speed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-white/70 group-hover:-translate-y-0.5 transition-transform"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
            <span className="text-[11px] font-mono font-bold text-white/90 bg-white/10 px-2 py-0.5 rounded shadow-inner">
              {animationSpeed.toFixed(1)}
            </span>
            <button
              onClick={() => {
                handleSpeedAdjust(-0.5);
                playSFX('click');
              }}
              className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-all cursor-pointer group active:scale-90"
              title="Decrease Speed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-white/70 group-hover:translate-y-0.5 transition-transform"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className="w-8 h-[1px] bg-white/10 my-1" />

          <button
            onClick={() => handleResetToIdle(setAppPhase, setIsOpen)}
            className="w-14 h-14 flex items-center justify-center hover:bg-red-500/20 active:bg-red-500/30 transition-all cursor-pointer group active:scale-90"
            title="Reset to Idle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-red-400 group-hover:rotate-[-180deg] transition-transform duration-500"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
