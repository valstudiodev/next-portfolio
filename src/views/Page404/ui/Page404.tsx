import { Link } from '@/i18n/navigation';

import styles from './Page404.module.scss';

export function Page404() {
  return (
    <main className={styles.page404}>
      <p className={styles.page404__status}>404</p>

      <h1 className={styles.page404__title}>Page not found</h1>

      <p className={styles.page404__description}>
        The page you are looking for does not exist.
      </p>

      <Link className={styles.page404__link} href="/">
        Back to home
      </Link>
    </main>
  );
}