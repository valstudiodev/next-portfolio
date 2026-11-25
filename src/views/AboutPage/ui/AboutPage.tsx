import { getTranslations } from 'next-intl/server';

import styles from './AboutPage.module.scss';

export async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <main className={styles.aboutPage}>
      <h1 className={styles.aboutPage__title}>{t('title')}</h1>
      <p className={styles.aboutPage__description}>{t('description')}</p>
    </main>
  );
}

