'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import useStore from '@/store/useStore';
import Cloud from '../svgs/Cloud';
import AnimateClouds from '../animations/AnimateClouds';

export default function CloudLayer() {
  const containerRef = useRef(null);
  const clouds = useStore((state) => state.clouds);

  useGSAP(
    () => {
      if (clouds.length > 0) {
        AnimateClouds('.anim-cloud');
      }
    },
    { scope: containerRef, dependencies: [clouds] },
  );

  if (clouds.length === 0) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.id}`}
          className="anim-cloud absolute top-0 left-0"
          style={{ transform: `scale(${cloud.scale})` }}
        >
          <Cloud id={cloud.id} opacity={cloud.opacity} flip={cloud.flip} breathDelay={cloud.breathDelay} />
        </div>
      ))}
    </div>
  );
}
