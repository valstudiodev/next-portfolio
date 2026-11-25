import { describe, expect, it } from 'vitest';

import { routing } from './routing';

describe('i18n routing', () => {
  it('configures supported locales and default locale', () => {
    expect(routing.locales).toEqual(['en', 'uk']);
    expect(routing.defaultLocale).toBe('en');
  });
});
