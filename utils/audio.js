'use client';

import { Howl, Howler } from 'howler';
import useStore from '@/store/useStore';

export const phaseSounds = {};

export const sfx = {
  'car-door-close': null,
  'car-door-open': null,
  'car-horn': null,
  'car-stop': null,
  'cars-starting': null,
  click: null,
  message: null,
  typing: null,
  walk: null,
};

export const initAudio = async () => {
  if (typeof window === 'undefined') return;

  const { ambientSound, soundEnabled } = useStore.getState();
  let ambient = ambientSound;

  if (!ambient) {
    ambient =
      window.__AMBIENT_SOUND__ ||
      new Howl({
        src: ['/sounds/ambient.wav'],
        loop: true,
        volume: 0.8,
        preload: true,
        html5: true,
      });

    if (typeof window !== 'undefined') {
      window.__AMBIENT_SOUND__ = ambient;
    }
    useStore.setState({ ambientSound: ambient });
  }

  Object.keys(sfx).forEach((key) => {
    if (!sfx[key]) {
      sfx[key] = new Howl({
        src: [`/sounds/${key}.wav`],
        loop: key === 'typing',
        volume: 1.0,
        preload: true,
      });
    }
  });

  if (Howler.ctx && Howler.ctx.state === 'suspended') {
    Howler.ctx.resume();
  }

  if (!ambient.playing()) {
    ambient.play();
  }

  useStore.subscribe(
    (state) => state.soundEnabled,
    (soundEnabled) => {
      Howler.mute(!soundEnabled);
    },
    { fireImmediately: true },
  );
};

export const playSFX = (key, onEnd) => {
  const { soundEnabled } = useStore.getState();
  if (soundEnabled && sfx[key]) {
    if (sfx[key].playing() && key === 'typing') return;
    if (onEnd) {
      sfx[key].once('end', onEnd);
    }
    sfx[key].play();
  } else if (onEnd) {
    onEnd();
  }
};

export const stopSFX = (key) => {
  if (sfx[key]) {
    sfx[key].stop();
  }
};

export const stopAllPhaseSounds = () => {
  Object.values(phaseSounds).forEach((sound) => {
    if (sound && sound.playing()) {
      sound.stop();
    }
  });
};

export const toggleMute = (muted) => {
  if (typeof window === 'undefined') return;
  useStore.setState({ soundEnabled: !muted });
};
