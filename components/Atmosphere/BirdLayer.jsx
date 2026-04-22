'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import useStore from '@/store/useStore';
import AnimateBirds from '../animations/AnimateBirds';
import Bird from '../svgs/Bird';

export default function BirdLayer() {
  const containerRef = useRef(null);
  const flocks = useStore((state) => state.flocks);

  useGSAP(
    () => {
      if (flocks.length > 0) AnimateBirds('.anim-flock');
    },
    { scope: containerRef, dependencies: [flocks] },
  );

  if (flocks.length === 0) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {flocks.map((flock) => (
        <div key={`flock-${flock.id}`} className="anim-flock absolute top-0 left-0 z-30 w-16 h-16">
          {flock.birds.map((bird, i) => (
            <div key={i} className="absolute" style={{ transform: `translate(${bird.offsetX}px, ${bird.offsetY}px)` }}>
              <Bird flapDelay={bird.flapDelay} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
