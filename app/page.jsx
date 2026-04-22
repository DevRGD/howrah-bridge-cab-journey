'use client';

import React, { useEffect } from 'react';
import useStore from '@/store/useStore';
import preloadAssets from '@/utils/preload';
import { handleMessageAction } from '@/utils/interactions';
import Loading from '@/components/scenes/Loading';
import Idle from '@/components/scenes/Idle';
import Walk from '@/components/scenes/Walk';
import Ride from '@/components/scenes/Ride';
import Journey from '@/components/scenes/Journey';
import End from '@/components/scenes/End';
import Ready from '@/components/scenes/Ready';
import Message from '@/components/ui/Message';
import SettingsMenu from '@/components/ui/SettingsMenu';
import AtmosphereOverlay from '@/components/Atmosphere/AtmosphereOverlay';

export default function Page() {
  const appPhase = useStore((state) => state.appPhase);
  const activeMessage = useStore((state) => state.activeMessage);
  const initializeAtmosphere = useStore((state) => state.initializeAtmosphere);
  const resetKey = useStore((state) => state.resetKey);

  useEffect(() => {
    preloadAssets();
    initializeAtmosphere();
  }, [initializeAtmosphere]);

  const isSpecialPhase = ['loading', 'end'].includes(appPhase);

  return (
    <main className="fixed inset-0 w-full h-full bg-linear-to-b from-blue-500 via-sky-400 to-sky-200 overflow-hidden">
      <AtmosphereOverlay />

      {appPhase === 'loading' && <Loading />}
      {appPhase === 'ready' && <Ready />}
      {appPhase === 'end' && <End />}

      {!isSpecialPhase && (
        <React.Fragment key={resetKey}>
          <Idle />
          <Walk />
          <Ride />
          <Journey />
        </React.Fragment>
      )}

      <SettingsMenu />

      {activeMessage && (
        <Message
          text={activeMessage.text}
          buttonText={activeMessage.buttonText}
          hasInput={activeMessage.hasInput}
          side={activeMessage.side}
          onAction={(inputValue) => handleMessageAction(appPhase, inputValue)}
        />
      )}
    </main>
  );
}
