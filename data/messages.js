export const PHASE_MESSAGES = {
  loading: null,
  ready: null,
  idle: {
    text: 'Hello John! your cab is here.',
    buttonText: 'Walk To The Cab',
    side: 'right',
  },
  walk: {
    text: 'Hey John! I am your cab driver.',
    buttonText: 'Get In The Cab',
    side: 'left',
  },
  ride: {
    text: 'Where would you like to go today?',
    buttonText: null,
    hasInput: true,
    side: 'left',
  },
  journey: null,
  end: null,
};
