export const siteConfig = {
  name: 'Portfolio',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  defaultLocale: 'en',
  locales: ['en', 'uk'],
} as const;