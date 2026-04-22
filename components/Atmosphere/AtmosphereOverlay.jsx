'use client';

import useStore from '@/store/useStore';
import Vignette from './Vignette';
import MistLayer from './MistLayer';
import BirdLayer from './BirdLayer';
import CornerFogs from './CornerFogs';
import CloudLayer from './CloudLayer';

export default function AtmosphereOverlay() {
  const appPhase = useStore((state) => state.appPhase);
  const isEndScreen = useStore((state) => state.isEndScreen);

  const isVisible = ['loading', 'ready', 'idle', 'end'].includes(appPhase) || isEndScreen;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-40 overflow-hidden transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Vignette />
      {(appPhase === 'idle' || appPhase === 'end' || isEndScreen) && <CornerFogs />}
      {(appPhase === 'idle' || appPhase === 'end' || isEndScreen) && <MistLayer />}
      <CloudLayer />
      <BirdLayer />
    </div>
  );
}
