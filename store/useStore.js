'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import generateClouds from '@/utils/generateClouds';
import generateFlocks from '@/utils/generateFlocks';
import { PHASE_MESSAGES } from '@/data/messages';
import { APP_CONFIG } from '@/data/constants';

const useStore = create(
  subscribeWithSelector((set, get) => ({
    appPhase: 'loading',
    loadingProgress: 0,
    downloadedMB: 0,
    totalMB: APP_CONFIG.TOTAL_MB,
    soundEnabled: false,
    isPreloading: false,
    isEndScreen: false,
    resetKey: 0,

    clouds: [],
    flocks: [],

    initializeAtmosphere: () => {
      set({
        clouds: generateClouds(),
        flocks: generateFlocks(),
      });
    },

    ambientSound: null,
    idleAnimationData: null,
    currentMessage: PHASE_MESSAGES['loading'],
    activeMessage: PHASE_MESSAGES['loading'],
    animationSpeed: 1,
    destination: '',
    walkAnimationData: null,
    rideAnimationData: null,
    journeyAnimationData: null,

    setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
    setDestination: (destination) => set({ destination }),

    showActiveMessage: () => {
      const { currentMessage } = get();
      set({ activeMessage: currentMessage });
    },

    toggleSound: async () => {
      const { soundEnabled } = get();
      const newState = !soundEnabled;
      set({ soundEnabled: newState });

      if (newState) {
        const { initAudio } = await import('@/utils/audio');
        await initAudio();
      }
    },

    resetScenes: () => set((state) => ({ resetKey: state.resetKey + 1 })),

    setAppPhase: (phase) => {
      const msg = PHASE_MESSAGES[phase] || null;
      set({
        appPhase: phase,
        currentMessage: msg,
        activeMessage: null,
        isEndScreen: phase === 'end',
      });

      if (phase === 'idle') {
        setTimeout(() => {
          set({ activeMessage: msg });
        }, APP_CONFIG.IDLE_MSG_DELAY);
      } else if (phase === 'loading' || phase === 'ready') {
        set({ activeMessage: msg });
      }
    },

    setLoadingProgress: (progress, mb) =>
      set({
        loadingProgress: progress,
        downloadedMB: mb,
      }),

    startGame: async (withSound) => {
      const idleMsg = PHASE_MESSAGES['idle'] || null;
      set({
        soundEnabled: withSound,
        appPhase: 'idle',
        currentMessage: idleMsg,
        activeMessage: null,
        isEndScreen: false,
      });

      setTimeout(() => set({ activeMessage: idleMsg }), APP_CONFIG.IDLE_MSG_DELAY);

      if (withSound) {
        const { initAudio } = await import('@/utils/audio');
        await initAudio();
      }
    },
  })),
);

export default useStore;
