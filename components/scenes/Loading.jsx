'use client';

import useStore from '@/store/useStore';
import { useBirdLoader } from '@/hooks/useBirdLoader';
import Bird from '../svgs/Bird';

export default function Loading() {
  const loadingProgress = useStore((state) => state.loadingProgress);
  const appPhase = useStore((state) => state.appPhase);
  const isVisible = appPhase === 'loading';

  const { birdRefs, numBirds } = useBirdLoader();

  const showProgress = loadingProgress < 100;

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-50 overflow-hidden flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex items-center justify-center w-64 h-64 z-40">
        <div
          className={`absolute flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
            !showProgress ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
        >
          <div className="text-white font-serif text-5xl tracking-widest drop-shadow-md">{loadingProgress}</div>
        </div>

        {Array.from({ length: numBirds }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (birdRefs.current[i] = el)}
            className="absolute"
            style={{ opacity: 0, transition: 'opacity 0.2s ease-out', willChange: 'transform, opacity' }}
          >
            <Bird flapDelay={i * -0.2} />
          </div>
        ))}
      </div>
    </div>
  );
}
