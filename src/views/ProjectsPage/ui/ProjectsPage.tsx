import { getTranslations } from 'next-intl/server';

import styles from './ProjectsPage.module.scss';

async function ProjectsPage() {
  const t = await getTranslations('ProjectsPage');

  return (
    <main className={styles.projectsPage}>
      <h1 className={styles.projectsPage__title}>{t('title')}</h1>
      <p className={styles.projectsPage__description}>{t('description')}</p>
    </main>
  );
}

export default ProjectsPage;