import { useEffect, useRef } from 'react';
import useStore from '@/store/useStore';

export function useBirdLoader() {
  const appPhase = useStore((state) => state.appPhase);
  const setAppPhase = useStore((state) => state.setAppPhase);

  const loadingProgress = useStore((state) => state.loadingProgress);
  const birdRefs = useRef([]);
  const globalAngleRef = useRef(0);
  const exitAngleRef = useRef(Infinity);
  const lastTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : 0);
  const animationFinishedRef = useRef(false);

  const isFinishing = (appPhase === 'loading' && loadingProgress === 100) || appPhase === 'ready';
  const numBirds = 15;
  const radius = 110;
  const spacing = 360 / numBirds;
  const speedPerMs = 60 / 1000;

  useEffect(() => {
    if (appPhase === 'loading' && loadingProgress === 100 && exitAngleRef.current === Infinity) {
      exitAngleRef.current = globalAngleRef.current;
    }
  }, [appPhase, loadingProgress]);

  useEffect(() => {
    let animationFrameId;

    const animate = (time) => {
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;
      const clampedDt = Math.min(dt, 50);
      globalAngleRef.current += speedPerMs * clampedDt;

      let anyBirdVisible = false;

      birdRefs.current.forEach((birdNode, i) => {
        if (!birdNode) return;

        const birdAngle = globalAngleRef.current - i * spacing;
        const notYetSpawned = birdAngle < 0;
        const hasPassedExit = isFinishing && (birdAngle >= exitAngleRef.current || notYetSpawned);
        const isVisible = birdAngle >= 0 && !hasPassedExit;

        if (isVisible) anyBirdVisible = true;

        const activeAngle = isVisible ? birdAngle : hasPassedExit ? exitAngleRef.current : 0;
        const rad = (activeAngle - 90) * (Math.PI / 180);
        const targetX = Math.cos(rad) * radius;
        const targetY = Math.sin(rad) * radius;
        const rotation = activeAngle + 90;

        birdNode.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg)`;
        birdNode.style.opacity = isVisible ? '1' : '0';
      });

      if (appPhase === 'loading' && loadingProgress === 100 && !anyBirdVisible && !animationFinishedRef.current) {
        animationFinishedRef.current = true;
        setAppPhase('ready');
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [appPhase, setAppPhase, isFinishing, speedPerMs, spacing, radius, loadingProgress]);

  return {
    birdRefs,
    appPhase,
    numBirds,
  };
}
