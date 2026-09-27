# varangian-theme

Shared Astro layout, blocks, and styles. Each site keeps its own pages, JSON, images, and API routes.

## Use it

Run `npm install` in this folder first. That installs the font files the styles use.

Then install the package in a site, and add the integration in `astro.config.mjs`:

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

The package is private. A site can depend on it with `file:../varangian-theme`.
