import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { navigationItems } from '@/shared/config/navigation';

import styles from './header.module.scss'
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';

export function Header() {
  const t = useTranslations('Navigation')

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link
          className={styles.header__logo}
          href='/'
        >
          Portfolio
        </Link>

        <nav
          aria-label='Main navigation'
          className={styles.header__nav}>
          <ul className={styles.header__list}>
            {navigationItems.map((item) => (
              <li
                className={styles.header__item}
                key={item.href}
              >
                <Link
                  className={styles.header__link}
                  href={item.href}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}

