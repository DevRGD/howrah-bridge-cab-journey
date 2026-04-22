import useStore from '@/store/useStore';
import { PHASE_TRANSITIONS } from '@/data/constants';
import { playSFX } from '@/utils/audio';

export const handleMessageAction = (appPhase, inputValue) => {
  const { setAppPhase, setDestination } = useStore.getState();
  useStore.setState({ activeMessage: null });
  playSFX('click');

  if (appPhase === 'idle') {
    playSFX('walk');
    playSFX('car-stop');
    setTimeout(() => {
      playSFX('car-horn');
    }, 1500);
    setAppPhase('walk');
    return;
  }

  const nextPhase = PHASE_TRANSITIONS[appPhase];
  if (nextPhase) {
    if (appPhase === 'ride') {
      setDestination(inputValue);
      playSFX('cars-starting');
    }
    if (nextPhase === 'ride') {
      setAppPhase(nextPhase);
      playSFX('walk');
      setTimeout(() => {
        playSFX('car-door-open');
      }, 500);
      setTimeout(() => {
        playSFX('car-door-close');
      }, 4000);
      return;
    }
    setAppPhase(nextPhase);
  }
};

export const handleDestinationInputSubmit = (e, onAction) => {
  if (e.key === 'Enter' && e.target.value.trim() !== '') {
    playSFX('click');
    if (onAction) onAction(e.target.value);
  }
};

export const handleSettingsToggle = (isOpen, setIsOpen) => {
  playSFX('click');
  setIsOpen(!isOpen);
};

export const handleAnimationSpeedChange = (speed, setAnimationSpeed) => {
  playSFX('click');
  setAnimationSpeed(speed);
};

export const handleResetToIdle = (setAppPhase, setIsOpen) => {
  const { setAnimationSpeed, resetScenes } = useStore.getState();
  playSFX('click');
  setAnimationSpeed(1);
  resetScenes();
  setAppPhase('idle');
  setIsOpen(false);
};

export const handleStartJourney = (withSound, startGame) => {
  playSFX('click');
  startGame(withSound);
};
