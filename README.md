# Roots

Design System which drives all the Banyan Cloud products.

## Design tokens

The Figma exports in [design-system](design-system) are the source of truth for
generated Sass tokens. Run `bun run tokens:build` (or `npm run tokens:build`) after
updating the exports. The generator is [scripts/build-tokens.mjs](scripts/build-tokens.mjs).

Generated files live in [src/styles/tokens](src/styles/tokens):

- [src/styles/tokens/\_root-colors.scss](src/styles/tokens/_root-colors.scss) defines
  light-mode CSS custom properties on `:root` and
  dark-mode overrides on `[data-theme='dark']`. Include it **once** using
  `@use './tokens/root-colors';` in an application global stylesheet.
- [src/styles/tokens/\_index.scss](src/styles/tokens/_index.scss) forwards CSS-free
  Sass variables for themed colors, primitive
  colors, spacing, radius, and typography. Component styles can use
  `@use '../../styles/tokens' as tokens;` (adjust the relative path as needed).
- Examples: `tokens.$color-text-primary`, `tokens.$base-color-base-white`,
  `tokens.$spacing-md`, `tokens.$radius-md`, and `tokens.$font-size-14`.

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
