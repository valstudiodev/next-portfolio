'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(locale: (typeof routing.locales)[number]) {
    if (locale === currentLocale) {
      return;
    }

    router.replace(pathname, { locale });
  }

  return (
    <nav aria-label="Language switcher">
      <ul>
        {routing.locales.map((locale) => (
          <li key={locale}>
            <button
              type="button"
              onClick={() => changeLocale(locale)}
              aria-current={locale === currentLocale ? 'true' : undefined}
              disabled={locale === currentLocale}
            >
              {locale.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}