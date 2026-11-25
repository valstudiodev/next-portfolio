'use client'

import { ErrorPage } from '@/views/ErrorPage';

type LocaleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: LocaleErrorProps) {
  return <ErrorPage error={error} resetAction={reset} />;
}