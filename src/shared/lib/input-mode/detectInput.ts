import { INPUT_TYPES } from './constants';
import type { InputType } from './types';

export const detectInputType = (
  event: PointerEvent | KeyboardEvent,
): InputType | null => {
  if (event instanceof KeyboardEvent) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return null;
    }

    return INPUT_TYPES.KEYBOARD;
  }

  if (event instanceof PointerEvent) {
    switch (event.pointerType) {
      case 'mouse':
        return INPUT_TYPES.MOUSE;

      case 'touch':
      case 'pen':
        return INPUT_TYPES.TOUCH;

      default:
        return null;
    }
  }

  return null;
};