# Roots

Design System which drives all the Banyan Cloud products.

## Design tokens

The Figma exports in [design-system](design-system) are the source of truth for
generated Sass tokens. Run `bun run tokens:build` (or `npm run tokens:build`) after
updating the exports. The generator is [scripts/build-tokens.mjs](scripts/build-tokens.mjs).

The v2 package is fully isolated from v1: it has its own tokens, global stylesheet, fonts,
mixins, utils and docs helpers, all under [src/components/v2](src/components/v2), and
[isolation.test.ts](src/components/v2/isolation.test.ts) fails if any v2 file imports from
outside that folder. v1 keeps its own committed copy of the tokens in `src/styles/tokens`
(px units, not regenerated); the generator only writes the v2 copy.

Generated files live in [src/components/v2/styles/tokens](src/components/v2/styles/tokens):

- [\_root-colors.scss](src/components/v2/styles/tokens/_root-colors.scss) defines
  light-mode CSS custom properties on `:root` and
  dark-mode overrides on `[data-theme='dark']`. Include it **once** using
  `@use './tokens/root-colors';` in an application global stylesheet.
- [\_index.scss](src/components/v2/styles/tokens/_index.scss) forwards CSS-free
  Sass variables for themed colors, primitive
  colors, spacing, radius, and typography. Component styles can use
  `@use '../styles/tokens' as tokens;` (adjust the relative path as needed). Shared layout
  mixins (`flex`, `ellipsis`, `remove-scrollbar`, `custom-scrollbar`) are in
  [styles/\_mixins.scss](src/components/v2/styles/_mixins.scss).
- Examples: `tokens.$color-text-primary`, `tokens.$base-color-base-white`,
  `tokens.$spacing-md`, `tokens.$radius-md`, and `tokens.$font-size-14`.

### Text styles

The Figma text styles (Heading xxlarge to xxsmall, Body large / default / small, Metric, Code)
live in [design-system/text-styles.json](design-system/text-styles.json) and are generated into
the `text-style` mixin. Use it instead of repeating size and line-height:

```scss
@include tokens.text-style(body); // 14/20, regular
@include tokens.text-style(heading-small, semibold); // 16/20, semibold
```

In TSX use `<Text variant='body' stroke='medium' />`. The mixin fails to compile for a weight the
style does not have in Figma (metric is bold only, code is regular only).

### Units

The Figma exports are unitless pixel numbers. [scripts/build-tokens.mjs](scripts/build-tokens.mjs)
is the only place that decides the emitted unit, assuming the browser default root
font size (`100%`, 16px). Do not set `html { font-size: 62.5% }` in v2 consumers; it
overrides the user's font-size setting.

| Tokens                                                                    | Unit  | Example                                             |
| ------------------------------------------------------------------------- | ----- | --------------------------------------------------- |
| `$font-size-*`, `$line-height-*`, `$paragraph-spacing-*`, `$spacing-*`    | `rem` | `$font-size-14` = `0.875rem`, `$spacing-lg` = `0.75rem` |
| `$spacing-1` (hairlines: borders, dividers, focus rings)                  | `px`  | `1px`                                               |
| `$radius-*`                                                               | `px`  | `$radius-sm` = `6px`                                |

To change a unit, edit `ROOT_FONT_SIZE_PX` or `PX_SPACING_TOKENS` in the generator, run
`bun run tokens:build`. v2 components import their `.module.scss` directly, so there is no
compiled CSS to regenerate.

Global stylesheet entries are separate per generation, because v1 sizes `rem` against a
`12.5px` root while v2 needs the browser default:

- [src/styles/main.scss](src/styles/main.scss) (`main.css`) — v1; sets `html { font-size: 12.5px }`.
- [src/components/v2/styles/main.v2.scss](src/components/v2/styles/main.v2.scss) — v2; never sets
  the root font size and ships its own Plus Jakarta Sans files
  ([styles/fonts](src/components/v2/styles/fonts)). Use this one for v2 components.

Storybook loads both entries and resets the root font size to `100%` for stories under `v2/`
([.storybook/preview.ts](.storybook/preview.ts)). v1's `main.css` also sets `font-size: 12.5px`
on `body`, so v2 text without its own size inherits `16px` in a v2-only page.

- Don't mix units in Sass arithmetic (`$spacing-md - $spacing-1` is `rem - px` and
  fails); use `calc(#{$a} - #{$b})`.
- Use `em`/`rem` in media queries, not `px` (`48em` = 768px at the default size).
- TypeScript that needs pixel values from tokens must convert `rem` using the page's
  root font size; don't parse token strings as px.

Switch themes with `document.documentElement.dataset.theme = 'dark'`; set it to
`'light'` or remove the attribute to restore light mode. Primitive palette colors
are static; semantic and utility color aliases resolve through `var()` at runtime.
The barrel deliberately does not forward the CSS-emitting theme rules.

Generation does not change existing component styles, load fonts, or replace the
current global typography. Import and adopt the tokens where needed; do not edit
the generated files by hand.

### Verify the tokens

Run `bun run tokens:check` to verify that every generated file matches the JSON
exports, that the Sass barrel emits no CSS, that light/dark theme rules match the
source colors, and that representative tokens compile with the expected values.
This check does not rewrite files and exits with an error for missing or stale
output. After changing an export, run `bun run tokens:build`, then check again.

For a visual check, run `bun run storybook` and open **Design System → Tokens →
TextField → Light And Dark**. The example uses
[TextFieldTokens.stories.tsx](src/components/v2/input/textfield/TextFieldTokens.stories.tsx)
and [token-based styles](src/components/v2/input/textfield/TextFieldTokens.module.scss)
with `TextField` in `unstyled` mode; the regular component still uses its existing
hardcoded styles. Both panels should have different background/text colors.
Focus and type in each input to check the focus outline and input behavior.

In browser DevTools, inspect an input's computed styles: `color` should resolve
from `--color-text-primary`, padding should be `8px 12px`, border radius `6px`,
font size `16px`, and line height `24px`. A `font-family` declaration does not
load the font: Plus Jakarta Sans must be supplied by the consuming application;
otherwise the system fallback is used.
