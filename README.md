# varangian-theme

Shared Astro layout, blocks, and styles. Each site keeps its own pages, JSON, images, and API routes.

## Use it

Install the package from GitHub:

```json
"varangian-theme": "git+https://github.com/otsolap/varangian-theme.git#semver:~0.0.1"
```

`~0.0.1` accepts later `0.0.x` tags. It stops before `0.1.0`.

Set the version in `package.json`. Commit that change. Tag that commit `vX.Y.Z`. Then run `npm update varangian-theme` in the site.

Add the integration in `astro.config.mjs`:

```js
import varangianTheme from 'varangian-theme';

export default defineConfig({
  integrations: [varangianTheme()],
});
```

Put pictorial images in `src/assets/images/`. Put nav SVG icons in `src/assets/images/icons/`. JSON can point at `/images/...`. The theme resolves those paths.

Import a block from the package:

```astro
---
import Hero from 'varangian-theme/components/blocks/Hero.astro';
---
```

`ContactForm` posts to `/api/contact`. `SubscribeForm` posts to `/api/subscribe`. The site provides those routes. Pass `action` to use another path.

## Work on this repo

Clone the repo. Run `npm install`. That installs the font files the styles use.

This repo has no pages and no dev server. A site renders the theme.

## Rights

MIT © [Otso Lappalainen](https://varangianventure.com)

## Site rules

Rules for this repo live in `.grok/rules/`. Grok loads that folder. Cursor loads `AGENTS.md`, which points at the same folder.

A site should point its `AGENTS.md` at the installed consumer rules. Grok and Cursor both read that file.

```md
Read and follow `node_modules/varangian-theme/.grok/rules/shared-rules.md` before you plan or edit this site.
```

`npm update varangian-theme` brings a new copy of those rules into the site.
