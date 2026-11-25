import { getTranslations } from 'next-intl/server';

import styles from './HomePage.module.scss';

export async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <main className={styles.homePage}>
      <h1 className={styles.homePage__title}>{t('title')}</h1>
      <p className={styles.homePage__description}>{t('description')}</p>
    </main>
  );
}

