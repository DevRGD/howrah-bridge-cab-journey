'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import AnimateMist from '../animations/AnimateMist';

export default function MistLayer() {
  const containerRef = useRef(null);

  useGSAP(() => AnimateMist('.anim-mist'), { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="anim-mist absolute top-0 left-0 w-[60vw] h-[40vh] bg-white/40 blur-[100px] rounded-full"
        />
      ))}
    </div>
  );
}
