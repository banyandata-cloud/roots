#!/usr/bin/env node
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import './build-tokens.mjs'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const readTokenFile = (file) =>
  JSON.parse(readFileSync(join(rootDir, 'design-system', file), 'utf8'))

assert.equal(
  sass.compile(join(rootDir, 'src/styles/tokens/_index.scss')).css,
  '',
  'The Sass barrel must not emit CSS',
)
console.log('PASS: token barrel emits no CSS')

const themeCss = sass.compile(join(rootDir, 'src/styles/tokens/_root-colors.scss')).css
assert.match(themeCss, /:root \{/)
assert.match(themeCss, /\[data-theme=dark\] \{/)
for (const [file, selector] of [
  ['colors/light.tokens.json', ':root'],
  ['colors/dark.tokens.json', '[data-theme=dark]'],
]) {
  const expectedColor = readTokenFile(file).Textcolor['Text-primary'].$value.hex
  const block = themeCss.slice(themeCss.indexOf(selector)).split('}')[0]
  assert.ok(block.includes(`--color-text-primary: ${expectedColor};`))
}
console.log('PASS: light and dark theme rules match source colors')

const spacing = readTokenFile('space.json')['spacing-md'].$value
const radius = readTokenFile('radius.json')['radius-sm'].$value
const buttonSizes = readTokenFile('button.json')
const shadowTokens = readTokenFile('shadow.json')
const tagColors = readTokenFile('tag/colors.json')
const tagSizes = readTokenFile('tag/dismissible.json')
const typography = readTokenFile('typography.json')
const probe = sass.compileString(
  `@use 'sass:map';
   @use 'src/styles/tokens' as tokens;
   .probe {
     color: tokens.$color-text-primary;
     background: tokens.$base-color-base-transparent;
     padding: tokens.$spacing-md;
     border-radius: tokens.$radius-sm;
     font-family: tokens.$font-family-base;
     font-weight: tokens.$font-weight-medium;
     font-size: tokens.$font-size-16;
     line-height: tokens.$line-height-24;
     margin-bottom: tokens.$paragraph-spacing-8;
     box-shadow: tokens.$shadow-scale-xs;
     outline: tokens.$shadow-state-focus-primary-brand;
     height: tokens.$button-size-xs;
     tag-background: tokens.$tag-brand-background;
     tag-dismissible-height: tokens.$tag-dismissible-24px-with-icon-height;
    tag-dismissible-gap: map.get(tokens.$tag-dismissible-32px, 'gap-close-and-text');
   }`,
  { loadPaths: [rootDir] },
).css
assert.ok(probe.includes('color: var(--color-text-primary);'))
assert.ok(probe.includes('background: rgba(255, 255, 255, 0);'))
assert.ok(probe.includes(`padding: ${spacing}px;`))
assert.ok(probe.includes(`border-radius: ${radius}px;`))
assert.ok(probe.includes(typography.font['font-family'].$value))
assert.ok(probe.includes(`font-weight: ${typography['font weight'].Medium.$value};`))
assert.ok(probe.includes(`font-size: ${typography['font-size']['16'].$value}px;`))
assert.ok(probe.includes(`line-height: ${typography['Line-height']['24'].$value}px;`))
assert.ok(probe.includes(`margin-bottom: ${typography['para-spacing']['8'].$value}px;`))
assert.ok(probe.includes(`height: ${buttonSizes.xs.$value}px;`))
assert.ok(probe.includes(`box-shadow: var(--shadow-scale-xs);`))
assert.ok(probe.includes(`outline: var(--shadow-state-focus-primary-brand);`))
assert.ok(probe.includes(`tag-background: ${tagColors.brand.background.$value};`))
assert.ok(
  probe.includes(
    `tag-dismissible-height: ${tagSizes['24px with icon'].height.$value}px;`,
  ),
)
assert.ok(probe.includes(`tag-dismissible-gap: ${tagSizes['32px']['gap-close-and-text'].$value}px;`))
console.log('PASS: colors, dimensions, typography, shadows, buttons, and tag tokens compile')

const shadowCss = sass.compile(join(rootDir, 'src/styles/tokens/_root-shadows.scss')).css
const lightShadow = shadowTokens.scale.light.shadow.xs.value
const darkShadow = shadowTokens.scale.dark.shadow.xs.value
assert.ok(shadowCss.includes(`--shadow-scale-xs: ${lightShadow};`))
assert.ok(shadowCss.includes(`--shadow-scale-xs: ${darkShadow};`))
assert.ok(shadowCss.includes(shadowTokens.state.focus['primary-brand'].value))
const rootColorCss = sass.compile(join(rootDir, 'src/styles/tokens/_root-colors.scss')).css
assert.match(rootColorCss, /--bg-primary: var\(--color-bg-primary\);/)
assert.match(rootColorCss, /--fg-tertiary: var\(--color-fg-tertiary\);/)
console.log('PASS: light/dark shadows and focus color aliases match source tokens')