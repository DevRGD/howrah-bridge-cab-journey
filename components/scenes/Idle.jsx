import { useState, useCallback } from 'react';
import LottiePlayer from '@/components/ui/LottiePlayer';
import useStore from '@/store/useStore';
import { APP_CONFIG } from '@/data/constants';
import { useCrossfade } from '@/hooks/useCrossfade';

export default function Idle() {
  const [direction, setDirection] = useState(1);
  const appPhase = useStore((state) => state.appPhase);
  const animationData = useStore((state) => state.idleAnimationData);
  const animationSpeed = useStore((state) => state.animationSpeed);

  const isActive = appPhase === 'idle';
  const isOpaque = useCrossfade(isActive);

  const handleComplete = useCallback(() => {
    setDirection((d) => (d === 1 ? -1 : 1));
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-opacity duration-500 ${
        isOpaque ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <LottiePlayer
        animationData={animationData}
        loop={false}
        speed={animationSpeed}
        direction={direction}
        delay={APP_CONFIG.IDLE_INIT_DELAY}
        onComplete={handleComplete}
        isPaused={!isActive}
        className="[&>div>svg]:block [&>div>svg]:w-full [&>div>svg]:h-full [&>div>canvas]:block [&>div>canvas]:w-full [&>div>canvas]:h-full [&>div>canvas]:object-cover"
      />
    </div>
  );
}
