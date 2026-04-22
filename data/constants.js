export const APP_CONFIG = {
  TOTAL_MB: 375,
  IDLE_MSG_DELAY: 1500,
  IDLE_INIT_DELAY: 800,
  WALK_TRANSITION_SPEED: 5,
  ANIMATION_INIT_DELAY: 100,
  ATMOSPHERE_TRANSITION_DURATION: 1000,
  CROSSFADE_DURATION: 1500,
};

export const ASSETS = [
  { key: 'idleAnimationData', path: '/animations/idle.json', type: 'json' },
  { key: 'walkAnimationData', path: '/animations/walk.json', type: 'json' },
  { key: 'rideAnimationData', path: '/animations/ride.json', type: 'json' },
  { key: 'journeyAnimationData', path: '/animations/journey.json', type: 'json' },

  { key: 'ambient', path: '/sounds/ambient.wav', type: 'audio' },
  { key: 'walk', path: '/sounds/walk.wav', type: 'audio' },
  { key: 'car-door-close', path: '/sounds/car-door-close.wav', type: 'audio' },
  { key: 'car-horn', path: '/sounds/car-horn.wav', type: 'audio' },
  { key: 'cars-starting', path: '/sounds/cars-starting.wav', type: 'audio' },
  { key: 'car-stop', path: '/sounds/car-stop.wav', type: 'audio' },
  { key: 'car-door-open', path: '/sounds/car-door-open.wav', type: 'audio' },
  { key: 'click', path: '/sounds/click.wav', type: 'audio' },
  { key: 'message', path: '/sounds/message.wav', type: 'audio' },
  { key: 'typing', path: '/sounds/typing.wav', type: 'audio' },
];

export const PHASE_TRANSITIONS = {
  idle: 'walk',
  walk: 'ride',
  ride: 'journey',
  journey: 'end',
};
