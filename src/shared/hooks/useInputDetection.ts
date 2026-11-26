'use client';

import { useEffect } from 'react';

import { detectInitialInputType } from '@/shared/lib/input-mode/detectInitialInputType';
import { detectInputType } from '@/shared/lib/input-mode/detectInput';
import type { InputType } from '@/shared/lib/input-mode/types';

export function useInputDetection(): void {
  useEffect(() => {
    const root = document.documentElement;
    let currentInput: InputType | null = null;

    const setInput = (type: InputType): void => {
      if (currentInput === type) {
        return;
      }

      currentInput = type;
      root.dataset.input = type;
    };

    setInput(detectInitialInputType());

    const handleInput = (event: PointerEvent | KeyboardEvent): void => {
      const inputType = detectInputType(event);

      if (inputType) {
        setInput(inputType);
      }
    };

    window.addEventListener('pointerdown', handleInput, { passive: true });
    window.addEventListener('pointermove', handleInput, { passive: true });
    window.addEventListener('keydown', handleInput, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleInput);
      window.removeEventListener('pointermove', handleInput);
      window.removeEventListener('keydown', handleInput);

      delete root.dataset.input;
    };
  }, []);
}