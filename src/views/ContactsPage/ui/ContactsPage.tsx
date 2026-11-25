import { getTranslations } from 'next-intl/server';

import styles from './ContactsPage.module.scss';

export async function ContactsPage() {
  const t = await getTranslations('ContactsPage');

  return (
    <main className={styles.contactsPage}>
      <h1 className={styles.contactsPage__title}>{t('title')}</h1>
      <p className={styles.contactsPage__description}>{t('description')}</p>
    </main>
  );
}

