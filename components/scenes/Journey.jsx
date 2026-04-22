'use client';

import LottiePlayer from '@/components/ui/LottiePlayer';
import useStore from '@/store/useStore';
import { APP_CONFIG } from '@/data/constants';
import { useCrossfade } from '@/hooks/useCrossfade';

export default function Journey() {
  const animationData = useStore((state) => state.journeyAnimationData);
  const appPhase = useStore((state) => state.appPhase);
  const animationSpeed = useStore((state) => state.animationSpeed);
  const setAppPhase = useStore((state) => state.setAppPhase);

  const isActive = appPhase === 'journey';
  const isOpaque = useCrossfade(isActive);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-30 transition-opacity duration-500 ${
        isOpaque ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 w-full h-full [&>svg]:block [&>svg]:w-full [&>svg]:h-full [&>canvas]:block [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:object-cover">
        <LottiePlayer
          animationData={animationData}
          speed={animationSpeed}
          delay={APP_CONFIG.ANIMATION_INIT_DELAY}
          onComplete={() => setAppPhase('end')}
          isPaused={!isActive}
          className="[&>div>svg]:block [&>div>svg]:w-full [&>div>svg]:h-full [&>div>canvas]:block [&>div>canvas]:w-full [&>div>canvas]:h-full [&>div>canvas]:object-cover"
        />
      </div>
    </div>
  );
}
