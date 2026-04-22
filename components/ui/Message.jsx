'use client';

import { useState, useEffect } from 'react';
import { handleDestinationInputSubmit } from '@/utils/interactions';
import { useTypewriter } from '@/hooks/useTypewriter';
import Button from './Buttons';
import { playSFX } from '@/utils/audio';

export default function Message({ text, buttonText, onAction, hasInput = false, side = 'right' }) {
  const isRight = side === 'right';
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (text) {
      playSFX('message');
    }
  }, [text]);

  const displayed = useTypewriter(text, () => setIsTypingDone(true));

  const [isFocused, setIsFocused] = useState(false);
  const handleInputKeyDown = (e) => handleDestinationInputSubmit(e, onAction);

  return (
    <div
      className={`absolute bottom-4 ${
        isRight ? 'right-4' : 'left-4'
      } sm:bottom-8 ${
        isRight ? 'sm:right-8' : 'sm:left-8'
      } flex flex-col ${isRight ? 'items-end' : 'items-start'} gap-4 sm:gap-6 pointer-events-auto z-50 transition-all duration-500`}
    >
      <div
        className={`text-white bg-black/40 backdrop-blur-md px-6 py-4 border border-white/10 shadow-xl max-w-sm relative rounded-sm ${isRight ? 'rounded-br-none' : 'rounded-bl-none'}`}
      >
        <div className="font-mono text-white/90 text-sm leading-relaxed tracking-wide min-h-[2rem]">
          {displayed}
          <span className="animate-pulse ml-1 inline-block w-2 bg-white/50 h-4 align-middle" />
        </div>

        <div
          className={`absolute -bottom-3 ${isRight ? '-right-[1px]' : '-left-[1px]'} w-0 h-0
          border-solid border-t-[12px] border-b-[0px] border-black/40 backdrop-blur-md
          ${isRight ? 'border-r-[0px] border-l-[16px] border-t-black/40 border-l-transparent border-r-transparent' : 'border-l-[0px] border-r-[16px] border-t-black/40 border-l-transparent border-r-transparent'}`}
          style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}
        />
      </div>

      <div
        className={`transition-all duration-1000 ease-out ${isTypingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        {buttonText && !hasInput && (
          <Button
            onClick={onAction}
            className="!px-8 !py-4 text-xs !bg-black/60 shadow-2xl backdrop-blur-xl font-bold border-white/30 text-white hover:!bg-black/80"
          >
            {buttonText}
          </Button>
        )}

        {hasInput && (
          <div className={`w-full max-w-sm transition-all duration-500 relative px-2`}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Where to, John?"
                onKeyDown={handleInputKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
                className="w-full bg-transparent border-0 outline-none text-white text-2xl font-serif tracking-wide placeholder:text-white/20 caret-blue-400 transition-all duration-300"
              />
              <div className="relative h-[2px] mt-2 bg-white/10 overflow-hidden">
                <div className={`absolute inset-0 bg-linear-to-r from-transparent via-blue-400 to-transparent transition-transform duration-700 ease-out ${isFocused ? 'translate-x-0' : '-translate-x-full'}`} />
              </div>
              
              <div className={`mt-3 flex justify-start transition-all duration-500 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-blue-400/60 font-bold">
                  Enter destination
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
