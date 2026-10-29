# CSS

This project uses custom CSS. Follow these standards:

- **Use rem units** instead of px (e.g., `.75rem` not `12px`)
- **Use CSS custom properties** (e.g., `var(--spacing-single)`) instead of hardcoded values for padding, margin, and gap
- **Never use `--spacing-*` variables for width/height** - use rem or px values instead
- **No leading zeros** in decimal values (e.g., `.9375rem` not `0.9375rem`)
- **No fallback values** in CSS variables unless absolutely necessary
- **Use `background-color`** instead of the `background` shorthand
- **Use `border: 0`** instead of `border: none`
- **BEM naming convention** for component classes (e.g., `.sub-menu__item--current`)
- **SVG icons**: Use `currentColor` in SVGs and CSS `mask` property for colorization
- **Don't add unnecessary font declarations** if they're inherited from parent elements
- **Prefer flexbox over CSS grid** for layouts - use `display: flex` with `flex-wrap: wrap` for multi-column layouts instead of `display: grid`

**Brand colors (CSS custom properties in `src/styles/partials/variables.css`):**
- Primary: `--color-primary`, `--color-primary-dark`, `--color-primary-semidark`, `--color-primary-light`
- Secondary: `--color-secondary`, `--color-secondary-dark`, `--color-secondary-semidark`, `--color-secondary-light`
- Tertiary: `--color-tertiary`, `--color-tertiary-dark`, `--color-tertiary-light`

## Media Query Organization

Screen widths live in `src/styles/partials/screens.css`.

**Structure media queries at the end of the file**, not nested inside selectors:

```scss
// Mobile-first base styles
.component {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-single);

    &__title {
        font-size: var(--font-size-lg);
    }
}

/* Tablet styles */
@media (width >= 768px) {
    .component {
        flex-direction: row;

        &__title {
            font-size: var(--font-size-xl);
        }
    }
}

/* Laptop styles */
@media (width >= 1024px) {
    .component {
        &__title {
            font-size: var(--font-size-2xl);
        }
    }
}
```

**Key principles:**
- Write mobile-first base styles at the top
- Use only these widths, in this order: xs `520px`, sm `640px`, md `768px`, lg `1024px`, xl `1280px`
- Group each width in one `@media` block at the end of the file
- Write the query as `(width >= 768px)` for tablet. Copy the px value from `screens.css`
- `var(--screen-md)` does not work inside `@media`
- Add a comment header before each block, such as `/* Tablet styles */` and `/* Laptop styles */`
- Only include properties that change at that breakpoint
