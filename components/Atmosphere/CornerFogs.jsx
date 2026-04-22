'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import AnimateCornerFogs from '../animations/AnimateCornerFogs';

export default function CornerFogs() {
  const containerRef = useRef(null);
  const cornerGradient = 'radial-gradient(circle at center, rgba(180, 190, 200, 0.95) 0%, transparent 60%)';
  const fogClass = 'anim-corner-fog absolute w-[60vmax] h-[60vmax] rounded-full';

  useGSAP(() => AnimateCornerFogs('.anim-corner-fog'), { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <div className={`${fogClass} -top-[40%] -left-[30%]`} style={{ background: cornerGradient }} />
      <div className={`${fogClass} -top-[40%] -right-[30%]`} style={{ background: cornerGradient }} />
      <div className={`${fogClass} -bottom-[40%] -left-[30%]`} style={{ background: cornerGradient }} />
      <div className={`${fogClass} -bottom-[40%] -right-[30%]`} style={{ background: cornerGradient }} />
    </div>
  );
}
