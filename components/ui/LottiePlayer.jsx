'use client';

import { useEffect, useState, useRef } from 'react';
import { useLottie } from 'lottie-react';

export default function LottiePlayer({
  animationData,
  loop = false,
  onComplete,
  onLoopComplete,
  delay = 0,
  speed = 1,
  className = '',
  direction = 1,
  isPaused = false,
}) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) setShouldRender(true);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [delay]);

  if (!shouldRender || !animationData) return null;

  return (
    <LottieInternal
      animationData={animationData}
      loop={loop}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
      speed={speed}
      direction={direction}
      className={className}
      isPaused={isPaused}
    />
  );
}

function LottieInternal({
  animationData,
  loop,
  onComplete,
  onLoopComplete,
  speed,
  direction,
  className,
  isPaused,
}) {
  const options = {
    animationData,
    loop,
    autoplay: !isPaused,
    onComplete,
    onLoopComplete,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View, setSpeed, setDirection, play, pause } = useLottie(options, {
    width: '100%',
    height: '100%',
  });

  useEffect(() => {
    setSpeed(speed);
  }, [speed, setSpeed]);

  useEffect(() => {
    setDirection(direction);
  }, [direction, setDirection]);

  useEffect(() => {
    if (isPaused) {
      pause();
    } else {
      play();
    }
  }, [isPaused, play, pause]);

  return <div className={`w-full h-full ${className}`}>{View}</div>;
}
