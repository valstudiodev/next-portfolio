# Next.js Start Template

A multilingual Next.js starter template with a Feature-Sliced Design structure, localized routing, SCSS Modules, Tailwind CSS, Redux Toolkit, Vitest, and Testing Library.

The template includes demonstration pages for English and Ukrainian locales:

- Home
- About
- Projects
- Contacts
- Custom 404 page
- Custom error page
- Header
- Language switcher

## Tech stack

- Next.js 16.4.6
- React 19
- TypeScript with strict mode
- App Router
- Tailwind CSS v4
- SCSS and SCSS Modules
- Feature-Sliced Design
- `next-intl`
- Redux Toolkit and React Redux
- React Hook Form and Yup
- Vitest
- Testing Library
- ESLint

## Requirements

- Node.js 22 or newer
- npm 10 or newer

Check your versions:

```bash
node -v
npm -v
```

## Installation

Clone or copy the template, then install dependencies:

```bash
npm install
```

Create a local environment file:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The `.env.local` file is local-only and must not be committed. Use `.env.example` as the configuration reference.

## Development

Start the development server with the local time tracker:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

The default locale is English:

```text
/       → /en
/en     → English
/uk     → Ukrainian
```

Automatic locale detection from the browser is disabled. The language is changed explicitly through the language switcher.

To start Next.js without the time tracker:

```bash
npm run dev:next
```

To display saved local work sessions:

```bash
npm run stat
```

Time-tracking data is stored in `stats.json` and ignored by Git.

## Available scripts

```bash
npm run dev
npm run dev:next
npm run lint
npm test -- --run
npm run build
npm run start
npm run stat
```

Descriptions:

- `dev` — starts the time tracker and Next.js development server;
- `dev:next` — starts only the Next.js development server;
- `lint` — runs ESLint;
- `test -- --run` — runs the Vitest test suite once;
- `build` — creates a production build;
- `start` — starts the production server;
- `stat` — displays local time-tracking statistics.

## Project structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── about/
│   │   ├── contacts/
│   │   ├── projects/
│   │   ├── [...slug]/
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── providers/
│   ├── store/
│   └── styles/
├── entities/
├── features/
├── i18n/
├── shared/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── types/
│   └── ui/
├── views/
└── widgets/
```

### FSD layer responsibilities

- `app` — Next.js routes, providers, store setup, and application-level styles;
- `entities` — business entities and their UI;
- `features` — user actions and reusable product features;
- `shared` — reusable UI, utilities, styles, configuration, and types;
- `views` — complete page-level screens;
- `widgets` — large reusable UI blocks, such as Header.

Next.js route files in `src/app/[locale]` should remain small adapters. The main page UI belongs in `src/views`.

## Routing and localization

Supported locales are configured in:

```text
src/i18n/routing.ts
```

Current locales:

```text
en
uk
```

Localized navigation helpers are defined in:

```text
src/i18n/navigation.ts
```

For internal localized links, use:

```tsx
import { Link } from '@/i18n/navigation';
```

Example:

```tsx
<Link href="/about">About</Link>
```

The link automatically preserves the active locale:

```text
/en/about
/uk/about
```

Do not manually concatenate locale prefixes.

Translations are stored in:

```text
messages/en.json
messages/uk.json
```

## Adding a new page

Create a route adapter inside:

```text
src/app/[locale]/new-page/page.tsx
```

Then create the corresponding view:

```text
src/views/NewPage/
├── index.ts
└── ui/
    ├── NewPage.tsx
    └── NewPage.module.scss
```

The route adapter should import the view:

```tsx
import { NewPage } from '@/views/NewPage';

export default function Page() {
  return <NewPage />;
}
```

Add the page translations to both locale dictionaries.

## Styling

Global Tailwind styles are defined in:

```text
src/app/[locale]/globals.css
```

Project-level global SCSS is imported from:

```text
src/app/styles/globals.scss
```

Reusable SCSS utilities are stored in:

```text
src/shared/styles
```

Page and widget-specific styles should use SCSS Modules:

```text
ComponentName.module.scss
```

Use BEM-style class naming inside SCSS Modules:

```scss
.header {
  &__container {}
  &__link {}
}
```

## State management

Redux Toolkit is configured in:

```text
src/app/store
```

The store provider is located in:

```text
src/app/providers/StoreProvider.tsx
```

Add Redux slices only when the application has real interactive state. Do not add empty slices or duplicate state management unnecessarily.

## Error and 404 handling

Localized error handling is configured with:

```text
src/app/[locale]/error.tsx
src/app/[locale]/not-found.tsx
```

The UI components are located in:

```text
src/views/ErrorPage
src/views/Page404
```

The catch-all route:

```text
src/app/[locale]/[...slug]/page.tsx
```

redirects unknown localized paths to the custom 404 view.

## Environment variables

The example environment file is:

```text
.env.example
```

Current variable:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, configure the real public URL in the hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Do not put private keys or passwords in variables prefixed with `NEXT_PUBLIC_`, because those values can be exposed to the browser.

## Production checks

Before deployment, run:

```bash
npm run lint
npm test -- --run
npm run build
```

Start the production build locally:

```bash
npm run start
```

## Deployment

GitHub stores and versions the source code. It does not automatically host a full Next.js application by itself.

Typical deployment flow:

```text
GitHub repository
        ↓
Vercel or Netlify
        ↓
Next.js production deployment
```

### Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select the Next.js framework preset.
4. Add `NEXT_PUBLIC_SITE_URL` in the project environment variables.
5. Deploy the project.

### Netlify

1. Push the project to GitHub.
2. Import the repository into Netlify.
3. Configure the Next.js build settings.
4. Add `NEXT_PUBLIC_SITE_URL` to the environment variables.
5. Deploy the project.

Always verify the deployment with:

```text
/en
/uk
/en/about
/uk/about
/en/projects
/uk/projects
/en/contacts
/uk/contacts
```

## License

This starter template does not currently define a license. Add a license before publishing it for public reuse.
