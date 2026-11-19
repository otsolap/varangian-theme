# varangian-theme

Shared Astro layout, blocks, and styles. Each site keeps its own pages, JSON, images, and API routes.

## Package

The npm package name is `varangian-theme`. Sites depend on `latest`, which is the newest published version. `npm update varangian-theme` moves a site to that version.

The package entry is an Astro integration. A site lists `varangianTheme()` in `integrations`.

## Assets

Pictorial images belong to the site, in `src/assets/images/`. Nav SVG icons belong in `src/assets/images/icons/`. JSON may point at `/images/...`. The theme resolves those paths to the site files.

## Blocks

Blocks are Astro components at `varangian-theme/components/blocks/`. A page imports the block it renders, such as `varangian-theme/components/blocks/Hero.astro`.

`ContactForm` posts to `/api/contact`. `SubscribeForm` posts to `/api/subscribe`. Those routes belong to the site. The `action` prop is another path.

## Layout

`varangian-theme/layouts/Layout.astro` is the page shell. It draws the theme header, footer, and mobile footer around the default slot. The default slot is the page content.

Three named slots stand in for those three components.

| Slot | Theme component when the slot is empty |
| --- | --- |
| `header` | `Header` |
| `footer` | `Footer` |
| `mobile-footer` | `MobileFooter` |

An empty slot keeps the theme component. A passed slot is the site's component for that region. The site layout is the place that passes the slots. `navigation` stays a required prop. The theme components read it when their slot is empty.

## Styles

Theme CSS is in `@layer varangian`. A site rule outside that layer overrides the matching theme rule. An `is:global` style reaches elements inside a theme component. A scoped style stays on the site component that owns it.

A site rule with no media query applies at every width. It also covers the theme's tablet and desktop values for that property. A rule inside one media query applies only at that width. The theme widths are `520px`, `640px`, `768px`, `1024px`, and `1280px`.

## Repository

This repo has no pages and no dev server. A site renders the theme. `npm install` in this repo installs the font files the styles import.

## Rights

MIT © [Otso Lappalainen](https://varangianventure.com)

## Site rules

Rules for this repo live in `.grok/rules/`. Grok loads that folder. Cursor loads `AGENTS.md`, which points at the same folder.

A site's `AGENTS.md` points at the installed copy, `node_modules/varangian-theme/.grok/rules/shared-rules.md`. `npm update varangian-theme` replaces that copy.
