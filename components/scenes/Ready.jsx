'use client';

import useStore from '@/store/useStore';
import StartButtons from '../ui/StartButtons';

export default function Ready() {
  const startGame = useStore((state) => state.startGame);
  const appPhase = useStore((state) => state.appPhase);
  const isVisible = appPhase === 'ready';

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-50 overflow-hidden flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <StartButtons isReady={true} startGame={startGame} />
    </div>
  );
}
