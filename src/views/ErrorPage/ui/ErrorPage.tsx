'use client'

import { Link } from "@/i18n/navigation";
import styles from "./ErrorPage.module.scss";

type ErrorPageProps = {
  error: Error & { digest?: string };
  resetAction: () => void;
};

export function ErrorPage({ error, resetAction }: ErrorPageProps) {
  return (
    <main className={styles.errorPage}>
      <h1 className={styles.errorPage__title}>Something went wrong</h1>

      <p className={styles.errorPage__description}>
        An unexpected error occurred. Please try again.
      </p>

      {error.digest && (
        <p className={styles.errorPage__description}>
          Error ID: {error.digest}
        </p>
      )}

      <div className={styles.errorPage__actions}>
        <button
          className={styles.errorPage__button}
          type="button"
          onClick={resetAction}
        >
          Try again
        </button>

        <Link className={styles.errorPage__link} href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}

