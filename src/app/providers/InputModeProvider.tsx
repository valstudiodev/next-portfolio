'use client';

import type { ReactNode } from 'react';

import { useInputDetection } from '@/shared/hooks/useInputDetection';

type InputModeProviderProps = {
  children: ReactNode;
};

export function InputModeProvider({
  children,
}: InputModeProviderProps) {
  useInputDetection();

  return children;
}