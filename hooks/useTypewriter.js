import { useState, useEffect } from 'react';
import { playSFX, stopSFX } from '@/utils/audio';

export function useTypewriter(text, onComplete) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let current = '';
    const delay = 50;
    let timerId;

    if (text) {
      playSFX('typing');
    }

    const typeNext = (index) => {
      if (index < text.length) {
        current += text[index];
        setDisplayed(current);
        timerId = setTimeout(() => typeNext(index + 1), delay);
      } else {
        stopSFX('typing');
        if (onComplete) onComplete();
      }
    };

    typeNext(0);
    return () => {
      clearTimeout(timerId);
      stopSFX('typing');
    };
  }, [text]);

  return displayed;
}
