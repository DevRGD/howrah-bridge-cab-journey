'use client';

import { handleStartJourney } from '@/utils/interactions';
import Button from './Buttons';

export default function StartButtons({ isReady, startGame }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-10 transition-all duration-1000 ease-out delay-500 z-40 ${
        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      <Button onClick={() => handleStartJourney(true, startGame)}>Begin Journey</Button>

      <button
        onClick={() => handleStartJourney(false, startGame)}
        className={`text-white/30 hover:text-white/60 underline decoration-white/10 hover:decoration-white/30 underline-offset-8 font-bold text-[9px] uppercase tracking-[0.4em] transition-all duration-700 cursor-pointer ${
          isReady ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        Start without sound
      </button>
    </div>
  );
}
