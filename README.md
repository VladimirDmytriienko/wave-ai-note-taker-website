# Wave — marketing website

The public product site for the Wave iOS app: product presentation, App Store
call to action, FAQ, Privacy Policy and Terms of Use.

Separate npm project from the Expo app in the repository root. It shares the
repository (and the app icon) but nothing else.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run icons      # regenerate favicons from the iOS app icon
```

`NEXT_PUBLIC_SITE_URL` must be set in production — canonical URLs, Open Graph
tags, the sitemap and robots.txt are derived from it. See `.env.example`.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · React Server
Components by default.

There is no animation library. Motion is CSS (`globals.css`), driven by two
small client components: `Reveal` flips one data attribute when an element
enters the viewport, and `ScreenshotCarousel` moves a native scroll-snap
track. Everything else on the site is a Server Component, so the JavaScript
that ships is only what the carousel and the reveals need.

## Layout

```
src/
  app/                 routes only — each page composes sections, no logic
    faq/ privacy/ terms/
    opengraph-image.tsx  sitemap.ts  robots.ts  icon.png  apple-icon.png
  components/
    layout/            header, footer
    sections/          landing-page sections (hero, features, showcase, …)
    product/           app presentation: device frame, screenshots, carousel
    faq/  legal/       content renderers
    ui/                generic primitives (container, section, button, reveal)
  config/              site.ts (product data), screenshots.ts, navigation.ts
  content/<locale>/    FAQ + legal copy as editable data
  i18n/                locale config, message catalogs, translator
  lib/                 cn, metadata helper
public/
  brand/  screenshots/  icons/  og/
```

One-way dependencies: `app → sections → product/ui → config/i18n/lib`.

## Conventions

- Arrow-function components, props typed directly, named exports, kebab-case
  filenames, no barrel files. Same rules as the iOS app.
- No product fact is hardcoded in a component. Names, URLs and contact details
  live in `src/config/site.ts`.
- Tokens only: colours, type sizes and easings come from the `@theme` block in
  `globals.css`. No raw hex in a component.

## Adding things

**A page** — add `src/app/<route>/page.tsx`, export metadata with
`createMetadata()`, and list the route in `src/app/sitemap.ts` (and in
`src/config/navigation.ts` if it belongs in the nav).

**A screenshot** — drop the PNG in `public/screenshots/` and set `src` on the
matching entry in `src/config/screenshots.ts`. Entries with `src: null` render
a visible placeholder instead; nothing else has to change.

**A language** — see the comment at the top of `src/i18n/config.ts`. In short:
add `src/i18n/messages/<locale>.json` with the same keys, add
`src/content/<locale>/`, list the locale, and move the routes under
`src/app/[locale]/`. The language switcher stays hidden until more than one
locale is enabled.

**A UI string** — add it to `src/i18n/messages/en.json`, where the key *is* the
English sentence, and read it with `const t = await getTranslations()`. Client
Components receive finished strings as props so catalogs never reach the
browser bundle.

## Outstanding

See `TODO.md` — the site ships with placeholders for the screenshots, the App
Store link, the support address and the legal documents.
