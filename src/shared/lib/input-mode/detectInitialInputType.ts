import { INPUT_TYPES } from './constants';
import type { InputType } from './types';

export const detectInitialInputType = (): InputType => {
  if (window.matchMedia('(pointer: fine)').matches) {
    return INPUT_TYPES.MOUSE;
  }

  if (window.matchMedia('(pointer: coarse)').matches) {
    return INPUT_TYPES.TOUCH;
  }

  return INPUT_TYPES.MOUSE;
};