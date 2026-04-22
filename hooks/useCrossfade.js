import { useState, useEffect } from 'react';
import { APP_CONFIG } from '@/data/constants';

export function useCrossfade(isActive) {
  const [isOpaque, setIsOpaque] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsOpaque(true);
    } else {
      const t = setTimeout(() => setIsOpaque(false), APP_CONFIG.CROSSFADE_DURATION);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  return isOpaque;
}
